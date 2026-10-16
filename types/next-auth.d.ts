import { UserRole } from "./index";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
      image?: string;
      token?: string;
      user_type?: UserRole;
      profile_incomplete?: boolean;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    image?: string;
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
  }
}
