module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Players', [
    {
      userid: 1,
      gameid: 1,
      color: 'blue',
      setup: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userid: 2,
      gameid: 1,
      color: 'red',
      setup: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Players', null, {}),
}