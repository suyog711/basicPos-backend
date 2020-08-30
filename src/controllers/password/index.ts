import { Response, Request, NextFunction } from 'express';
import Users from '../../models/userModel';
import bcrypt from 'bcrypt';
import { IUser } from '../../types/user.type';
import { jwtSign, jwtActivationToken, jwtVerifyActivationToken, jwtSignPwReset, jwtVerifyPwReset } from '../../utils/jwt';
import { sendResetPwLink } from '../../utils/mailer';

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  Users.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.json({
        result: 'error',
        message: 'User with that email does not exist',
      });
    }

    const token = jwtSignPwReset({ _id: user._id, firstName: user.firstName });

    user.updateOne({ resetPasswordToken: token }, (err, success) => {
      if (err) {
        console.log('RESET PASSWORD LINK ERROR', err);
        return res.status(400).json({
          result: 'error',
          message: 'Database connection error on user password forgot request',
        });
      } else {
        sendResetPwLink(email, token)
          .then(response => {
            return res.json({
              result: 'success',
              message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
            });
          })
          .catch(err => {
            return res.json({ result: 'error', message: err.message });
          });
      }
    });
  });
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body;
    let resetPasswordToken: string | any = req.query.token;
    if (resetPasswordToken) {
      let token = await jwtVerifyPwReset(resetPasswordToken);
      let encrypt_pass = await bcrypt.hash(password, 8);
      let updatedFields = {
        password: encrypt_pass,
        resetPasswordToken: '',
      };

      await Users.findOneAndUpdate(
        {
          resetPasswordToken: resetPasswordToken,
        },
        updatedFields
      ).then(responses => {
        return res.json({
          result: 'success',
          message: 'Password update succesfully your can try login again',
        });
      });
    } else {
      return res.json({
        result: 'error',
        message: 'No Found Token',
      });
    }
  } catch (error) {
    console.log('JWT VERIFY IN RESET PW ERROR', error);
    return res.json({
      result: 'error',
      message: 'Expired link. Try again',
    });
  }
};
