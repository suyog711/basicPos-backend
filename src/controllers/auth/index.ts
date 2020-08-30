import { Response, Request, NextFunction } from 'express';
import Users from '../../models/userModel';
import bcrypt from 'bcrypt';
import { IUser } from '../../types/user.type';
import { jwtSign, jwtActivationToken, jwtVerifyActivationToken } from '../../utils/jwt';
import { sendActivationLink } from '../../utils/mailer';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUser = new Users({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 8),
    });
    const activateToken = await jwtActivationToken({ username: req.body.username, email: req.body.email });
    user.activateToken = activateToken;
    const newUser = await user.save();
    console.log('user created', newUser);
    sendActivationLink(req.body.email, activateToken)
      .then(sent => {
        res
          .status(201)
          .json({ result: 'success', message: `Email has been sent to ${req.body.email}. Follow the instruction to activate your account` });
      })
      .catch(err => {
        res.json({ result: 'error', message: err.message });
      });
  } catch (err) {
    res.json({ result: 'error', message: err.errmsg });
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user: IUser | null = await Users.findOne({ username: req.body.username });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        if (user.status == 'activated') {
          const payload = {
            _id: user._id,
            level: user.level,
            username: user.username,
          };
          let token = jwtSign(payload);
          res.status(201).json({ result: 'success', token, message: 'Login successfully' });
        } else {
          res.json({
            result: 'error',
            message: 'Your need to activate account first',
          });
        }
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

export const activateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.params.token;
    if (token) {
      let verifyToken = await jwtVerifyActivationToken(token);
      let updatedFields = {
        status: 'activated',
        activateToken: '',
      };
      let doc = await Users.findOneAndUpdate({ activateToken: token }, updatedFields);
      return res.redirect('http://localhost:3000/login/success');
    }
  } catch (error) {
    console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', error);
    return res.redirect('http://localhost:3000/login/error');
  }
};
