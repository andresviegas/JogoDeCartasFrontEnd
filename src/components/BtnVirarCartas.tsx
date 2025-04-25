import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { iniciarBatalha } from '../services/api'; // Importa a função da API

interface BtnVirarCartasProps {
  visivel: boolean;
  onClick?: () => void; // callback opcional (ex: para atualizar estado externo)
}

function BtnVirarCartas({ visivel, onClick }: BtnVirarCartasProps) {
  if (!visivel) return null;

  const handleClick = async () => {
    try {
      const resultado = await iniciarBatalha(1, 2); // ← CHAMA API COM ID 1 E 2
      console.log('Resultado da batalha:', resultado);
      if (onClick) onClick(); // se quiseres sinalizar algo ao componente pai
    } catch (error) {
      console.error('Erro ao iniciar batalha:', error);
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleClick}>
      Virar Cartas
    </button>
  );
}

export default BtnVirarCartas;
