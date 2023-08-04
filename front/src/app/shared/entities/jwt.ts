export interface Jwt {
    exp: number;
    iat: number;
    id: number;
    role: string;
    sub: string;
}