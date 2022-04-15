const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Article extends Model {}

Article.init({
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
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
    },
    cheers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
}, {
    hooks: {
        beforeBulkCreate: (articlesData) => {
            articlesData = articlesData.map(articleData => {
                articleData.content = articleData.content.replaceAll('\n', '<br />');
                return articleData;
            });
            return articlesData;
        },
        beforeCreate: (articleData) => {
            articleData.content = articleData.content.replaceAll('\n', '<br />');
            return articleData;
        },
        beforeUpdate: (articleData) => {
            articleData.content = articleData.content.replaceAll('\n', '<br />');
            return articleData;
        },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'article',
});

module.exports = Article;