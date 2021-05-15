import mongoose from 'mongoose';

const gridfs = require('gridfs-stream');

export async function saveImage(req: any, res: any) {
  try {
    if (!req.file || req.file.length <= 0) {
      return res.end('You must select at least 1 file.');
    }
    res.status(201).end('successfully uploaded image');
  } catch (error) {
    return res.end({ error: 'Error when trying upload many files' });
  }
}

export async function retrieveImage(req: any, res: any) {
  // console.log('RETRIEVE IMAGE')
  gridfs.mongo = mongoose.mongo;
  const { connection } = mongoose;
  const gfs = gridfs(connection.db);
  gfs.exist({ filename: req.params.id }, (err: any, file: any) => {
    if (err || !file) {
      res.send('File Not Found');
    } else {
      const readstream = gfs.createReadStream({ filename: req.params.id });
      readstream.pipe(res);
    }
  });
}
