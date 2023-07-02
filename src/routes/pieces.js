const koarouter = require('koa-router');

const router = new koarouter();
const controller = require('../controllers/pieces_controller');

// GET all pieces from a game
router.get("pieces.list", "/:gameid", controller.getPiecesFromGameid);

// GET all posible piece movemenets
router.get("pieces.movements", "/movements/:playerid/:x/:y", controller.getPieceMovements); 



// POST piece movement
router.post("pieces.move", "/move", controller.postPieceMovement);

// router.post("pieces.move", "/move", async (ctx) => {
//     try {
//         const play = ctx.request.body;
//         let piece = await ctx.orm.Piece.findByPk(play.pieceid);
//         piece.position_x = play.x;
//         piece.position_y = play.y;
//         await piece.save();
//         ctx.body = piece;
//         ctx.status = 200;
//     } catch (error) {
//         ctx.body = error;
//         ctx.status = 400;
//     }
// });


//TODO: Setup all pieces placed on the board





module.exports = router;