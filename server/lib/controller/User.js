import {User} from "../model/User";

export function findOneUser(fields) {
    return new Promise((resolve, reject) => {
        User.findOne({...fields}, function (err, user) {
            if(err) {
                reject(err)
            } else {
                if(user != undefined) {
                    resolve(user)
                } else {
                    reject(new Error("User not found"));
                }
            }
        })
    })
}