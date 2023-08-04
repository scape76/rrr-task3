'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Notes", [
      {
        id: "3128",
        category: "task",
        content: "tomatoes, bread 3/9/2021",
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Shopping list",
        isArchived: false,
      },
      {
        id: "1232",
        category: "thought",
        content: "build a house 21/01/2022",
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "idk",
        isArchived: false,
      },
      {
        id: "3122",
        category: "thought",
        content: "build a house 23/09/2022 24/10/2022",
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "idk",
        isArchived: false,
      },
      {
        id: "4123",
        category: "idea",
        content: "plant a tree",
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "3",
        isArchived: false,
      },
      {
        id: "5123",
        category: "thought",
        content: "build a house 09/23/2022 10/24/2022",
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "idk",
        isArchived: true,
      },
  
      {
        id: "66110",
        category: "thought",
        content: "build a house",
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "idk",
        isArchived: true,
      },
      {
        id: "71203",
        category: "idea",
        content: "run",
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "idk",
        isArchived: true,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
