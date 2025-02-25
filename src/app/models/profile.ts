// Base Django User model fields
export interface DjangoUser {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  }
  
  // Profile model matching Django
  export interface Profile {
    id: number;
    user: DjangoUser;
    phone_number?: string;
    address?: string;
  }
  
  // Combined type for authenticated user
  export interface AuthUser extends DjangoUser {
    profile?: Profile;
  }