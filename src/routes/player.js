const koarouter = require('koa-router');


const router = new koarouter();

router.get("players.list", "/", async (ctx) => {
    try{
        const players = await ctx.orm.Player.findAll();
        ctx.body = players;
        ctx.status = 200;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
});





module.exports = router;