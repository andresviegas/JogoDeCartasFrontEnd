// src/components/ListGroup.tsx
import React, { useEffect, useState } from 'react';
import { getJogadores } from '../services/api'; // Importando a função para pegar jogadores
import { Jogador } from '../types/game'; // Importando a interface Jogador

function ListGroup() {
  const [jogadores, setJogadores] = useState<Jogador[]>([]); // Usando a interface Jogador
  const [erro, setErro] = useState<string | null>(null);

  // Usando useEffect para carregar os jogadores ao montar o componente
  useEffect(() => {
    const fetchJogadores = async () => {
      try {
        const jogadoresList = await getJogadores();
        setJogadores(jogadoresList);
      } catch (error) {
        console.error('Erro ao carregar jogadores:', error);
        setErro('Erro ao carregar jogadores. Tente novamente.');
      }
    };

    fetchJogadores();
  }, []); // O array vazio faz com que a requisição seja feita uma vez, ao carregar o componente

  if (erro) {
    return <div className="alert alert-danger">{erro}</div>;
  }

  return (
    <div>
      <h3>Jogadores</h3>
      <ul className="list-group">
        {jogadores.map((jogador) => (
          <li key={jogador.id} className="list-group-item">
            {jogador.nome} - {jogador.temMao ? 'A jogar' : 'À espera'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListGroup;
