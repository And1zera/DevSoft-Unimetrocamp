export interface Product {
  id: string;
  eventoId: string;
  titulo: string;
  endereco: string;
  data: string;
  halfPrice: number;
  preco: number;
  urlImage: string;
  qtdIngresso: number;
  senha: string;
  rg: string;
  qtd: number;
  ativo: boolean;
}

export interface Tickets {
  id: number;
  preco: number;
  rg: string;
  senha: string;
}

export interface Evento {
  urlImage: string;
  titulo: string;
}

export interface Products extends Product {
  evento: Evento;
  usuarioId: string;
}

export interface User {
  email: string;
  senha: string;
  cpf: string;
  nome: string;
  fidelidade: number;
  fidelidadePontuacao: number;
  login: string;
  id: string;
  usuarioId?: string;
}
