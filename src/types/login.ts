// Define the structure of the login response
export interface LoginResponse {
    access: string;
    user: {
      id: number;
      username: string;
      email: string;
      // Add any other user fields
    };
  }
  
  // Define the structure of the login input
export  interface LoginInput {
    email_address: string;
    password: string;
  }
  