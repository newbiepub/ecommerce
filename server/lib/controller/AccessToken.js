import { Types } from "mongoose"
import {AccessToken} from "../model/AccessToken";
import {User} from "../model/User";
import {Roles} from "../model/Roles";
import * as _ from "lodash";

export function createAuthToken (userId) {
    return new Promise((resolve, reject) => {
        let token = new AccessToken({userId: userId});
        token.save((err) => {
            if(err) {
                console.log(err);
                reject(err);
            } else {
                resolve(token);
            }
        })
    })
}

async function userToken(access_token) {
    return new Promise((resolve, reject) => {
        AccessToken.findOne({access_token: access_token}, (err, accessToken) => {
            if(err) {
                reject(err);
            } else {
                if(accessToken != undefined) {
                    if(accessToken.ttl > new Date().getTime()) {
                        User.findOne({_id: accessToken.userId}, (err, user) => {
                            if(err) {
                                reject(err);
                            } else {
                                if(user != undefined) {
                                    resolve({accessToken, user});
                                } else {
                                    reject(new Error("User not found"));
                                }
                            }
                        })
                    } else {
                        AccessToken.remove({_id: accessToken._id}, (err) => {
                            if(err) {
                                reject(err);
                            }
                            reject(new Error("Access Token Expired"));
                        })
                    }
                } else {
                    reject(new Error("Access Token is invalid"));
                }
            }
        })
    })
}

export async function checkAuthUser(access_token) {
    try {
        let { accessToken, user } = await userToken(accessToken);
        return accessToken;
    } catch(e) {
        throw e;
    }
}

export async function checkAuthAdmin(access_token) {
    try {
        let { accessToken, user } = await userToken(access_token);
        let roles = Roles.findOne({roleName: "admin"});
        roles = await roles.exec();
        if(roles != undefined) {
            if(_.includes(user.roles, roles._id.toString(), 0)) {
                return accessToken;
            } else {
                throw new Error("Unauthorized");
            }
        } else {
            throw new Error("Unauthorized");
        }
    } catch (e) {
        throw e;
    }
}