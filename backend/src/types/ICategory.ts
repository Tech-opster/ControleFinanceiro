export interface CreateCategoryDTO {
  categoria: string;
}

export type UpdateCategoryDTO = Partial<CreateCategoryDTO>;