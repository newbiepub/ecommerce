import { Schema } from "mongoose";
import db from "../../db/database";

const CategorySchema = new Schema({
    categoryName: {type: String, required: true},
    description: {type: String}
});

const Category = db.model("category", CategorySchema, "category");

export { Category };