export interface CreateCategoryDTO {
  category: string;
  userId: number;
  categoryId: number;
}

export interface DeleteCategoryDTO {
  id: number;
  userId: number;
}

export type UpdateCategoryDTO = Partial<CreateCategoryDTO>;
