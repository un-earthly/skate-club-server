import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utility/responseSender';
import { config } from '../config';
export class ApiError extends Error {
    public statusCode: number;
    public message: string;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

export const globalErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // console.error(err.stack);

    let statusCode = 500;
    let message = 'Internal Server Error';

    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    sendResponse(res, statusCode, config.env === "development" ? err.stack : null, message);
};
