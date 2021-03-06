import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

export const actionCreateValidation = (request: Request, response: Response, next: NextFunction) => {
    let { email, actionName } = request.body;

    email = email || '';
    actionName = actionName || '';

    const errors = [];

    if (!validator.isEmail(email)) {
        errors.push({ message: 'O email inserido não é válido' });
    }
    if (actionName !== 'start' && actionName !== 'pause') {
        errors.push({ message: 'Houve algum problema com a ação executada pelo usuário' });
    }

    if (errors.length > 0) {
        return response.status(400).json(errors);
    }

    return next();
};

export const actionIndexOneValidation = (request: Request, response: Response, next: NextFunction) => {
    const { email } = request.query;

    if (email === '') {
        console.log(email);
        return response.status(400).json({ message: 'Email is null' });
    }

    return next();
};
