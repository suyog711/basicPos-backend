import formidable from 'formidable';

import { Express, Request, Response, NextFunction } from 'express';
import Users from '../../models/userModel';
import { jwtVerify } from '../../utils/jwt';
import { IUser } from '../../types/user.type';
import uploadImage from '../../utils/uploadImage';

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      // console.log('fields parse', fields);
      // console.log('files parse', files);
      if (files !== {} && files.avatars) {
        let avatars = await uploadImage(files.avatars, fields._id, 'profile');
        fields.avatars = avatars;
      }
      let doc = await Users.findOneAndUpdate({ _id: fields._id }, fields);
      res.json({ result: 'success', message: 'Update Successfully' });
    });
  } catch (err) {
    res.json({ result: 'error', message: err.errmsg });
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // let doc = await Users.findOne({ _id: req.params.id });
    console.log('hereeeeee profile');
    let id;
    if (req.body._id) {
      id = req.body._id;
    } else {
      const userData: IUser = jwtVerify(req.headers.authorization as string);
      id = userData._id;
    }
    let user: IUser | any = await Users.findOne({ _id: id });
    // let a={...user};
    delete user.password;
    res.json({ result: 'success', message: 'Fetch successful', data: user });
  } catch (error) {
    res.json({ result: 'error', message: error.toString() });
  }
};
