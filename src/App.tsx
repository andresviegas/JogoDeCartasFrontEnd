import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // Importa Routes e Route
import { useGame } from './context/GameContext';

// Cria componentes para representar cada "página"
import HomePage from './pages/HomePage'; // Página do menu principal
import GuerraGamePage from './pages/GuerraGamePage'; // Página do jogo da Guerra
import NotFoundPage from './pages/NotFoundPage'; // Página para URLs não encontrados (opcional)

import FormCriarJogadores from './components/FormCriarJogadores';
import ListGroup from './components/ListGroup';

/* import GameSetup from './components/GameSetup';
import PlayerList from './components/PlayerList';
import GameBoard from './components/GameBoard'; // ou BattleArea
import MessageDisplay from './components/MessageDisplay'; // ou GameLog
 */
function App() {
  const { gameState, loadCards } = useGame();

  // Carregar as definições das cartas quando a app montar
  useEffect(() => {
    loadCards();
  }, [loadCards]); // `loadCards` está envolvido em useCallback

/*   // Função helper para obter detalhes da carta a partir do ID
  const getCardDetails = (id: number): Carta | undefined => {
      return gameState.baralhoCompleto.find(card => card.id === id);
  } */

  return (
    <div className="App">
      <h1>App</h1> {/* Um título ou header geral */}
      {/* Define as tuas rotas aqui */}
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Rota para o menu principal */}
        <Route path="/guerra" element={<GuerraGamePage />} /> {/* Rota para o jogo da Guerra */}
        <Route path="*" element={<NotFoundPage />} /> {/* Rota "apanha-tudo" para 404 */}
      </Routes>

{/* Podes ter um footer comum aqui fora do Routes */}
</div>
  );
}

export default App;
