'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(220),
      allowNull: false,
      unique: true
    },
    summary: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('draft', 'published'),
      allowNull: false,
      defaultValue: 'draft'
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'published_at'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'category_id'
    },
    authorName: {
      type: DataTypes.STRING(120),
      allowNull: true,
      field: 'author_name'
    }
  }, {
    tableName: 'Article',
    underscored: false
  });

  Article.associate = function(models) {
    Article.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
  };

  return Article;
};


