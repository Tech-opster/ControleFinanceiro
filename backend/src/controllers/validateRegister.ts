import { body } from "express-validator";

export const validateRegister = [
  body("email")
    .trim()                                   
    .normalizeEmail()                         
    .notEmpty().withMessage("E‑mail é obrigatório")
    .bail()
    .isEmail().withMessage("E‑mail inválido")
    .bail(),

  body("password")
    .trim()
    .notEmpty().withMessage("Senha é obrigatória")
    .bail()
    .isLength({ min: 6 }).withMessage("Senha deve ter ao menos 6 caracteres")
    .bail(),

  body("name")
    .trim()
    .notEmpty().withMessage("Nome é obrigatório")
    .bail()
    .isLength({ min: 3 }).withMessage("Nome deve ter pelo menos 3 caracteres")
    .bail()
    .matches(/^[A-Za-zÀ-ÿ\s-]+$/).withMessage("Nome só pode ter letras, espaços e hífens")
    .bail(),
];
