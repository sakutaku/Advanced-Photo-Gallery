import path from "path";

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, "public"),
  db: "mongodb://localhost/exam12",
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
};

export default config;
