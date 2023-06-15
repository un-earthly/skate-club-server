import { Response } from 'express';

export const sendResponse = (
    res: Response,
    status: number,
    data: any,
    message?: string
) => {
    const response = {
        status,
        data,
        message,
    };

    res.status(status).json(response);
};
