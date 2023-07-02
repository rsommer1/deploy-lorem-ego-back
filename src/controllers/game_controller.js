const Sequelize = require('sequelize');
// GET game instance from playerid
async function getGameController(ctx) {
    try {
        const { id } = ctx.params;
        const playerId = parseInt(id);
        const player = await ctx.orm.Player.findByPk(playerId);
        const gameId = player.gameid;
        const game = await ctx.orm.Game.findByPk(gameId);
        ctx.body = game;
        ctx.status = 200;
        
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
}
/*
let piecesTypes = {"Bandera": {
  gameid: 1,
  color: 'red',
  type: 'Bandera',
  position_x: 0,
  position_y: 0,
  atk: 0,
  movement: 0,
  hidden: true,
  petrified_turns: 0,
},
"Kamikaze": {
  gameid: 1,
  color: 'red',
  type: 'Kamikaze',
  position_x: 1,
  position_y: 0,
  atk: 1,
  movement: 1,
  hidden: true,
  petrified_turns: 0,
},
"Explorador":{
  gameid: 1,
  color: 'red',
  type: 'Explorador',
  position_x: 2,
  position_y: 0,
  atk: 2,
  movement: 10,
  hidden: true,
  petrified_turns: 0,
},
"Medusa": {
  gameid: 1,
  color: 'red',
  type: 'Medusa',
  position_x: 3,
  position_y: 0,
  atk: 3,
  movement: 1,
  hidden: true,
  petrified_turns: 0,
},
"Saltador":{
  gameid: 1,
  color: 'red',
  type: 'Saltador',
  position_x: 4,
  position_y: 0,
  atk: 4,
  movement: 1,
  hidden: true,
  petrified_turns: 0,
},
"Francotirador": {
  gameid: 1,
  color: 'red',
  type: 'Francotirador',
  position_x: 5,
  position_y: 0,
  atk: 5,
  movement: 1,
  hidden: true,
  petrified_turns: 0,
},
  "Profeta": {
  gameid: 1,
  color: 'red',
  type: 'Profeta',
  position_x: 6,
  position_y: 0,
  atk: 6,
  movement: 1,
  hidden: true,
  petrified_turns: 0,
},
"Maldito": {
  gameid: 1,
  color: 'red',
  type: 'Maldito',
  position_x: 0,
  position_y: 1,
  atk: 7,
  movement: 1,
  hidden: true,
  petrified_turns: 0,
},
"Mago": {
  gameid: 1,
  color: 'red',
  type: 'Mago',
  position_x: 1,
  position_y: 1,
  atk: 8,
  movement: 1,
  hidden: true,
  petrified_turns: 0,
},
"Campeon": {
  gameid: 1,
  color: 'red',
  type: 'Campeon',
  position_x: 2,
  position_y: 1,
  atk: 9,
  movement: 1,
  hidden: true,
  petrified_turns: 0,
},
"Demonio":{
  gameid: 1,
  color: 'red',
  type: 'Demonio',
  position_x: 3,
  position_y: 1,
  atk: 10,
  movement: 1,
  hidden: true,
  petrified_turns: 0,
},
"Kamikaze": {
  gameid: 1,
  color: 'red',
  type: 'Kamikaze',
  position_x: 1,
  position_y: 0,
  atk: 1,
  movement: 1,
  hidden: true,
  petrified_turns: 0,
},
"Explorador":{
  gameid: 1,
  color: 'red',
  type: 'Explorador',
  position_x: 2,
  position_y: 0,
  atk: 2,
  movement: 10,
  hidden: true,
  petrified_turns: 0,
},
"Medusa": {
  gameid: 1,
  color: 'red',
  type: 'Medusa',
  position_x: 3,
  position_y: 0,
  atk: 3,
  movement: 1,
  hidden: true,
  petrified_turns: 0,
},
"Saltador":{
  gameid: 1,
  color: 'red',
  type: 'Saltador',
  position_x: 4,
  position_y: 0,
  atk: 4,
  movement: 1,
  hidden: true,
  petrified_turns: 0,
},
"Francotirador": {
  gameid: 1,
  color: 'red',
  type: 'Francotirador',
  position_x: 5,
  position_y: 0,
  atk: 5,
  movement: 1,
  hidden: true,
  petrified_turns: 0,
},
"Kamikaze": {
  gameid: 1,
  color: 'red',
  type: 'Kamikaze',
  position_x: 1,
  position_y: 0,
  atk: 1,
  movement: 1,
  hidden: true,
  petrified_turns: 0,
},
"Explorador":{
  gameid: 1,
  color: 'red',
  type: 'Explorador',
  position_x: 2,
  position_y: 0,
  atk: 2,
  movement: 10,
  hidden: true,
  petrified_turns: 0,
},
"Medusa": {
  gameid: 1,
  color: 'red',
  type: 'Medusa',
  position_x: 3,
  position_y: 0,
  atk: 3,
  movement: 1,
  hidden: true,
  petrified_turns: 0,
},
"Saltador":{
  gameid: 1,
  color: 'red',
  type: 'Saltador',
  position_x: 4,
  position_y: 0,
  atk: 4,
  movement: 1,
  hidden: true,
  petrified_turns: 0,
},
"Francotirador": {
  gameid: 1,
  color: 'red',
  type: 'Francotirador',
  position_x: 5,
  position_y: 0,
  atk: 5,
  movement: 1,
  hidden: true,
  petrified_turns: 0,
}};
*/

function popRandomItem(array) {
  // Generate a random index within the array length
  const randomIndex = Math.floor(Math.random() * array.length);
  
  // Remove the item at the random index and return it
  return array.splice(randomIndex, 1)[0];
}

function shuffleList(list) {
  for (let i = list.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [list[i], list[randomIndex]] = [list[randomIndex], list[i]];
  }
  return list;
}

async function createNewGame(ctx) {

  try {
    let piecesTypes = [{
      gameid: 1,
      color: 'red',
      type: 'Bandera',
      position_x: 0,
      position_y: 0,
      atk: 0,
      movement: 0,
      hidden: true,
      petrified_turns: 0,
    },
    {
      gameid: 1,
      color: 'red',
      type: 'Kamikaze',
      position_x: 1,
      position_y: 0,
      atk: 1,
      movement: 1,
      hidden: true,
      petrified_turns: 0,
    },
    {
      gameid: 1,
      color: 'red',
      type: 'Explorador',
      position_x: 2,
      position_y: 0,
      atk: 2,
      movement: 10,
      hidden: true,
      petrified_turns: 0,
    },
    {
      gameid: 1,
      color: 'red',
      type: 'Medusa',
      position_x: 3,
      position_y: 0,
      atk: 3,
      movement: 1,
      hidden: true,
      petrified_turns: 0,
    },
    {
      gameid: 1,
      color: 'red',
      type: 'Saltador',
      position_x: 4,
      position_y: 0,
      atk: 4,
      movement: 1,
      hidden: true,
      petrified_turns: 0,
    },
    {
      gameid: 1,
      color: 'red',
      type: 'Francotirador',
      position_x: 5,
      position_y: 0,
      atk: 5,
      movement: 1,
      hidden: true,
      petrified_turns: 0,
    },
      {
      gameid: 1,
      color: 'red',
      type: 'Profeta',
      position_x: 6,
      position_y: 0,
      atk: 6,
      movement: 1,
      hidden: true,
      petrified_turns: 0,
    },
    {
      gameid: 1,
      color: 'red',
      type: 'Maldito',
      position_x: 0,
      position_y: 1,
      atk: 7,
      movement: 1,
      hidden: true,
      petrified_turns: 0,
    },
    {
      gameid: 1,
      color: 'red',
      type: 'Mago',
      position_x: 1,
      position_y: 1,
      atk: 8,
      movement: 1,
      hidden: true,
      petrified_turns: 0,
    },
    {
      gameid: 1,
      color: 'red',
      type: 'Campeon',
      position_x: 2,
      position_y: 1,
      atk: 9,
      movement: 1,
      hidden: true,
      petrified_turns: 0,
    },
    {
      gameid: 1,
      color: 'red',
      type: 'Demonio',
      position_x: 3,
      position_y: 1,
      atk: 10,
      movement: 1,
      hidden: true,
      petrified_turns: 0,
    },
    {
      gameid: 1,
      color: 'red',
      type: 'Kamikaze',
      position_x: 1,
      position_y: 0,
      atk: 1,
      movement: 1,
      hidden: true,
      petrified_turns: 0,
    },
    {
      gameid: 1,
      color: 'red',
      type: 'Explorador',
      position_x: 2,
      position_y: 0,
      atk: 2,
      movement: 10,
      hidden: true,
      petrified_turns: 0,
    },
    {
      gameid: 1,
      color: 'red',
      type: 'Medusa',
      position_x: 3,
      position_y: 0,
      atk: 3,
      movement: 1,
      hidden: true,
      petrified_turns: 0,
    },
    {
      gameid: 1,
      color: 'red',
      type: 'Saltador',
      position_x: 4,
      position_y: 0,
      atk: 4,
      movement: 1,
      hidden: true,
      petrified_turns: 0,
    },
    {
      gameid: 1,
      color: 'red',
      type: 'Francotirador',
      position_x: 5,
      position_y: 0,
      atk: 5,
      movement: 1,
      hidden: true,
      petrified_turns: 0,
    },
    {
      gameid: 1,
      color: 'red',
      type: 'Kamikaze',
      position_x: 1,
      position_y: 0,
      atk: 1,
      movement: 1,
      hidden: true,
      petrified_turns: 0,
    },
    {
      gameid: 1,
      color: 'red',
      type: 'Explorador',
      position_x: 2,
      position_y: 0,
      atk: 2,
      movement: 10,
      hidden: true,
      petrified_turns: 0,
    },
    {
      gameid: 1,
      color: 'red',
      type: 'Medusa',
      position_x: 3,
      position_y: 0,
      atk: 3,
      movement: 1,
      hidden: true,
      petrified_turns: 0,
    },
    {
      gameid: 1,
      color: 'red',
      type: 'Saltador',
      position_x: 4,
      position_y: 0,
      atk: 4,
      movement: 1,
      hidden: true,
      petrified_turns: 0,
    },
    {
      gameid: 1,
      color: 'red',
      type: 'Francotirador',
      position_x: 5,
      position_y: 0,
      atk: 5,
      movement: 1,
      hidden: true,
      petrified_turns: 0,
    }];

    const { userid } = ctx.request.body;

    let redFlagPositions = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0]];
  
    let redRemainingPositions = [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2]];
  
    let blueFlagPositions = [[0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9]];
  
    let blueRemainingPositions = [[0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]];

    let redPositions = [popRandomItem(redFlagPositions)];
    let bluePositions = [popRandomItem(blueFlagPositions)];
    redRemainingPositions = redFlagPositions.concat(redRemainingPositions);
    blueRemainingPositions = blueFlagPositions.concat(blueRemainingPositions);
    redRemainingPositions = shuffleList(redRemainingPositions);
    blueRemainingPositions = shuffleList(blueRemainingPositions);
    redPositions = redPositions.concat(redRemainingPositions);
    bluePositions = bluePositions.concat(blueRemainingPositions);
    let redPieces = [];
    let bluePieces = [];
    let position;

    const newGame = await ctx.orm.Game.create({
      turn: 1,
      winner: "",
      stage: "setup"});
    const gameId = newGame.id;

    for (let piece of piecesTypes) {
      position = redPositions.shift();
      piece.position_x = position[0];
      piece.position_y = position[1];
      piece.color = "red";
      piece.gameid = gameId;
      redPieces.push(piece);
    }
    await ctx.orm.Piece.bulkCreate(redPieces);

    for (let piece of piecesTypes) {
      position = bluePositions.shift();
      piece.position_x = position[0];
      piece.position_y = position[1];
      piece.color = "blue";
      piece.gameid = gameId;
      bluePieces.push(piece);
    }

    await ctx.orm.Piece.bulkCreate(bluePieces);
    await ctx.orm.Player.create({gameid: gameId, color: "blue", userid: userid});
    ctx.body = {"result": true, "gameid": gameId, "msg": "Partida creada, espera a que alguien se una"};
    ctx.status = 200;


  } catch (error) {
    ctx.body = error
    ctx.status = 500;
  }  

};

