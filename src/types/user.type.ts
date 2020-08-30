import { Document } from 'mongoose';

export interface IUser extends Document {
  username: String;
  email: string;
  password: string;
  level: string;
  avatars: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  status: string;
  activateToken: string;
}
