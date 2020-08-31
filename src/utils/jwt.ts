import jwt, { Secret } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { IUser } from '../types/user.type';
import config from '../config';

var publicKEY = fs.readFileSync(path.join(__dirname + '../../../../public.key'), 'utf8');
var privateKEY = fs.readFileSync(path.join(__dirname + '../../../../private.key'), 'utf8');
var i = 'Krissio'; // Issuer (Software organization who issues the token)
var s = 'admin@kriss.io'; // Subject (intended user of the token)
var a = 'https://kriss.io'; // Audience (Domain within which this token will live and function)

export const jwtSign = (payload: Pick<IUser, '_id' | 'level' | 'username'>) => {
  let signOptions: any = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: '30d', // 30 days validity
    algorithm: 'RS256',
  };
  return jwt.sign(payload, privateKEY, signOptions);
};
export const jwtActivationToken = (payload: Pick<IUser, 'username' | 'email'>) => {
  return jwt.sign(payload, config.JWT_ACCOUNT_ACTIVATION as Secret, { expiresIn: '365d' });
};
export const jwtVerifyActivationToken = (token: string) => {
  return jwt.verify(token, config.JWT_ACCOUNT_ACTIVATION as Secret);
};

export const jwtVerify = (token: string): any => {
  let signOptions: any = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: '30d', // 30 days validity
    algorithm: 'RS256',
  };
  return jwt.verify(token, publicKEY, signOptions);
};

export const jwtSignPwReset = (payload: Pick<IUser, '_id' | 'firstName'>) => {
  return jwt.sign(payload, config.JWT_RESET_PASSWORD as Secret, {
    expiresIn: '60m',
  });
};
export const jwtVerifyPwReset = (token: string) => {
  return jwt.verify(token, config.JWT_RESET_PASSWORD as Secret);
};
