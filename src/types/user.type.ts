import { Document } from 'mongoose';

export interface IUser extends Document {
  username: String;
  email: string;
  password: string;
  level: string;
}
