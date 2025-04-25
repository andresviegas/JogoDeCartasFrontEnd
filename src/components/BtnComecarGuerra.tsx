// src/components/BotaoGuerra.tsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { baralharDeckPrincipal, distribuirMaos } from '../services/api';

interface BotaoGuerraProps {
  visivel: boolean;
  onClick?: () => void; // Opcional: callback após a distribuição
}

function BotaoGuerra({ visivel, onClick }: BotaoGuerraProps) {
  if (!visivel) return null;

  const handleClick = async () => {
    try {
      await baralharDeckPrincipal();
      await distribuirMaos();
      if (onClick) onClick();
    } catch (err) {
      console.error('Erro ao iniciar a guerra:', err);
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleClick}>
      Começar Guerra
    </button>
  );
}

export default BotaoGuerra;
