// src/app/models/user.model.ts
export interface User {
  email: string;
  name: string;
  surname: string;
  password: string;
  phone: string;
  isHost: boolean;
  isRenter: boolean;
}