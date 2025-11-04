'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Article', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING(220),
        allowNull: false,
        unique: true
      },
      summary: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      content: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      thumbnail: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('draft', 'published'),
        allowNull: false,
        defaultValue: 'draft'
      },
      published_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Category', key: 'id' },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      },
      author_name: {
        type: Sequelize.STRING(120),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Article');
  }
};


