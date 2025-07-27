export interface CreateExpenseDTO {
  categoria: string;
}

export type UpdateExpenseDTO = Partial<CreateExpenseDTO>;