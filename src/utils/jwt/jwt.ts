import jwt from 'jsonwebtoken';

const JWT_SECRET:string = "secretkeyforjwt";

const maxAge: number = 15 * 60;

export const generateJWT =(id: number): string =>{
    return jwt.sign({id}, JWT_SECRET, {expiresIn: maxAge});
}