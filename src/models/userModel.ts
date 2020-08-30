import { model, Schema } from 'mongoose';
import { IUser } from '../types/user.type';
const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    level: { type: String, default: 'normal' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    avatars: String,
    status: { type: String, enum: ['not_activated', 'activated'], default: 'not_activated' },
    activateToken: { type: String, default: '' },
  },
  { timestamps: true }
);

userSchema.index({ username: 1 }, { unique: true });
export default model<IUser>('users', userSchema);
