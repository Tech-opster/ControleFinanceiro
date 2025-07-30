export interface CreateCryptoDTO {
  name: string;
  amount: number;
  price: number;
  quantity: number;
  purchaseDate: Date;
}

export type UpdateCryptoDTO = Partial<CreateCryptoDTO>;