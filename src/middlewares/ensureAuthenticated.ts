import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import jwtConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}
export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const { authorization } = request.headers;
    if (!authorization) {
        throw new Error('Token not exists');
    }

    const [, token] = authorization.split(' ');
    try {
        const decoded = verify(token, jwtConfig.jwt.secret);
        const { sub } = decoded as TokenPayload;
        request.user = { id: sub };
        return next();
    } catch {
        throw new Error('Token is invalid');
    }
}
