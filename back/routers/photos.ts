import express from "express";
import mongoose from "mongoose";
import Photo from "../models/Photo";
import auth, { RequestWithUser } from "../middleware/auth";
import { imagesUpload } from "../multer";
import permit from "../middleware/permit";

const photosRouter = express.Router();

photosRouter.get("/", async (req, res, next) => {
  try {
    if (req.query.user) {
      const userPhotos = await Photo.find({ user: req.query.user }).populate(
        "user",
        "displayName",
      );

      return res.send(userPhotos);
    } else if (req.query.category) {
      const photosCategory = await Photo.find({ category: req.query.category});

      return res.send(photosCategory);
    }

    const allPhotos = await Photo.find().populate("user", "displayName");
    return res.send(allPhotos);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});

photosRouter.get("/filter", async (req, res, next) => {
  try {
    const { title } = req.query;

    const filter: { title?: { $regex: string, $options: string } } = {};

    if (typeof title === 'string' && title.trim().length > 0) {
      filter.title = { $regex: title, $options: "i" };
    }

    const filteredPhotos = await Photo.find(filter).populate("user", "displayName");

    return res.send(filteredPhotos);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e.message);
    }

    next(e);
  }
});

photosRouter.post(
  "/",
  auth,
  imagesUpload.single("image"),
  async (req, res, next) => {
    try {
      const user = (req as RequestWithUser).user;

      if (!(req.body.title && req.file)) {
        return res.status(400).send("Title and image are required fields.");
      }

      const photoData = new Photo({
        user: user._id,
        title: req.body.title,
        category: req.body.category,
        image: req.file ? req.file.filename : null,
      });

      await photoData.save();

      const answer = {
        photoData,
        message: "You added new photo!",
      };

      return res.send(answer);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      next(e);
    }
  },
);

photosRouter.delete("/:id", auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const photoId = req.params.id;

    const photo = await Photo.findById(photoId);

    if (!photo) {
      return res.status(404).json({ error: "Photo not found" });
    }

    if (user.role !== 'admin' && photo.user.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'You are not authorized to delete this photo' });
    }

    await Photo.deleteOne({ _id: photo._id });
    const photos = await Photo.find().populate("user", "displayName");

    return res.send(photos);
  } catch (e) {
    next(e);
  }
});

export default photosRouter;
