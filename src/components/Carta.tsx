// src/components/CartaVisual.tsx
import React from 'react';
import { getImagemCarta } from '../utils/cartaImagens';

type Props = {
  visivel: boolean;
  nome: string;
  width?: number;
  alt?: string;
};

function Carta({ visivel, nome, width = 100, alt }: Props) {
  if (!visivel) return null
  const src = getImagemCarta(nome);
  return <img src={src} width={width} alt={alt || nome} />;
}

export default Carta;
