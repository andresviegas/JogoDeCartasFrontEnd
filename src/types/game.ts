// src/types/game.ts

export interface Carta {
    id: number;
    name: string;
    description: string;
    valor: number; // Nota: No backend tens Valor e Posicao. Decide qual usar no frontend para display/lógica se necessário.
    posicao: number; // A Posição parece ser a crucial para comparar no jogo Guerra.
  }
  
  export interface Jogador {
    id: number;
    nome: string;
    temMao: boolean;
    // Frontend pode adicionar campos extra que não vêm do backend, ex:
    // numeroCartas?: number; // Calculado no frontend
  }
  
  export interface Mao {
    idJogador: number;
    cartas: number[]; // Lista de IDs das cartas
  }
  
  // Interface para o estado da batalha iniciado
  export interface BattleState {
    jogador1: {
      nome: string;
      id: number;
      primeiraCarta: Carta; // A API /IniciarBatalha retorna o objeto Carta aqui
    };
    jogador2: {
      nome: string;
      id: number;
      primeiraCarta: Carta; // A API /IniciarBatalha retorna o objeto Carta aqui
    };
  }
  
  // Interface para o resultado da batalha terminado
  export interface BattleResult {
      resultado: string;
      cartaInicialJogador1?: Carta; // Pode ser útil mostrar as cartas que causaram a guerra
      cartaInicialJogador2?: Carta;
      // Podes adicionar mais detalhes se a API retornar
  }
  
  // Interface para o estado global do jogo no frontend
  export interface GameState {
      jogadores: Jogador[];
      maos: Mao[];
      baralhoCompleto: Carta[]; // Armazenar todas as cartas aqui após chamar /CriarCartas
      batalhaAtual: BattleState | null;
      ultimoResultado: BattleResult | null;
      mensagemJogo: string | null;
      isLoading: boolean;
      error: string | null;
  }