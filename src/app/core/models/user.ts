import { Role } from './role.enum';

export interface User {
    id?: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    verification?: boolean;
}
