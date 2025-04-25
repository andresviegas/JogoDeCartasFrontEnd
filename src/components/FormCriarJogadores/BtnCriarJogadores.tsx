// src/FormCriarJogadores/BtnCriarJogadores.tsx
import React from 'react';

interface BtnCriarJogadoresProps {
  onClick: () => void;
}

function BtnCriarJogadores({ onClick }: BtnCriarJogadoresProps) {
  return (
    <button type="button" className="btn btn-primary" onClick={onClick}>
      Criar Jogadores
    </button>
  );
}

export default BtnCriarJogadores;
