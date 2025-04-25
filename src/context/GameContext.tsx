import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import * as api from '../services/api';
import { GameState, Jogador, Mao, Carta, BattleState, BattleResult } from '../types/game';

interface GameContextProps {
  gameState: GameState;
  addPlayer: (nome: string) => Promise<void>;
  loadCards: () => Promise<void>;
  shuffleDeck: () => Promise<void>;
  dealHands: () => Promise<void>;
  startBattle: (id1: number, id2: number) => Promise<void>;
  resolveBattle: () => Promise<void>;
  // Adicionar mais ações conforme necessário
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

const initialState: GameState = {
  jogadores: [],
  maos: [],
  baralhoCompleto: [],
  batalhaAtual: null,
  ultimoResultado: null,
  mensagemJogo: null,
  isLoading: false,
  error: null,
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const setLoading = (loading: boolean) => setGameState(prev => ({ ...prev, isLoading: loading, error: null }));
  const setError = (error: string | null) => setGameState(prev => ({ ...prev, isLoading: false, error: error }));
  const setSuccess = (partialState: Partial<GameState>) => setGameState(prev => ({ ...prev, ...partialState, isLoading: false, error: null }));

  const addPlayer = useCallback(async (nome: string) => {
    setLoading(true);
    try {
      const updatedJogadores = await api.criarJogador(nome);
      setSuccess({ jogadores: updatedJogadores, mensagemJogo: `Jogador ${nome} adicionado!` });
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  const loadCards = useCallback(async () => {
     setLoading(true);
     try {
         // Só carrega se ainda não tiver sido carregado
         if (gameState.baralhoCompleto.length === 0) {
            const cartas = await api.criarCartas();
            setSuccess({ baralhoCompleto: cartas, mensagemJogo: 'Baralho de cartas carregado.' });
         } else {
             setSuccess({ mensagemJogo: 'Baralho já estava carregado.' }); // Ou só tirar o loading
         }
     } catch (err: any) {
         setError(err.message);
     }
  }, [gameState.baralhoCompleto.length]); // Dependência para evitar recarregar

  const shuffleDeck = useCallback(async () => {
      setLoading(true);
      try {
          await api.baralharDeckPrincipal();
          // Nota: A API /Baralhar não parece *atualizar* o estado que precisamos diretamente no frontend
          // (como a ordem das cartas no baralho geral antes de distribuir).
          // Ela baralha no servidor. Talvez precise buscar o estado atualizado depois, ou confiar que a próxima ação (Distribuir) usará o baralho baralhado.
          // Vamos apenas mostrar uma mensagem por agora.
          // Para atualizar as mãos após baralhar, precisarias chamar a API que retorna as mãos.
          setSuccess({ mensagemJogo: 'Baralho principal baralhado no servidor.' });
      } catch (err: any) {
          setError(err.message);
      }
  }, []);

  const dealHands = useCallback(async () => {
      setLoading(true);
      try {
          const { jogadores, maos } = await api.distribuirMaos();
           // Atualiza jogadores (pode ter mudado o 'temMao') e as mãos
           // Vamos calcular o número de cartas para cada jogador no frontend
           const updatedJogadores = jogadores.map(j => ({
               ...j,
               numeroCartas: maos.find(m => m.idJogador === j.id)?.cartas.length ?? 0
           }));
          setSuccess({ jogadores: updatedJogadores, maos: maos, mensagemJogo: 'Cartas distribuídas!' });
      } catch (err: any) {
          setError(err.message);
      }
  }, []);

   const startBattle = useCallback(async (id1: number, id2: number) => {
        if (gameState.jogadores.length < 2) {
            setError("Precisa de pelo menos 2 jogadores com cartas para batalhar.");
            return;
        }
       // Opcional: Validar se os jogadores selecionados existem e têm cartas
       setLoading(true);
       try {
           const battleState = await api.iniciarBatalha(id1, id2);
           setSuccess({ batalhaAtual: battleState, ultimoResultado: null, mensagemJogo: `Batalha iniciada entre ${battleState.jogador1.nome} e ${battleState.jogador2.nome}!` });
       } catch (err: any) {
           setError(err.message);
       }
   }, [gameState.jogadores.length]); // Adicionar mais dependências se necessário

    const resolveBattle = useCallback(async () => {
        if (!gameState.batalhaAtual) {
            setError("Nenhuma batalha em andamento para resolver.");
            return;
        }
        setLoading(true);
        try {
            const result = await api.terminarBatalha();
            // Após terminar a batalha, precisamos atualizar as mãos e o número de cartas!
            const updatedMaos = await api.mostrarMaos(); // Buscar o estado atualizado das mãos
             const updatedJogadores = gameState.jogadores.map(j => ({
               ...j,
               numeroCartas: updatedMaos.find(m => m.idJogador === j.id)?.cartas.length ?? 0
            }));

            setSuccess({
                ultimoResultado: result,
                batalhaAtual: null, // Limpa a batalha atual
                maos: updatedMaos,
                jogadores: updatedJogadores,
                mensagemJogo: result.resultado // Usa a mensagem do backend
            });

            // Verificar condição de vitória (um jogador sem cartas)
            const perdedor = updatedJogadores.find(j => j.numeroCartas === 0 && gameState.maos.some(m => m.idJogador === j.id)); // Verifica se ele tinha mão antes
            if (perdedor) {
                 setGameState(prev => ({ ...prev, mensagemJogo: `${result.resultado}. Jogo Terminou! ${updatedJogadores.find(j => j.numeroCartas !== 0)?.nome} venceu!`}));
            }

        } catch (err: any) {
            setError(err.message);
        }
    }, [gameState.batalhaAtual, gameState.jogadores, gameState.maos]); // Dependências

  const value = {
    gameState,
    addPlayer,
    loadCards,
    shuffleDeck,
    dealHands,
    startBattle,
    resolveBattle,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

// Hook personalizado para usar o contexto
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export default GameContext;