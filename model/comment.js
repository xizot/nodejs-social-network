const Sequelize = require("sequelize");
const { v4 } = require("uuid");
const db = require("./../services/db");
const Model = Sequelize.Model;

class COMMENT extends Model {
    static async getCommentByPostId(postId, page = 1, limit = 10) {
        return await COMMENT.findAll({
            where: {
                postId,
            },
            order: [["createdAt", "DESC"]],
            offset: (page - 1) * limit,
            limit,
        });
    }
    static async insertComment({
        userId,
        postId,
        content = null,
        image = null,
        video = null,
    }) {
        const newComment = {
            commentId: v4(),
            postId,
            userId,
            content,
            image,
            video,
        };
        return await Comment.create(newComment);
    }
    static async deleteComment(commentId, userId) {
        const existingComment = await Comment.findOne({
            where: {
                commentId,
                userId,
            },
        });
        if (!existingComment) return null;
        existingComment.isVisible = false;
        return await existingComment.save();
    }
}

COMMENT.init(
    {
        commentId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        postId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userId: {
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
        isVisible: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize: db,
        modelName: "comment",
    }
);

export default COMMENT;
