
async function getPiecesFromGameid(ctx) {
    try{
        const { gameid } = ctx.params;
        const pieces = await ctx.orm.Piece.findAll({
            where: {
                gameid: parseInt(gameid)
            }
        });
        const game = await ctx.orm.Game.findByPk(gameid);
        ctx.body = {"result":pieces, "game": game};
        ctx.status = 200;
    } catch (error) {
        ctx.body = {"error": error};
        ctx.status = 400;
    }
};



async function validateIfItsPlayersTurn(playerColor, gameTurn) {
    const gameColor = gameTurn % 2 === 0 ? 'red' : 'blue';
    if (playerColor == gameColor) {
        return true;
    }
    return false;
};

function rangeOfMovementInDirection(direction, movement, position_x, position_y){
    let y = position_y;
    let x = position_x;
    switch (direction) {
        case "up":
            y = position_y - movement;
            if (y < 0) {
                return 0;
            }
            break;
        case "down":
            y = position_y + movement;
            if (y > 9) {
                return 0;
            }
            break;
        case "left":
            x = position_x - movement;
            if (x < 0) {
                return 0;
            }
            break;
        case "right":
            x = position_x + movement;
            if (x > 6) {
                return 0;
            }
            break;
        case "up-left":
            y = position_y - movement;
            x = position_x - movement;
            if (y < 0 || x < 0) {
                return 0;
            }
            break;
        case "up-right":
            y = position_y - movement;
            x = position_x + movement;
            if (y < 0 || x > 6) {
                return 0;
            }
            break;
        case "down-left":
            y = position_y + movement;
            x = position_x - movement;
            if (y > 9 || x < 0) {
                return 0;
            }
            break;
        case "down-right":
            y = position_y + movement;
            x = position_x + movement;
            if (y > 9 || x > 6) {
                return 0;
            }
            break;
        default:
            return 0;
            break;
    }
    return [x, y];
        

};

async function rangeOfMovementInAllDirections(piece) {
    const position_x = piece.position_x;
    const position_y = piece.position_y;
    const movement = piece.movement;
    let directions = ["up", "down", "left", "right"];
    let movements = {};
    switch (piece.type) {
        case "Explorador":
            movements = {"up": [], "down": [], "left": [], "right": []};
            for (let i = 1; i <= movement; i++) {
                let movementValue = 0;
                directions.forEach(direction => {
                    movementValue = rangeOfMovementInDirection(direction, i, position_x, position_y);
                    if (movementValue != 0) {
                    movements[direction].push(movementValue);}
                });
            }
            break;
        case "Saltador":
            let jumpDirections = ["up-left", "up-right", "down-left", "down-right"];
            directions = directions.concat(jumpDirections);
            directions.forEach(direction => {
                movementValue = rangeOfMovementInDirection(direction, movement, position_x, position_y)
                if (movementValue != 0){
                movements[direction] = movementValue;}
            });
            break;
        case "Francotirador":
            directions.forEach(direction => {
                movementValue = rangeOfMovementInDirection(direction, movement, position_x, position_y)
                if (movementValue != 0){
                movements[direction] = movementValue;}
            });
            let atkRange = 2; //Francotirador attacks all that is 2 squares away
            movements["range"] = []
            directions.forEach(direction => {
                movementValue = rangeOfMovementInDirection(direction, atkRange, position_x, position_y);
                if (movementValue != 0){
                movements["range"].push(movementValue);}
            });
            break;
        default:
            directions.forEach(direction => {
                movementValue = rangeOfMovementInDirection(direction, movement, position_x, position_y)
                if (movementValue != 0){
                movements[direction] = movementValue;}
            });
            break;}
    return movements;
};

async function checkCollisions(pieces, piece, movements){
    let collisions = [];
    let x = 0;
    let y = 0;
    let collided = false;
    switch (piece.type) {
        case "Explorador":
            for (let key in movements) {
                collided = false;
                for (let move in movements[key]) {
                    x = movements[key][move][0];
                    y = movements[key][move][1];
                    for (const p of pieces) {
                        if (p.position_x == x && p.position_y == y) {
                            collided = true;
                            if (p.color != piece.color) {
                                collisions.push([x, y, "Attack"]);
                            };
                            break;
                        };
                    };
                    if (collided) {
                        break;
                    };
                    if (!collided) {
                        collisions.push([x, y, "Move"]);
                    };
                };
            };
            break;
        case "Francotirador":
            for (let key in movements) {
                x = movements[key][0];
                y = movements[key][1];
                collided = false;
                for (const p of pieces) {
                    if (p.position_x == x && p.position_y == y) {
                      collided = true;  
                      if (p.color != piece.color) {
                        collisions.push([x, y, "Attack"]);
                      } 
                    ;
                    }
                  }
                if (!collided) {
                    if (key != "range") {
                        collisions.push([x, y, "Move"]);
                    }
                }
                if (key == "range") {
                    for (let move in movements[key]){
                        x = movements[key][move][0];
                        y = movements[key][move][1];
                        for (const p of pieces) {
                            if (p.position_x == x && p.position_y == y) {
                                if (p.color != piece.color) {
                                    collisions.push([x, y, "Range"]);
                                };
                            };
                        }
                    };
                }
                  };
            break;
        default:
            for (let key in movements) {
                x = movements[key][0];
                y = movements[key][1];
                collided = false;
                for (const p of pieces) {
                    if (p.position_x == x && p.position_y == y) {
                      collided = true;  
                      if (p.color != piece.color) {
                        collisions.push([x, y, "Attack"]);
                      } 
                    break;
                    }
                  }
                if (!collided) {
                    collisions.push([x, y, "Move"]);
                }
                  };
            break;
        }
    return collisions};

