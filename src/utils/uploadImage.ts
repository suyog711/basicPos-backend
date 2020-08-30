import path from 'path';
import fs from 'fs-extra';
import config from '../config';
const uploadImage = async (imageFile: any, id: any, prefix: string | number = Date.now()) => {
  // console.log('files', files);
  var fileExtention = imageFile.name.split('.').pop();
  let fileName = `${prefix}-${id}.${fileExtention}`;
  var newpath = path.resolve(__dirname + '../../../uploaded/images') + '/' + fileName;
  console.log('newpath', newpath);
  fs.exists(newpath, async exists => {
    if (exists) {
      await fs.remove(newpath);
    }
  });
  await fs.move(imageFile.path, newpath);
  return `${config.BASE_URL}/images/${fileName}`;

  // await Users.findOneAndUpdate({ _id: doc.id }, doc);
};

export default uploadImage;
