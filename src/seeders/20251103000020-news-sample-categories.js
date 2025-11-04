'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    // create parent category "Tin tức" if not exists
    const [parents] = await queryInterface.sequelize.query("SELECT id FROM Category WHERE slug='tin-tuc' LIMIT 1");
    let parentId = parents && parents[0] ? parents[0].id : null;
    if (!parentId) {
      const res = await queryInterface.bulkInsert('Category', [{ name: 'Tin tức', slug: 'tin-tuc', parent_id: null, createdAt: now, updatedAt: now }], { returning: true });
      // sequelize-cli with mysql may not return ids, re-query
      const [p2] = await queryInterface.sequelize.query("SELECT id FROM Category WHERE slug='tin-tuc' LIMIT 1");
      parentId = p2 && p2[0] ? p2[0].id : null;
    }
    if (!parentId) return;

    const children = [
      { name: 'Giáo dục', slug: 'giao-duc' },
      { name: 'Pháp luật', slug: 'phap-luat' },
      { name: 'Xã hội', slug: 'xa-hoi' },
      { name: 'Môi trường', slug: 'moi-truong' }
    ];
    const [existing] = await queryInterface.sequelize.query("SELECT slug FROM Category WHERE parent_id = " + parentId);
    const exists = new Set((existing || []).map(r => r.slug));
    const toInsert = children.filter(c => !exists.has(c.slug)).map(c => ({ ...c, parent_id: parentId, createdAt: now, updatedAt: now }));
    if (toInsert.length) await queryInterface.bulkInsert('Category', toInsert);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Category', { slug: ['giao-duc', 'phap-luat', 'xa-hoi', 'moi-truong'] });
    await queryInterface.bulkDelete('Category', { slug: 'tin-tuc' });
  }
};


