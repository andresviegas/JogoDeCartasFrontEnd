// src/pages/GuerraGamePage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Podes ter um link para voltar
import { useGame } from '../context/GameContext'; // Usa o contexto para obter estado e ações
/* import GameSetup from '../components/GameSetup';
import PlayerList from '../components/PlayerList';
import GameBoard from '../components/GameBoard';
import MessageDisplay from '../components/MessageDisplay';
 */

import ListGroup from '../components/ListGroup';
import FormCriarJogadores from '../components/FormCriarJogadores';
import BtnComecarGuerra from '../components/BtnComecarGuerra';
import BtnVirarCartas from '../components/BtnVirarCartas';
import Carta from '../components/Carta';

function GuerraGamePage() {
  const { gameState } = useGame(); // Acede ao estado do jogo

    // Definindo o estado do jogo (se começou ou não)
    const [jogoComecou, setJogoComecou] = useState(false);
    const [cartasParaCima, setCartasParaCima] = useState(false);

  // Função chamada quando o botão é clicado para começar o jogo
  const iniciarJogo = () => {
    setJogoComecou(true);
    // Aqui podemos adicionar outras ações para começar o jogo
    console.log('Jogo iniciado!');
  };

  const virarCartas = () => {
    setCartasParaCima(true);
  };

   // Função helper para obter detalhes da carta a partir do ID (exemplo)
   const getCardDetails = (id: number) => {
       return gameState.baralhoCompleto.find(card => card.id === id);
   }

  return (
    <div>
      <h2>Jogo da Guerra</h2>
      <FormCriarJogadores visivel={!jogoComecou} />
      <ListGroup/>
      <BtnComecarGuerra visivel={!jogoComecou} onClick={iniciarJogo} />
      <BtnVirarCartas visivel={!cartasParaCima && jogoComecou} onClick={virarCartas}/>
      {cartasParaCima && jogoComecou && (
      <div>
        <Carta visivel={cartasParaCima && jogoComecou} nome="Valete de Copas" width={100} />
        <p>Jogador 1</p>
      </div>
    )}
    {cartasParaCima && jogoComecou && (
      <div>
        <Carta visivel={cartasParaCima && jogoComecou} nome="Valete de Copas" width={100} />
        <p>Jogador 2</p>
      </div>
    )}
    {!cartasParaCima && jogoComecou && (
      <div>
        <Carta visivel={!cartasParaCima && jogoComecou} nome="Ás de Espadas" width={100} />
        <p>Jogador 1</p>
      </div>
    )}
    {!cartasParaCima && jogoComecou && (
      <div>
        <Carta visivel={!cartasParaCima && jogoComecou} nome="Ás de Espadas" width={100} />
        <p>Jogador 2</p>
      </div>
    )}
      <Link to="/">Voltar ao Menu</Link> {/* Link para voltar */}
      <hr />

      {/* Renderiza os componentes específicos do jogo */}
{/*       <MessageDisplay message={gameState.mensagemJogo} error={gameState.error} isLoading={gameState.isLoading} />
      <GameSetup />
      <PlayerList players={gameState.jogadores} />
      <GameBoard
          battleState={gameState.batalhaAtual}
          lastResult={gameState.ultimoResultado}
          getCardDetails={getCardDetails}
          playersInGame={gameState.jogadores}
      /> */}
    </div>
  );
}

export default GuerraGamePage;