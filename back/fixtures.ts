import mongoose from "mongoose";
import config from "./config";
import crypto from "crypto";
import User from "./models/User";
import Photo from "./models/Photo";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("users");
    await db.dropCollection("photos");
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

  await Photo.create(
    {
      user: tony._id,
      title: "London",
      image: "fixtures/london.jpeg",
    },
    {
      user: tony._id,
      title: "Japan",
      image: "fixtures/japan.jpeg",
    },
    {
      user: tony._id,
      title: "Moscow",
      image: "fixtures/moscow.jpeg",
    },
    {
      user: tony._id,
      title: "New York",
      image: "fixtures/ny.jpeg",
    },
    {
      user: tony._id,
      title: "Paris",
      image: "fixtures/paris.jpeg",
    },
    {
      user: jason._id,
      title: "Rome",
      image: "fixtures/rome.jpeg",
    },
    {
      user: jason._id,
      title: "Amalfi",
      image: "fixtures/amalfi.jpeg",
    },
    {
      user: jason._id,
      title: "Berlin",
      image: "fixtures/berlin.jpeg",
    },
    {
      user: jason._id,
      title: "Chicago",
      image: "fixtures/chicago.jpg",
    },
    {
      user: jason._id,
      title: "Sydney",
      image: "fixtures/sydney.jpeg",
    },
    {
      user: kim._id,
      title: "Barcelona",
      image: "fixtures/barcelona.jpeg",
    },
    {
      user: kim._id,
      title: "Saint Petersburg",
      image: "fixtures/peterburg.jpeg",
    },
    {
      user: kim._id,
      title: "Miami",
      image: "fixtures/miami.jpeg",
    },
    {
      user: kim._id,
      title: "Dubai",
      image: "fixtures/dubai.jpeg",
    },
    {
      user: kim._id,
      title: "Istanbul",
      image: "fixtures/istanbul.jpeg",
    },
  );

  await db.close();
};

run().catch(console.error);
