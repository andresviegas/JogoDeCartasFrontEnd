// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importa o Link!

function HomePage() {
  return (
    <div>
      <h2>Menu Principal</h2>
      <p>Escolhe um jogo:</p>
      <nav>
        <ul>
          <li>
            {/* Usa Link em vez de <a> para navegação interna */}
            <Link to="/guerra">Jogar Guerra</Link>
          </li>
          {/* Adiciona mais links para outros jogos aqui quando os tiveres */}
          {/* <li><Link to="/outro-jogo">Jogar Outro Jogo</Link></li> */}
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;