import nodemailer from 'nodemailer';
import config from '../config';
let mailConfing = {
  service: 'gmail',
  auth: {
    user: 'basicpos711@gmail.com',
    pass: '711basicpos',
  },
};

export const sendActivationLink = (email: string, token: string) => {
  const transporter = nodemailer.createTransport(mailConfing);
  let mail = {
    to: email,
    subject: `Account activation link`,
    html: `
          <h1>Please use the following link to activate your account</h1>
          <a href="${config.BASE_URL}/activation/${token}">${config.BASE_URL}/activation/${token}</a>
          <hr />
          <p>This email may contain sensitive information</p>
          <p>and link will  expired in 60 minutes</p>
      `,
  };
  return transporter.sendMail(mail);
};

export const sendResetPwLink = (email: string, token: string) => {
  const transporter = nodemailer.createTransport(mailConfing);
  let mail = {
    to: email,
    subject: `Password Reset link`,
    html: `
          <h1>Please use the following link to reset your password</h1>
          <a href="${config.WEB_URL}/resetpassword/${token}">Reset password</a>
          <hr />
          <p>This email may contain sensitive information</p>
          <p>and link will  expired in 60 minutes</p>
      `,
  };
  return transporter.sendMail(mail);
};
