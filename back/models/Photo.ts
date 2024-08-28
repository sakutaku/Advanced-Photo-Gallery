import mongoose from "mongoose";
import User from "./User";
import Category from "./Category";

const PhotoSchema = new mongoose.Schema({
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
        validator: async (value: mongoose.Types.ObjectId) => await Category.findById(value),
        message: 'Category does not exist!',
    },
},
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => {
        await User.findById(value);
      },
      message: "User does not exist!",
    },
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Photo = mongoose.model("Photo", PhotoSchema);
export default Photo;
