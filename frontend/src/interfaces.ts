export interface Product {
  id: number;
  title: string;
  location: string;
  date: string;
  halfPrice: number;
  fullPrice: number;
  image: string;
  amount: number;
  qtd: number;
  senha: number;
  rg: string;
}

export interface Tickets {
  id: number;
  fullPrice: number;
  rg: string;
  senha: number;
}
