'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users',
      [{
        email: 'John Doe',
        password: '123',
        username: 'fake1',

      },
      {
        email: 'John Doe12',
        password: '123',
        username: 'fake12',

      }, {
        email: 'John Doe123',
        password: '123',
        username: 'fake123',

      }
      ],
      {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
