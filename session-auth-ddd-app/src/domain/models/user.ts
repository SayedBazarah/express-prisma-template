import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserModel implements User {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(email: string, password: string) {
    this.id = uuidv4();
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}