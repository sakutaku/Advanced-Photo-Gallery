import express from "express";
import mongoose from "mongoose";
import User from "../models/User";
import Photo from "../models/Photo";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import permit from "../middleware/permit";

const photosRouter = express.Router();

photosRouter.get('/', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const user = await User.findOne({token});


        if (req.query.user) {
            const userPhotos = await Photo.find({user: req.query.user}).populate('user', 'displayName');

            return res.send(userPhotos);
        }

        const allPhotos = await Photo.find().populate('user', 'displayName');
        return res.send(allPhotos);

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }
});

photosRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        if (!(req.body.title && req.file)) {
            return res.status(400).send('Title and image are required fields.');
        }

        const photoData = new Photo({
            user: user._id,
            title: req.body.title,
            image: req.file ? req.file.filename : null,
        });


        await photoData.save();

        const answer = {
            photoData,
            message: 'You added new photo!',
        };

        return res.send(answer);
    } catch (e) {

        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }
});

photosRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const photoId = req.params.id;

        const photo = await Photo.findById(photoId);

        if (!photo) {
            return res.status(404).json({error: 'Photo not found'});
        }

        await Photo.deleteOne({_id: photo._id});
        const photos = await Photo.find();

        return res.send(photos);
    } catch (e) {
        next(e);
    }
});

export default photosRouter;