const koarouter = require('koa-router');
const pieces = require('./routes/pieces');
const user = require('./routes/users');
const game = require('./routes/game');
const player = require('./routes/player');
const setup = require('./routes/setup');
const authentication = require('./routes/authentication');
const router = new koarouter();
const jwtMiddleware = require('koa-jwt');
const dotenv = require('dotenv');
const auth = require("./lib/auth/jwt")

//example
const scopeProtectedRoutes = require("./routes/scopeExample")

dotenv.config();

router.use('/pieces', pieces.routes());
router.use('/game', game.routes());
router.use('/player', player.routes());
router.use('/setup', setup.routes());
router.use('/authentication', authentication.routes());


// desde esta linea todo requerira un jwt
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET}));
router.use('/user', user.routes());

router.use("/scope-example", scopeProtectedRoutes.routes())

module.exports = router;