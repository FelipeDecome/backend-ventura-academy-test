import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

export const actionCreateValidation = (request: Request, response: Response, next: NextFunction) => {
    const { email, actionName } = request.body;

    const errors = [];

    if (!validator.isEmail(email)) {
        errors.push({ message: 'Email is invalid or null' });
    } else if (actionName !== 'start' && actionName !== 'pause') {
        errors.push({ message: 'Action name is invalid or null' });
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
