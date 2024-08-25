"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
const GameStatus_1 = require("./GameStatus");
class Game {
    constructor() {
        this.turnPlayer = Player_1.Player.Red;
        this.gameStatus = GameStatus_1.GameStatus.Progress;
        this.gameResult = null;
    }
}
//# sourceMappingURL=Game.js.map