
  

async function countCorrectNumberOfPieces(piecesList, color) {
    const piecesCorrect = {"Bandera": 1, "Kamikaze": 3, "Explorador": 3,
                    "Medusa": 3, "Saltador": 3, "Francotirador": 3,
                    "Profeta": 1, "Maldito": 1, "Mago": 1, "Campeon": 1,
                    "Demonio": 1};
    let piecesPlayer = {"Bandera": 0, "Kamikaze": 0, "Explorador": 0,
                    "Medusa": 0, "Saltador": 0, "Francotirador": 0,
                    "Profeta": 0, "Maldito": 0, "Mago": 0, "Campeon": 0,
                    "Demonio": 0};
    for (let piece of piecesList) {
        if (piece.color === color) {
            piecesPlayer[piece.type] += 1;
        }
    };
    for (let piece in piecesPlayer) {
        if (piecesPlayer[piece] !== piecesCorrect[piece]) {
            return false;
        }
    }
    return true;

};

async function checkIfPiecesAreInTheCorrectPlayerArea(piecesList, color) {
    const maxYRed = 2;
    const minYBlue = 7;
    for (let piece of piecesList) {
        if (piece.color === color) {
            if (color === 'red') {
                if (piece.position_y > maxYRed) {
                    return false;
                }
            } else {
                if (piece.position_y < minYBlue) {
                    return false;
                }
            }
        }
    }
    return true;
};

async function checkIfPlayerSetupIsCorrect(ctx) {
    const { playerid } = ctx.request.body;
    const player = await ctx.orm.Player.findByPk(playerid);
    if (player.setup) {
        ctx.body = {"result": "Player already setup"};
        ctx.status = 400;
        return;
    };
    const playerPieces = await ctx.orm.Piece.findAll({where: {gameid: player.gameid}});
    const correctPieces = await countCorrectNumberOfPieces(playerPieces, player.color);
    if (!correctPieces) {
        ctx.body = {"result": "Incorrect number of pieces"};
        ctx.status = 400;
        return;
    }
    const correctArea = await checkIfPiecesAreInTheCorrectPlayerArea(playerPieces, player.color);
    if (!correctArea) {
        ctx.body = {"result": "Incorrect area"};
        ctx.status = 400;
        return;
    }
    player.setup = true;
    await player.save();
    ctx.body = {"result": "Player setup correctly"};
    ctx.status = 200;
    return;
};
















module.exports = {checkIfPlayerSetupIsCorrect};