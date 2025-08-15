export interface CreateCategoryDTO {
  category: string;
  userId: number;
}

export type UpdateCategoryDTO = Partial<CreateCategoryDTO>;