async function joinGame(ctx) {
    try {
        const { gameid, userid } = ctx.request.body;
        const game = await ctx.orm.Game.findByPk(gameid);
        if (game.stage != "setup") {
          ctx.body = {"result": false, "msg": "No te puedes unir a esta partida"};
          ctx.status = 200;
          return;
        }
        const player = await ctx.orm.Player.findOne({where: {gameid: gameid}});
        if (player.userid == userid) {
          ctx.body = {"result": false, "msg": "Ya estás en esta partida"};
          ctx.status = 200;
          return;
        }
        await ctx.orm.Player.create({gameid: gameid, color: "blue", userid: userid});
        game.stage = "ongoing";
        await game.save();
        ctx.body = {"result": true, "msg": "Te has unido a la partida"};
        ctx.status = 200;
  } catch (error) {
        ctx.body = error
        ctx.status = 500;
  }
};


// get all joinable games for an user

async function getJoinableGames(ctx) {
  try {
    let { userid } = ctx.params;
    userid = parseInt(userid);
    const games = await ctx.orm.Game.findAll({where: {stage: 'setup'}});
    if (games.length == 0) {
      ctx.body = {"result": false, "msg": "No hay partidas disponibles"};
      ctx.status = 200;
      return;
    }
    let joinableGamesIds = [];
    for (let game of games) {
      joinableGamesIds.push(game.id);
    };
    const players = await ctx.orm.Player.findAll({where: {gameid: {[Sequelize.Op.in]: joinableGamesIds}}});
    let joinableGames = [];
    for (let player of players) {
      if (player.userid === userid) {
        continue;
      }
      joinableGames.push(player.gameid);
    };
    ctx.body = {"result": true, "msg": "Partidas disponibles", "games": joinableGames};
    ctx.status = 200;
    
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
};

// Necesary functions for GET all games

async function getAllGames(ctx) {
  try {
    const games = await ctx.orm.Game.findAll();
    ctx.body = games;
    ctx.status = 200;
    
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
};

async function ongoingGames (ctx) {
  try {
    let {userid} = ctx.params;
    userid = parseInt(userid);
    const players = await ctx.orm.Player.findAll({where: {userid: userid}});
    if (players.length == 0) {
      ctx.body = {"result": false, "msg": "No estás en ninguna partida"};
      ctx.status = 200;
      return;
    }
    let gamesIds = [];
    for (let player of players) {
      gamesIds.push(player.gameid);
    };
    const games = await ctx.orm.Game.findAll({where: {id: {[Sequelize.Op.in]: gamesIds}, stage: "ongoing"}});
    if (games.length == 0) {
      ctx.body = {"result": false, "msg": "No hay partidas en curso"};
      ctx.status = 200;
      return;
    };
    let ongoingGamesIds = [];
    for (let game of games) {
      ongoingGamesIds.push(game.id);
    };
    const finalPlayers = await ctx.orm.Player.findAll({where: {gameid: {[Sequelize.Op.in]: ongoingGamesIds}, userid: userid}});
    let finalGamesIds = [];
    for (let player of finalPlayers) {
      finalGamesIds.push([player.gameid, player.id, player.color]);
    };
    ctx.body = {"result": true, "msg": "Partidas en curso", "games": finalGamesIds};
    ctx.status = 200;

  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
};

// Necesary functions for POST create new game

module.exports = {getGameController, createNewGame, joinGame, getJoinableGames, getAllGames, ongoingGames};