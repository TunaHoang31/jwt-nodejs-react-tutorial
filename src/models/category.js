'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(180),
      allowNull: false,
      unique: true
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'parent_id'
    }
  }, {
    tableName: 'Category',
    underscored: false
  });

  Category.associate = function(models) {
    Category.hasMany(models.Article, { foreignKey: 'categoryId', as: 'articles' });
    Category.hasMany(models.Category, { foreignKey: 'parentId', as: 'children' });
    Category.belongsTo(models.Category, { foreignKey: 'parentId', as: 'parent' });
  };

  return Category;
};


