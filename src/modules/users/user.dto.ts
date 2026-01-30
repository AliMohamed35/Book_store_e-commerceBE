export interface CreateUserDTO{
    name: string,
    email: string,
    password: string,
    address: string,
    phone_number: string,
}

export interface UserResponseDTO{
    name: string,
    email: string,
    address: string,
}

export interface LogoutDTO{
    email: string,
}

export interface LoginResponseDTO{
    email: string,
    token: string
}

export interface LoginDTO{
    email: string,
    password: string
}