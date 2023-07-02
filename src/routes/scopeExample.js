const Router = require('koa-router');
const authUtils = require('../lib/auth/jwt');

const router = new Router();

router.get("/protecteduser", authUtils.isUser, async (ctx) => {
    ctx.body = {"msg": "You are a user", user: ctx.state.user};
    ctx.status = 200;
})


router.get("/protectedadmin", authUtils.isAdmin, async (ctx) => {
    ctx.body = {"msg": "You are a user", user: ctx.state.user};
    ctx.status = 200;
})

router.get("/protectedid", authUtils.getUserId);

module.exports = router;