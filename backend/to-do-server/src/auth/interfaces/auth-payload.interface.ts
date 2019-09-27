import { User } from "src/user/interfaces/user.interface";

export interface AuthPayload {
    token: string;
    user: User;
  }