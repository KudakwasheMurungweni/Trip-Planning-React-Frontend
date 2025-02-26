export interface Profile {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    address?: string;
    // Add any other fields based on your profile data
  }
  
  // `ProfileUpdate` allows partial updates of a `Profile`, excluding `id` and `user`
  export interface ProfileUpdate extends Partial<Omit<Profile, 'id'>> {
    phone_number?: string;
    address?: string;
  }
  