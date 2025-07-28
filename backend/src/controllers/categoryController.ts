import tableController  from "./tableController";
import {
  getCategoryService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
  createCategoryService,
} from "../services/categoryService";

const categoryService = {
  getAll: getCategoryService,
  getById: getCategoryByIdService,
  create: createCategoryService,
  update: updateCategoryService,
  delete: deleteCategoryService
};

export const categoryController = tableController(categoryService, "Categoria");