"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
const GameStatus_1 = require("./GameStatus");
const Board_1 = require("./Board");
class Game {
    constructor() {
        this.turnPlayer = Player_1.Player.Red;
        this.gameStatus = GameStatus_1.GameStatus.Progress;
        this.gameResult = null;
        this.board = new Board_1.Board(33);
    }
}
//# sourceMappingURL=Game.js.map