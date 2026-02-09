export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  phone_number: string;
  role: 'CUSTOMER' | 'ADMIN';
  isActive: boolean;
  isVerified: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  address: string;
  phone_number: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: number;
}

// API Response types
export interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface MessageResponse {
  message: string;
}

// Auth state for Redux
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}