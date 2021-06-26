const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id'
            },
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false
          },
          body: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          date: {
            type: DataTypes.DATE,
            allowNull: false,
          }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
      }
);

module.exports = Blog;