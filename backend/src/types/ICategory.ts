export interface CreateCategoryDTO {
  category: string;
}

export type UpdateCategoryDTO = Partial<CreateCategoryDTO>;