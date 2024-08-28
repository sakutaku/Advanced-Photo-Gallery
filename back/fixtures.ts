import mongoose from "mongoose";
import config from "./config";
import crypto from "crypto";
import User from "./models/User";
import Photo from "./models/Photo";
import Category from "./models/Category";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("users");
    await db.dropCollection("photos");
    await db.dropCollection("categories");
  } catch (e) {
    console.log("Collection were not present, skipping drop...");
  }

  const [tony, jason, kim] = await User.create(
    {
      username: "Tony",
      password: "0000",
      role: "user",
      displayName: "Tony",
      avatar: "fixtures/avatar1.jpeg",
      token: crypto.randomUUID(),
    },
    {
      displayName: "Jason",
      username: "Jas",
      avatar: "fixtures/avatar2.jpeg",
      password: "0000",
      role: "admin",
      token: crypto.randomUUID(),
    },
    {
      displayName: "Ki",
      username: "Kimmy",
      avatar: "fixtures/avatar3.png",
      password: "0000",
      role: "admin",
      token: crypto.randomUUID(),
    },
  );

  const [tourism, nature, animals, flowers] =
  await Category.create(
    {
      title: 'Tourism'
    },
    {
      title: 'Nature'
    },
    {
      title: 'Animals'
    },
    {
      title: 'Flowers'
    }    
  );

  await Photo.create(
    {
      user: tony._id,
      title: "London",
      image: "fixtures/london.jpeg",
      category: tourism._id
    },
    {
      user: tony._id,
      title: "Japan",
      image: "fixtures/japan.jpeg",
      category: tourism._id
    },
    {
      user: tony._id,
      title: "Moscow",
      image: "fixtures/moscow.jpeg",
      category: tourism._id
    },
    {
      user: tony._id,
      title: "New York",
      image: "fixtures/ny.jpeg",
      category: tourism._id
    },
    {
      user: tony._id,
      title: "Paris",
      image: "fixtures/paris.jpeg",
      category: tourism._id
    },
    {
      user: jason._id,
      title: "Rome",
      image: "fixtures/rome.jpeg",
      category: tourism._id
    },
    {
      user: jason._id,
      title: "Amalfi",
      image: "fixtures/amalfi.jpeg",
      category: tourism._id
    },
    {
      user: jason._id,
      title: "Berlin",
      image: "fixtures/berlin.jpeg",
      category: tourism._id
    },
    {
      user: jason._id,
      title: "Chicago",
      image: "fixtures/chicago.jpg",
      category: tourism._id
    },
    {
      user: jason._id,
      title: "Sydney",
      image: "fixtures/sydney.jpeg",
      category: tourism._id
    },
    {
      user: kim._id,
      title: "Barcelona",
      image: "fixtures/barcelona.jpeg",
      category: tourism._id
    },
    {
      user: kim._id,
      title: "Saint Petersburg",
      image: "fixtures/peterburg.jpeg",
      category: tourism._id
    },
    {
      user: kim._id,
      title: "Miami",
      image: "fixtures/miami.jpeg",
      category: tourism._id
    },
    {
      user: kim._id,
      title: "Dubai",
      image: "fixtures/dubai.jpeg",
      category: tourism._id
    },
    {
      user: kim._id,
      title: "Istanbul",
      image: "fixtures/istanbul.jpeg",
      category: tourism._id
    },
    {
      user: jason._id,
      title: "Austria Nature",
      image: "fixtures/nature_austria.jpg",
      category: nature._id
    },
    {
      user: jason._id,
      title: "Amazon River",
      image: "fixtures/nature_amazon.jpg",
      category: nature._id
    },
    {
      user: kim._id,
      title: "Everest Mountain",
      image: "fixtures/everest.jpg",
      category: nature._id
    },
    {
      user: kim._id,
      title: "Lion",
      image: "fixtures/lion.webp",
      category: animals._id
    },
    {
      user: jason._id,
      title: "Lotus",
      image: "fixtures/lotus.jpg",
      category: flowers._id
    },
    {
      user: jason._id,
      title: "Hortnesia",
      image: "fixtures/hortenzia.jpg",
      category: flowers._id
    }
  );

  await db.close();
};

run().catch(console.error);
