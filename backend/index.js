import express from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import connectdb from './db/connectdb.js';
import path from 'path'
import cors from 'cors';

import jwt from 'jsonwebtoken'
import FreindFinderController from './Controllers/FreindFinderController.js';

const app = express()
const port = 5001;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";



connectdb(DATABASE_URL).then(() => {
    console.log("Database connected successfully");
    app.use(express.json())
    app.use(cors());
    app.get('/', (req, res) => {
        res.send("Express App is running")



    })
    const storage = multer.diskStorage({
        destination: './upload/images',
        filename: (req, file, cb) => {
            return cb(null, `${file.fieldname}_${(Date.now())}${path.extname(file.originalname)}`)
        }
    })
    const upload = multer({ storage: storage })

    app.use('/images', express.static('upload/images'))
    app.get('/dashboard/:id', FreindFinderController.DisplayDetails)

    app.use(express.static('public'));


    app.post('/upload', upload.single('product'), (req, res) => {
        res.json({
            success: 1,
            image_url: `http://localhost:${port}/images/${req.file.filename}`
        });
    })
    app.post('/signup', FreindFinderController.Signup)
    app.post('/search', FreindFinderController.Show_friend)
    app.post('/adddata/:id', FreindFinderController.Add_Post)
    app.post('/login', FreindFinderController.Login)
    app.post('/deletepost', FreindFinderController.DeletePost)
    app.post('/addimage/:id', FreindFinderController.UploadUserImage)
    app.get('/post/:id', FreindFinderController.Post)

    app.listen(port, () => {

        console.log(`Server listening at http://localhost:${port}`);

    })

})
    .catch(error => {
        console.error("Database connection failed", error);
    });
