export interface CreateCryptoDTO {
  moeda: string;
  valor: number;
  cotacao: number;
  quantidade: number;
  dataCompra: Date;
}

export type UpdateCryptoDTO = Partial<CreateCryptoDTO>;