async function getPieceMovements(ctx) {
    try {
        const { playerid, x, y} = ctx.params;
        const player = await ctx.orm.Player.findByPk(parseInt(playerid));
        if (!player) {
            ctx.body = {"error": "Player doesn't exist"};
            ctx.status = 400;
            return;
        }
        const game = await ctx.orm.Game.findByPk(player.gameid);
        const piece = await ctx.orm.Piece.findOne({
            where: {
                gameid: player.gameid,
                position_x: parseInt(x),
                position_y: parseInt(y)
            }
        });
        if (!piece) {
            ctx.body = {"error": "Piece doesn't exist"};
            ctx.status = 400;
            return;
        }
        if (player.color != piece.color){
            ctx.body = {"error": "Player doesn't own this piece"};
            ctx.status = 400;
            return;
        }
        const validatePlayerTurn = await validateIfItsPlayersTurn(player.color, game.turn);
        if (!validatePlayerTurn) {
            ctx.body = {"error": "It's not your turn"};
            ctx.status = 400;
            return;
        }
        
        const movements = await rangeOfMovementInAllDirections(piece);
        const pieces = await ctx.orm.Piece.findAll({
            where: {
                gameid: player.gameid}
        })
        const collisions = await checkCollisions(pieces, piece, movements);

        
        ctx.status = 200;
        ctx.body = {"movements": collisions};




    } catch (error) {
        ctx.body = {"error": error};
        ctx.status = 400;
        
    }
};

async function attackPiece(piece, enemyPiece, playType) {
    let result = {"result": "", "new_x": 0, "new_y": 0, "hidden": true, "petrified_turns": 0};
    if (piece.atk == enemyPiece.atk) {
        result["result"] = "draw";
        return result;
    };
    // playType == Range hacemos los 2 casos piece.atk > enemypiece y el else
    if (playType == "Range") {
        if (piece.atk > enemyPiece.atk) {
            result["result"] = "win";
            result["new_x"] = piece.position_x;
            result["new_y"] = piece.position_y;
            result["hidden"] = piece.hidden;
            result["petrified_turns"] = piece.petrified_turns;
            return result;
        } else {
            result["result"] = "no-death";
            return result;
        };
    };
    // handles enemy Bandera case
    if (enemyPiece.type == "Bandera") {
        result["result"] = "win";
        result["new_x"] = enemyPiece.position_x;
        result["new_y"] = enemyPiece.position_y;
        result["hidden"] = piece.hidden;
        result["petrified_turns"] = piece.petrified_turns;
        return result;
    };

    // handles Kamikaze case
    if (piece.type == "Kamikaze" || enemyPiece.type == "Kamikaze") {
        result["result"] = "draw";
        return result;
    };

    if (((piece.atk > enemyPiece.atk) && piece.type != "Francotirador")) {
        result["result"] = "win";
        result["new_x"] = enemyPiece.position_x;
        result["new_y"] = enemyPiece.position_y;
        switch (enemyPiece.type) {
            case "Medusa":
                result["hidden"] = piece.hidden;
                result["petrified_turns"] = 2;
                break;
        
            case "Explorador":
                result["hidden"] = false;
                result["petrified_turns"] = piece.petrified_turns;
                break;
        }
        return result;
    };
    if ((piece.atk < enemyPiece.atk) && enemyPiece.type != "Francotirador") {
        result["result"] = "lose";
        result["new_x"] = enemyPiece.position_x;
        result["new_y"] = enemyPiece.position_y;
        switch (piece.type) {
            case "Medusa":
                result["hidden"] = enemyPiece.hidden;
                result["petrified_turns"] = 2;
                break;
        
            case "Explorador":
                result["hidden"] = false;
                result["petrified_turns"] = enemyPiece.petrified_turns;
                break;
        }
        return result;
    };
    if (piece.type == "Francotirador"){
        result["result"] = "lose";
        result["new_x"] = enemyPiece.position_x;
        result["new_y"] = enemyPiece.position_y;
        result["hidden"] = enemyPiece.hidden;
        result["petrified_turns"] = enemyPiece.petrified_turns;
        return result;
    };

    if (enemyPiece.type == "Francotirador"){
        result["result"] = "win";
        result["new_x"] = enemyPiece.position_x;
        result["new_y"] = enemyPiece.position_y;
        result["hidden"] = piece.hidden;
        result["petrified_turns"] = piece.petrified_turns;
        return result;
    };
    
};



