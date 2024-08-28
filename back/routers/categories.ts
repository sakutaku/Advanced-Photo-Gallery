import express from "express";
import Category from "../models/Category";

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res) => {
    try {
        const categories = await Category.find();

        if (!categories) {
            return res.status(404).send("Not found!");
        }

        return res.send(categories);

    } catch (e) {
        return res.status(500).send(e);
    }
});

export default categoriesRouter;