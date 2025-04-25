// src/FormCriarJogadores.tsx
import React, { useState } from 'react';
import TxtBoxCriarJogadores from './FormCriarJogadores/TxtBoxCriarJogadores';
import BtnCriarJogadores from './FormCriarJogadores/BtnCriarJogadores';
import { criarJogadores } from '../services/api'; // função atualizada

interface FormCriarJogadorsProps {
  visivel: boolean;
}

function FormCriarJogadores({visivel}: FormCriarJogadorsProps) {

  if (!visivel) return null;

  const [campo1, setCampo1] = useState('');
  const [campo2, setCampo2] = useState('');
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!campo1 || !campo2) {
      setErro('Ambos os campos precisam ser preenchidos!');
      return;
    }

    try {
      const nomes = [campo1, campo2];
      const jogadoresCriados = await criarJogadores(nomes);

      console.log('Jogadores criados:', jogadoresCriados);

      setCampo1('');
      setCampo2('');
      setErro(null);
    } catch (err) {
      console.error('Erro ao criar jogadores:', err);
      setErro('Erro ao criar jogadores. Tente novamente.');
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <TxtBoxCriarJogadores
        label="Jogador 1"
        value={campo1}
        onChange={(e) => setCampo1(e.target.value)}
        error={erro && !campo1 ? erro : null}
      />
      <TxtBoxCriarJogadores
        label="Jogador 2"
        value={campo2}
        onChange={(e) => setCampo2(e.target.value)}
        error={erro && !campo2 ? erro : null}
      />
      <BtnCriarJogadores onClick={handleSubmit} />
    </form>
  );
}

export default FormCriarJogadores;