async function postPieceMovement(ctx) {
    try {
        const { playerid, initial_x, initial_y, final_x, final_y} = ctx.request.body;
        const player = await ctx.orm.Player.findByPk(parseInt(playerid));
        if (!player) {
            ctx.body = {"error": "Player doesn't exist", "result": false};
            ctx.status = 400;
            return;
        }
        const game = await ctx.orm.Game.findByPk(player.gameid);
        if (game.stage != "ongoing") {
            ctx.body = {"status": `Game is ${game.stage}`, "result": false};
            ctx.status = 200;
            return;
        }
        const piece = await ctx.orm.Piece.findOne({
            where: {
                gameid: player.gameid,
                position_x: parseInt(initial_x),
                position_y: parseInt(initial_y)
            }
        });
        if (!piece) {
            ctx.body = {"error": "Piece doesn't exist", "result": false};
            ctx.status = 400;
            return;
        }
        if (player.color != piece.color){
            ctx.body = {"error": "Player doesn't own this piece", "result": false};
            ctx.status = 200;
            return;
        }
        const validatePlayerTurn = await validateIfItsPlayersTurn(player.color, game.turn);
        if (!validatePlayerTurn) {
            ctx.body = {"error": "It's not your turn", "result": false};
            ctx.status = 200;
            return;
        }
        
        const movements = await rangeOfMovementInAllDirections(piece);
        const pieces = await ctx.orm.Piece.findAll({
            where: {
                gameid: player.gameid}
        })
        const collisions = await checkCollisions(pieces, piece, movements);

        // [X, Y, "Move/Attack"]
        let validMovement = false;
        let playType;
        for (const collision of collisions) {
            if (collision[0] == final_x && collision[1] == final_y) {
                validMovement = true;
                playType = collision[2];
                break;
            }
        };
        if (!validMovement) {
            ctx.body = {"error": "Invalid movement", "result": false};
            ctx.status = 400;
            return;
        };
        if (playType == "Move") {
            piece.position_x = final_x;
            piece.position_y = final_y;
            await piece.save();
            game.turn += 1;
            await game.save();
            ctx.body = {"msg":"Piece moved", "result": true};
            ctx.status = 200;
            return;
        };

        if (playType == "Attack" || playType == "Range") {
            const enemyPiece = await ctx.orm.Piece.findOne({
                where: {
                    gameid: player.gameid,
                    position_x: parseInt(final_x),
                    position_y: parseInt(final_y)
                }
            });
            const result = await attackPiece(piece, enemyPiece, playType); // {result: "win/lose/draw/no-death", new_x:, new_y, hidden:, petrified_turns:}

        switch (result["result"]) {
            case "win":
                let enemyType = enemyPiece.type;
                await enemyPiece.destroy();
                piece.position_x = result["new_x"];
                piece.position_y = result["new_y"];
                piece.hidden = result["hidden"];
                piece.petrified_turns = result["petrified_turns"];
                await piece.save();
                if (enemyType == "Bandera"){
                    ctx.body = {"msg":"You won the game", "result": true};
                    ctx.status = 200;
                    const game = await ctx.orm.Game.findByPk(player.gameid);
                    game.winner = player.id;
                    game.stage = "finished";
                    await game.save();
                    return;
                };
                game.turn += 1;
                await game.save();
                // ctx.body = "Piece moved and enemy piece destroyed";
                ctx.body = {"result": true};
                break;
            case "lose":
                await piece.destroy();
                enemyPiece.hidden = result["hidden"];
                enemyPiece.petrified_turns = result["petrified_turns"];
                await enemyPiece.save();
                game.turn += 1;
                await game.save();
                // ctx.body = "Piece destroyed, enemy piece was stronger";
                ctx.body = {"result": true};
                break;
            case "draw":
                await piece.destroy();
                await enemyPiece.destroy();
                game.turn += 1;
                await game.save();
                ctx.body = {"result": true};
                break;
            case "no-death":
                game.turn += 1;
                await game.save();
                ctx.body = {"result": true};
                break;
            default:
                throw new Error("Invalid result");
                break;
        };
    };
        const piecesAfterAttack = await ctx.orm.Piece.findAll(
            {where: {id: player.gameid}}
        )
        if (piecesAfterAttack.length == 2) {
            ctx.body = {"msg":"Draw", "result": true};
            const game = await ctx.orm.Game.findByPk(player.gameid);
            game.stage = "finished";
            game.winner = player.id;
            await game.save();
        }
        ctx.status = 200;
        
    } catch (error) {
        ctx.status = 400;
        ctx.body = error;
    }
    

};






module.exports = {getPieceMovements, getPiecesFromGameid, postPieceMovement};