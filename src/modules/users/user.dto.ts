export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  address: string;
  phone_number: string;
}

export interface UserResponseDTO {
  name: string;
  email: string;
  address: string;
}

export interface LogoutDTO {
  email: string;
}

export interface LoginResponseDTO {
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface DeleteDTO {
  email: string;
}

export interface UpdatedDTO {
  name: string;
  email: string;
  password: string;
  address: string;
  phone_number: string;
}

export interface ResetPasswordResponseDTO {
  email: string;
}

export interface ResetPasswordDTO {
  password: string;
  newPassword: string;
}
