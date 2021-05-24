import { Response } from 'express';

export interface ServiceResponse<T> {
    message: string;
    data: T;
    statusCode: number;
}
export function asServiceResponse<T>(code: number, message: string, data: T): ServiceResponse<T> {
    return { error: false, statusCode: code, message, data } as ServiceResponse<T>;
}

export function asControllerResponse<T>(res: Response, serviceResponse: ServiceResponse<T>) {
    return res.status(serviceResponse.statusCode).send(serviceResponse);
}
