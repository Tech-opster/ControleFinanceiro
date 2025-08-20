export interface CreateCategoryDTO {
  category: string;
  userId: number;
  categoryId: number;
}

export type UpdateCategoryDTO = {
  id: number;
  category: string;
  userId: number;
};

export interface DeleteCategoryDTO {
  id: number;
  userId: number;
}
