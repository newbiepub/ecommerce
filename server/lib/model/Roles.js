import { Schema } from "mongoose";
import db from "../../db/database";

const RoleSchema = new Schema({
    roleName: {type: String, required: true},
    description: {type: String}
});

const Roles = db.model("roles", RoleSchema, "roles");

export {Roles};