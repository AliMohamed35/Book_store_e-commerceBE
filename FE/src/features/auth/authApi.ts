import api from '../../services/api';
import type { 
  LoginRequest, 
  RegisterRequest, 
  VerifyOtpRequest, 
  AuthResponse, 
  MessageResponse 
} from './types';

export const authApi = {
  // POST /users/register
  register: async (data: RegisterRequest): Promise<MessageResponse> => {
    const response = await api.post('/users/register', data);
    return response.data;
  },

  // POST /users/login
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/users/login', data);
    return response.data;
  },

  // POST /users/verify (OTP verification)
  verifyOtp: async (data: VerifyOtpRequest): Promise<AuthResponse> => {
    const response = await api.post('/users/verify', data);
    return response.data;
  },

  // POST /users/logout
  logout: async (): Promise<MessageResponse> => {
    const response = await api.post('/users/logout');
    return response.data;
  },

  // POST /users/reset-password
  resetPassword: async (data: { oldPassword: string; newPassword: string }): Promise<MessageResponse> => {
    const response = await api.post('/users/reset-password', data);
    return response.data;
  },
};