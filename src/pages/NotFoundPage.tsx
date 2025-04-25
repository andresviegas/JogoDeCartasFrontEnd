// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div>
      <h2>Oops! Página não encontrada (404)</h2>
      <p>A página que procuras não existe.</p>
      <Link to="/">Voltar ao Início</Link>
    </div>
  );
}

export default NotFoundPage;