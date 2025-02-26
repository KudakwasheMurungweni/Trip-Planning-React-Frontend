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
    user: DjangoUser;  // Link the profile to a Django user
    phone_number?: string;
    address?: string;
  }
  
  // Combined type for authenticated user
  export interface AuthUser extends DjangoUser {
    profile?: Profile;  // Optional profile data
  }
  
  // Profile update interface for modifying user profiles
  export interface ProfileUpdate extends Partial<Omit<Profile, 'id' | 'user'>> {
    phone_number?: string;
    address?: string;
  }
  