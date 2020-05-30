import { Role } from './role.enum';

export class TokenPayload {
    login: string;
    role: Role;
    sub: string;
    jti: string;
    iat: number;
    nbf: number;
    exp: number;
    iss: string;
    aud: string;
}
