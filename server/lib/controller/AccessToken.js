
import {AccessToken} from "../model/AccessToken";

export function createAuthToken (userId) {
    return new Promise((resolve, reject) => {
        let token = new AccessToken({userId: userId});
        token.save((err) => {
            if(err) {
                reject(err);
            } else {
                console.log(token)
                resolve(token);
            }
        })
    })
}