export interface CreateInvestmentDTO {
  emissor: string;
  titulo: string;
  valor: number;
  dataCompra: Date;
  dataVencimento: Date;
  rentabilidade: number;
  banco: string;
}

export type UpdateInvestmentDTO = Partial<CreateInvestmentDTO>;