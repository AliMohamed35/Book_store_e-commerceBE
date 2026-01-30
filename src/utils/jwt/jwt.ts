import jwt from 'jsonwebtoken';

const JWT_SECRET:string = "secretkeyforjwt";

const maxAge: number = 60 * 60;

export const generateJWT =(id: number): string =>{
    return jwt.sign({id}, JWT_SECRET, {expiresIn: maxAge});
}

export const decodeJWT =(token: string): jwt.JwtPayload | string =>{
    return jwt.verify(token, JWT_SECRET);
}