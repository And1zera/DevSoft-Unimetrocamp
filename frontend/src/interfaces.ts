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
  rgs: string;
}

export interface Participant {
  RG: string;
  eventId: number;
  qtd: number;
  index: number;
  codigo: number;
}
