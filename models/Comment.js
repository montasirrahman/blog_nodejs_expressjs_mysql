const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        onDelete: 'SET NULL',
        references: {
            model: 'user',
            key: 'id',
        },
    },
    article_id: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
            model: 'article',
            key: 'id',
        },
    },
    content: {
        type: DataTypes.STRING,
    },
    cheers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
});

module.exports = Comment;