let jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function getJWTScope(token){
    const secret = process.env.JWT_SECRET;
    let payload = jwt.verify(token, secret);
    return payload.scope;
}

function getJWTSubject(token){
    const secret = process.env.JWT_SECRET;
    let payload = jwt.verify(token, secret);
    return payload.sub;
}

async function getUserId(ctx) {
    let token = ctx.request.header.authorization.split(' ')[1];
    const subject = parseInt(getJWTSubject(token));
    ctx.body = {"userid": subject};
};

async function isUser(ctx, next) {
    await next();
    let token = ctx.request.header.authorization.split(' ')[1];
    let scope = getJWTScope(token);
    ctx.assert(scope.includes("user"), 403, "You are not a user");
}

async function isAdmin(ctx, next) {
    await next();
    let token = ctx.request.header.authorization.split(' ')[1];
    let scope = getJWTScope(token);
    ctx.assert(scope.includes("admin"), 403, "You are not an admin");
}

module.exports = {isUser, isAdmin, getUserId};