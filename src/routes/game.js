const koarouter = require('koa-router');
const controller = require('../controllers/game_controller');


const router = new koarouter();

// Get game by player_id
router.get("games.find", "/:id", controller.getGameController);

// TODO: Check if game can become ongoing
// Post crear game
router.post("games.create", "/create", controller.createNewGame);


// POST join game
router.post("games.join", "/join", controller.joinGame);


// GET joinable games

router.get("games.joinable", "/joinable/:userid", controller.getJoinableGames);

// GET all games

router.get("games.list", "/", controller.getAllGames);

// GET ongoing games ids
router.get("games.ongoing", "/ongoing/:userid", controller.ongoingGames);

module.exports = router;