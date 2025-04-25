// src/utils/cartaImagens.ts

export const nomeParaFicheiro = (nome: string): string => {
    const conversoes: Record<string, string> = {
      'Ás': 'ace',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      'Valete': 'jack',
      'Dama': 'queen',
      'Rei': 'king',
      'Copas': 'hearts',
      'Ouros': 'diamonds',
      'Espadas': 'spades',
      'Paus': 'clubs',
    };
  
    const partes = nome.split(' de '); // Ex: ["Ás", "Copas"]
    if (partes.length !== 2) return '';
  
    const valor = conversoes[partes[0]];
    const naipe = conversoes[partes[1]];
  
    if (!valor || !naipe) return '';
  
    return `${valor}_of_${naipe}.png`;
  };
  
  export const getImagemCarta = (nome: string): string => {
    const ficheiro = nomeParaFicheiro(nome);
    return `/assets/cartas/${ficheiro}`; // caminho relativo ao `public/` ou `vite`
  };
  