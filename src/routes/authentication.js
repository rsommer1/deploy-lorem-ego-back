const Router = require('koa-router');
let jwt = require('jsonwebtoken');
const controller = require("../controllers/authentication_controller");

const router = new Router();

// POST signup user
router.post("authentication.signup", "/signup", controller.signUp);

// POST login user
router.post("authentication.login", "/login", controller.login);


module.exports = router;