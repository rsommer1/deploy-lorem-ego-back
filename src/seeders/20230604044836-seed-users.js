const bcrypt = require('bcrypt');


module.exports = {
  up: async (queryInterface) => {
    
    const rolfPass = await bcrypt.hash('rolfpass', 10);
    const rumuzPass = await bcrypt.hash('rumuzpass', 10);
    return queryInterface.bulkInsert('Users', [
    {
      username: 'rolf',
      password: rolfPass,
      mail: 'rolf@uc.cl',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'rumuz',
      password: rumuzPass,
      mail: 'rumuz@uc.cl',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])},
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
}