const multer = require('multer');
const fs = require('fs')

/* 
import multer from 'multer'
import crypto from 'crypto'
import { extname } from 'path'
import slug from 'slug'
import fs from 'fs'
storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const { id } = req.body
      const path = `./uploads/gallery/${id}`
      fs.mkdirSync(path, { recursive: true })
      return cb(null, path)
    },
    filename: (req, file, cb) => {
      const { description } = req.body

      crypto.randomBytes(3, (err, res) => {
        if (err) return cb(err)

        return cb(null, slug(description, { lower: true }) + '_' + res.toString('hex') + extname(file.originalname))
      })
    }
}) 
*/

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        const path = `/public/uploads/`
        fs.mkdirSync(path, { recursive: true })
        cb(null, path)
    },
    filename: function (req, file, cb){
        const ext = file.mimetype.split('/')[1];
        const filename = file.originalname.split('.')[0]
        cb(null, `${filename}-${Date.now()}.${ext}`);
    }
})

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new AppError('No es una imagen.', 400), false);
    }
};

const upload = multer({ storage: storage, fileFilter: multerFilter })

module.exports = {
    upload
}