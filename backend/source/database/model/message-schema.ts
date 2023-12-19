import mongoose from 'mongoose';
import {customAlphabet} from 'nanoid';
import {Snowflake} from 'snowflake'; // eslint-disable-line import/no-extraneous-dependencies
import messageSchema from '../schema/message-schema.js';

const messageMongoModel = mongoose.model('Message', messageSchema, 'Messages');

const messageModel = {
    async createMessage(newMessage: {
        channelId: string;
        userId: string;
        mention: string[];
        attachment: string[];
        reply?: string;
        content: string;
        format: string[];
    }) {
        try {
            const result = await messageMongoModel.create({
                id: Snowflake.generate(),
                channelId: newMessage.channelId,
                userId: newMessage.userId,
                mention: newMessage.mention,
                attachment: newMessage.attachment,
                reply: newMessage.reply,
                content: newMessage.content,
                format: newMessage.format,
                createdAt: new Date(),
            });

            return {
                result: String(result.id),
            };
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
};

export default messageModel;
