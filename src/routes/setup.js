

const koarouter = require('koa-router');

const router = new koarouter();
const controller = require('../controllers/setup_controller');

// GET all pieces from a game
router.post("setup.playerdone", "/", controller.checkIfPlayerSetupIsCorrect);



module.exports = router;