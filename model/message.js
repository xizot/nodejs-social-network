const Sequelize = require("sequelize");
const { v4 } = require("uuid");
const db = require("./../services/db");
const Model = Sequelize.Model;

class Message extends Model {
    static async insertMessage(
        fromUserId,
        toUserId,
        content = null,
        imageUrl = null,
        videoUrl = null
    ) {
        const messageId = v4();
        return await Message.create({
            messageId,
            fromUserId,
            toUserId,
            content,
            imageUrl,
            videoUrl,
        });
    }

    static async deleteMessage({ userId, messageId }) {
        const existingSendMessage = await Message.findOne({
            where: {
                messageId,
                fromUserId: userId,
            },
        });

        if (existingSendMessage) {
            existingSendMessage.fromUserIsVisible = false;
            return await existingSendMessage.save();
        }

        const existingReceiveMessage = await Message.findOne({
            where: {
                messageId,
                toUserId: userId,
            },
        });

        if (existingReceiveMessage) {
            existingReceiveMessage.toUserIsVisible = false;
            return await existingReceiveMessage.save();
        }
        return null;
    }
}

Message.init(
    {
        messageId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        fromUserId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        toUserId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
        },
        videoUrl: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
        },
        fromUserIsVisible: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
        toUserIsVisible: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
    },
    {
        sequelize: db,
        modelName: "message",
    }
);
export default Message;
