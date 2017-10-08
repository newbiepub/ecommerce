import { Schema } from "mongoose";
import db from "../../db/database";
import CryptoJS from "crypto-js";

const ttl = () => {
    let today = new Date();
    let nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
    return nextWeek.getTime();
};

const randomString = () => {
   return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
};

const AccessTokenSchema = new Schema({
    access_token: {type: String, default: CryptoJS.HmacSHA1(randomString(), "production")},
    refresh_token: {type: String, default: CryptoJS.HmacSHA1(randomString(), "production")},
    ttl: {type: Number, default: ttl()},
    createdAt: {type: String, default: new Date()},
    userId: {type: String, required: true}
});

const AccessToken = db.model("access_token", AccessTokenSchema, "access_token");

export {AccessToken};