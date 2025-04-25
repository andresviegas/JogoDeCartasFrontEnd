import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importa o BrowserRouter
import App from './App';
import { GameProvider } from './context/GameContext';
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* Envolve a tua aplicação com o BrowserRouter */}
      <GameProvider> {/* O teu contexto pode ficar dentro ou fora, dependendo do que precisa */}
        <App />
      </GameProvider>
    </BrowserRouter>
  </React.StrictMode>,
);