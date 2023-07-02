const koarouter = require('koa-router');


const router = new koarouter();

router.get("users.list", "/", async (ctx) => {
    try{
        const users = await ctx.orm.User.findAll();
        ctx.body = users;
        ctx.status = 200;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
});


module.exports = router;