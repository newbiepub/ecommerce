import { Schema } from "mongoose";
import db from "../../db/database";

const UserSchema = new Schema({
    emails: {
        type: String,
        required: true
    },
    username: {type: String},
    password: {type: String, required: true},
    profile: {type: Object},
    roles: {type: Array, required: true},
    createdAt: {type: String, default: new Date().toISOString()}
});

const User = db.model("users", UserSchema, "users");

export {User};