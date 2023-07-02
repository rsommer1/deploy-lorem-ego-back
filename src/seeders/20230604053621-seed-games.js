module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Games', [
    {
      turn: 1,
      winner: '',
      stage: 'ongoing',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Games', null, {}),
}