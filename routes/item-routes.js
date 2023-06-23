import express from "express";
import { getItems } from "../controller/item-controllers.js";

const router = express.Router();

router
    .route('/')
    .get(getItems);

export default router;