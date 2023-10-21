import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from "./routers/users";
import photosRouter from "./routers/photos";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/photos', photosRouter);


const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch((e) => console.error(e));