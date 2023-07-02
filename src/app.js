const Koa = require('koa');
const KoaLogger = require('koa-logger');
const { koaBody } = require('koa-body');
const router = require('./routes');
const orm = require('./models');
const cors = require('@koa/cors');
const app = new Koa();

app.context.orm = orm;

//Middlewares 
app.use(cors());

app.use(KoaLogger());
app.use(koaBody());

// koa router 
app.use(router.routes());

// app.use(async (ctx, next) => {
//     ctx.body = 'Hello World';
// });


// app.listen(3000, () => {
//     console.log('Server running at port 3000');
// });

module.exports = app;