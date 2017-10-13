import {User} from "../model/User";
import {AccessToken} from "../model/AccessToken";
import * as _ from "lodash";

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

export async function getCurrentUser(access_token) {
    try {
        let accessToken = AccessToken.findOne({access_token: access_token});
        accessToken = await accessToken.exec();
        if(accessToken != undefined) {
            let currentUser = User.findOne({_id: accessToken.userId}, {password: false, roles: false});
            currentUser = await currentUser.exec();
            if(currentUser != undefined) {
                return _.omit(currentUser, ["password"]);
            } else {
                throw new Error ("User not found");
            }
        } else {
          throw new Error ('Unauthorized');
        }
    } catch(e) {
        throw e;
    }
}