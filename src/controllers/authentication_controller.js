let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function signUp(ctx) {
    try {
        const saltRounds = 10;
        const authInfo = ctx.request.body;
        let user = await ctx.orm.User.findOne({ where: { mail: authInfo.email } });
        if (user) {
            ctx.body = { "result": "User already exists" };
            ctx.status = 400;
            return;
        };
        const hashedPassword = await bcrypt.hash(authInfo.password, saltRounds);
        user = await ctx.orm.User.create({
            username: authInfo.username,
            password: hashedPassword,
            mail: authInfo.email});
        ctx.body = { username: user.username, email: user.mail };
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
        return;
    }
}


async function login(ctx) {
    let user;
    const authInfo = ctx.request.body;
    try {
        user = await ctx.orm.User.findOne({ where: { mail: authInfo.email } });
        if (!user) {
            ctx.body = { "result": "User does not exist" };
            ctx.status = 400;
            return;
        };
        const validPassword = await bcrypt.compare(authInfo.password, user.password);
        if (!validPassword) {
            ctx.body = { "result": "Wrong password" };
            ctx.status = 400;
            return;
        };
        const expirationSeconds = 1 * 60 * 60 * 24;
        const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
        let token = jwt.sign(
            {scope: ["user"]},
            JWT_PRIVATE_KEY,
            {subject: user.id.toString()},
            {expiresIn: expirationSeconds});
        ctx.body = {
            "accessToken": token,
            "token_type": "Bearer",
            "expires_in": expirationSeconds};
        ctx.status = 200;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
};


module.exports = { signUp, login };