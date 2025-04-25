// src/services/api.ts
import { Jogador, Mao, Carta, BattleState, BattleResult } from '../types/game';

const API_BASE_URL = 'https://localhost:7017'; // OU a tua URL base do backend

// Helper para tratar respostas e erros
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText || response.statusText}`);
  }
  if (response.status === 204) { // No Content
      return null as T; // Ou um valor padrão apropriado
  }
  try {
      return await response.json() as T;
  } catch (e) {
       // Handle cases where response is OK but body is not JSON or empty when expecting JSON
      console.error("Failed to parse JSON:", e);
      throw new Error("Failed to parse server response.");
  }
}

// services/api.ts
export const criarJogadores = async (nomes: string[]): Promise<Jogador[]> => {
  const response = await fetch(`${API_BASE_URL}/CriarJogadores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nomes), // <-- direto o array, sem `{ nomes: ... }`
  });

  return handleResponse<Jogador[]>(response);
};


export const getJogadores = async (): Promise<Jogador[]> => {
  const response = await fetch(`${API_BASE_URL}/GetJogadores`);
  return handleResponse<Jogador[]>(response);
};

export const criarCartas = async (): Promise<Carta[]> => {
    const response = await fetch(`${API_BASE_URL}/CriarCartas`, { method: 'POST' });
    // Assume que /CriarCartas retorna a lista de cartas criadas/definidas
    return handleResponse<Carta[]>(response);
};

 export const baralharDeckPrincipal = async (): Promise<any> => { // Ajustar o tipo de retorno conforme a API
    // Nota: A tua API /Baralhar aceita um 'id' que não parece ser usado na lógica.
    // Se não for necessário, podes remover do backend ou enviar um valor default (ex: 0).
    const response = await fetch(`${API_BASE_URL}/Baralhar?id=0`, { method: 'POST' });
    return handleResponse<any>(response); // O backend retorna { mensagem, baralho }
};

 export const distribuirMaos = async (): Promise<{ jogadores: Jogador[], maos: Mao[] }> => {
    const response = await fetch(`${API_BASE_URL}/DistribuirMaosGuerra`, { method: 'POST' });
    return handleResponse<{ jogadores: Jogador[], maos: Mao[] }>(response);
 };

 export const baralharMaoJogador = async (idJogador: number): Promise<any> => { // Ajustar tipo de retorno
     const response = await fetch(`<span class="math-inline">\{API\_BASE\_URL\}/BaralharCartasJogadores?idJogador\=</span>{idJogador}`, { method: 'POST'});
     return handleResponse<any>(response); // A API retorna um objeto complexo
 }

 export const iniciarBatalha = async (id1: number, id2: number): Promise<BattleState> => {
     const response = await fetch(`${API_BASE_URL}/IniciarBatalha?id1=${id1}&id2=${id2}`);
     return handleResponse<BattleState>(response);
 };

 export const terminarBatalha = async (): Promise<BattleResult> => { // Ajustar tipo de retorno
     const response = await fetch(`${API_BASE_URL}/TerminarBatalha`);
     // A API retorna um objeto com Resultado e as cartas iniciais
     return handleResponse<BattleResult>(response);
 };

  export const mostrarMaos = async (): Promise<Mao[]> => {
     const response = await fetch(`${API_BASE_URL}/MostrarMaos`);
     return handleResponse<Mao[]>(response);
 };

// ... outras funções API se necessário