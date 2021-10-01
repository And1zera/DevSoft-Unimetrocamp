export interface Product {
  id: number;
  titulo: string;
  endereco: string;
  data: string;
  halfPrice: number;
  preco: number;
  urlImage: string;
  qtdIngresso: number;
  senha: number;
  rg: string;
  qtd: number;
}

export interface Tickets {
  id: number;
  fullPrice: number;
  rg: string;
  senha: number;
}
