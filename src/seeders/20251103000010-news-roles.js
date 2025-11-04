'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const roles = [
      { url: '/api/v1/news/category', description: 'Tạo danh mục', createdAt: now, updatedAt: now },
      { url: '/api/v1/news/category/:id', description: 'Sửa/Xóa danh mục', createdAt: now, updatedAt: now },
      { url: '/api/v1/news/article', description: 'Tạo bài viết', createdAt: now, updatedAt: now },
      { url: '/api/v1/news/article/:id', description: 'Sửa/Xóa bài viết', createdAt: now, updatedAt: now }
    ];
    // Avoid duplicates based on url
    const existing = await queryInterface.sequelize.query('SELECT url FROM Role');
    const existingUrls = new Set(existing[0].map(r => r.url));
    const toInsert = roles.filter(r => !existingUrls.has(r.url));
    if (toInsert.length) {
      await queryInterface.bulkInsert('Role', toInsert);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Role', {
      url: [
        '/api/v1/news/category',
        '/api/v1/news/category/:id',
        '/api/v1/news/article',
        '/api/v1/news/article/:id'
      ]
    });
  }
};


