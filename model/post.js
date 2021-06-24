const Sequelize = require("sequelize");
const { v4 } = require("uuid");
const db = require("./../services/db");
const Model = Sequelize.Model;

class Post extends Model {
    static async getPostsByUserId(userId, page = 1, limit = 10) {
        return await Post.findAll({
            where: {
                userId,
            },
            order: [["createdAt", "DESC"]],
            offset: (page - 1) * limit,
            limit,
        });
    }
    static async insertPost({
        userId,
        content = null,
        imageUrl = null,
        videoUrl = null,
    }) {
        const newPost = {
            postId: v4(),
            userId,
            content,
            imageUrl,
            videoUrl,
        };
        return await Post.create(newPost);
    }
    static async deletePost(postId, userId) {
        const existingPost = await Post.findOne({
            where: {
                postId,
                userId,
            },
        });
        if (!existingPost) return null;
        existingPost.isVisible = false;
        return await existingPost.save();
    }
}

Post.init(
    {
        postId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
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
            allowNull: true,
            defaultValue: true,
        },
    },
    {
        sequelize: db,
        modelName: "post",
    }
);

export default Post;
