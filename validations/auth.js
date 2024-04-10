import { body } from "express-validator";

export const registerValidator = [
 body("email", 'Неверный формат почты').isEmail(),
 body("password", 'Пароль должен быть миниум 5 символов').isLength({ min: 5 }),
 body("fullName", 'Укажите имя').isLength({ min: 3 }),
 body("avatarUrl", 'Неверный формат ссылки').optional().isURL(),
];
