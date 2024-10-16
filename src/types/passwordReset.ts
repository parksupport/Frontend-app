export  interface ForgotPasswordInput {
    email: string;
  }
  
export  interface changePasswordInput {
    user: string;
    token: string;
    password: string;
    confirmPassword: string;


}
  

export interface PasswordResetResponse{
    message: string
}

  