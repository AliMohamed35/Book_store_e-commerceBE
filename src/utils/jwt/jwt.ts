import jwt from 'jsonwebtoken';

// const JWT_SECRET:string = "secretkeyforjwt";
// const maxAge: number = 60 * 60;

const ACCESS_TOKEN_SECRET: string = "secretkeyforjwt";
const REFRESH_TOKEN_SECRET: string = "secretkeyforrefreshjwt";

const ACCESS_TOKEN_EXPIRY = '1m';
const REFRESH_TOKEN_EXPIRY = '7d';


export const generateAccessToken =(id: number): string =>{
    return jwt.sign({id}, ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRY});
}

export const generateRefreshToken = (id: number): string => {
  return jwt.sign({ id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
};

// export const decodeJWT =(token: string): jwt.JwtPayload | string =>{
//     return jwt.verify(token, JWT_SECRET);
// }

export const verifyAccessToken = (token: string): jwt.JwtPayload | string => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

// Verify Refresh Token
export const verifyRefreshToken = (token: string): jwt.JwtPayload | string => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};

export const generateJWT = generateAccessToken;
export const decodeJWT = verifyAccessToken;