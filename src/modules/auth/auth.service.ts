import User, { UserAttributes } from "../../DB/models/user.model.ts";
import { BadRequestError, InvalidCredentialsError, ResourceNotFoundError, UserAlreadyExistError } from "../../ExceptionHandler/customError.ts";
import { comparePassword, hashPassword } from "../../utils/hash/hash.ts";
import { generateJWT } from "../../utils/jwt/jwt.ts";
import logger from "../../utils/logs/logger.ts";
import { CreateUserDTO, LoginDTO, LoginResponseDTO, LogoutDTO, UserResponseDTO } from "../users/user.dto.ts";

export class UserService{
    async register (userData: CreateUserDTO): Promise<UserResponseDTO> {
        // Check user Existence
        const existingUser = await User.findOne({where: {email: userData.email}});

        if(existingUser){
            throw new UserAlreadyExistError("User already exists!");
        }

        // Hash password
        const hashedPassword = await hashPassword(userData.password);

        // Convert to entity >> DB
        const newUser = await User.create({
            ...userData,
            password: hashedPassword,
            isActive: false,
            isDeleted: false
        })

        logger.info(`User created: ${newUser}`)

         return {
            name: newUser.getDataValue('name'),
            email: newUser.getDataValue('email'),
            address: newUser.getDataValue('address')
         }
    }

    async login (userData: LoginDTO): Promise<LoginResponseDTO>{
        const existingUser = await User.findOne({where: {email: userData.email}});

        if(!existingUser) throw new ResourceNotFoundError("User not found!");

        const user = existingUser.toJSON() as UserAttributes;

        if(user.isActive) throw new BadRequestError("User already logged in!");
        const comparedPassword = await comparePassword( userData.password, user.password)

        if(!comparedPassword) throw new InvalidCredentialsError();
        existingUser.set("isActive", true);

        const token = generateJWT(user.id);

        // Save user record
        await existingUser.save();

        logger.info(`Logged in user: ${userData.email}`)


        return {
            email: user.email,
            token
        }

    }

    async logout (email: string): Promise<LogoutDTO>{
        const existingUser = await User.findOne({where: {email}});

        if(!existingUser){
            throw new ResourceNotFoundError("User Not found!");
        }

        existingUser.set("isActive", false);

        await existingUser.save();

        logger.info(`Logged out user: ${email}`)

        return{
            email
        }
    }
}

export const userService = new UserService();