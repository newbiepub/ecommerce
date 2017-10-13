import app from './router';
import db from './db/database';
import passwordHash from "password-hash";
import {User} from "./lib/model/User";
import {Roles} from "./lib/model/Roles";

const boot = async (app) => {
    try {
        let roleCount = Roles.count({}),
            roleCountPromise = roleCount.exec();
        roleCount = await roleCountPromise;
        if(!roleCount) {
            let insertRole = new Roles({
                roleName: "admin"
            });
            let role = await insertRole.save();
            let userCount = User.count({}),
                userCountPromise = userCount.exec();
            userCount = await userCountPromise;
            if(!userCount) {
                let insertUser = new User({
                    emails: "lam@example.com",
                    username: "Lam Nguyen",
                    password: passwordHash.generate("123456"),
                    profile: {name: "Lam Nguyen"},
                    roles: [role._id.toString()]
                });
                let insertPromise = insertUser.save(),
                    result = await insertPromise;
            }
        }
    } catch (e) {
        console.log(e);
    }
};

boot(app);

app.listen((process.env.PORT || 3000), () => {
    console.log("Server Started at port " + (process.env.PORT || 3000))
});