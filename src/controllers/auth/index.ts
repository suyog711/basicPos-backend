import { Response, Request, NextFunction } from 'express';
import Users from '../../models/userModel';
import bcrypt from 'bcrypt';
import { IUser } from '../../types/user.type';
import { jwtSign } from '../../utils/jwt';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUser = new Users({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 8),
    });
    // req.body.password = await bcrypt.hash(req.body.password, 8);
    const newUser = await user.save();
    res.status(201).json({ result: 'success', message: 'Register successfully' });
  } catch (err) {
    res.json({ result: 'error', message: err.errmsg });
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user: IUser | null = await Users.findOne({ username: req.body.username });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const payload = {
          _id: user._id,
          level: user.level,
          username: user.username,
        };
        let token = jwtSign(payload);
        res.status(201).json({ result: 'success', token, message: 'Login successfully' });
      } else {
        res.json({ result: 'error', message: 'Invalid password' });
      }
    } else {
      res.json({ result: 'error', message: 'Invalid username' });
    }
  } catch (err) {
    res.json({ result: 'error', message: err.errmsg });
  }
};
