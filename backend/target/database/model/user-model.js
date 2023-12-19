import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import typia from 'typia';
import userSchema from '../schema/user-schema.js';
const userMongoModel = mongoose.model('User', userSchema, 'Users');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const uidGen = customAlphabet(alphabet, 12);
const defaultUserSetting = {
    darkMode: true,
};
const userModel = {
    async createUser(email, username, password) {
        try {
            const settings = defaultUserSetting;
            const result = await userMongoModel.create({
                id: uidGen(),
                username,
                password,
                email,
                settings: (input => {
                    return `{"darkMode":${input.darkMode}}`;
                })(settings),
            });
            console.log('Insert new user with id ' + String(result.id));
            return {
                result: String(result.id),
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
    async getUserByEmail(userEmail, dataOnly) {
        try {
            const query = userMongoModel.findOne({
                email: userEmail,
            }, dataOnly ? '-_id -__v' : '-__v');
            if (true === dataOnly) {
                return {
                    result: await query.lean().exec(),
                };
            }
            return {
                result: await query.exec(),
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
    async getUser(userId, dataOnly) {
        const query = userMongoModel.findOne({
            id: userId,
        }, dataOnly ? '-_id -__v' : '-__v');
        if (true === dataOnly) {
            return query.lean().exec();
        }
        return query.exec();
    },
};
export default userModel;
