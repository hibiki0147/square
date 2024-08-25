"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const BoardLogs_1 = require("./BoardLogs");
const LineStatus_1 = require("./LineStatus");
class Board {
    constructor(boardLineSum) {
        this.boardDatas = [];
        for (let i = 0; i < boardLineSum; i++) {
            this.boardDatas.push(LineStatus_1.LineStatus.None);
        }
        this.boardLogs = new BoardLogs_1.BoardLogs();
    }
}
exports.Board = Board;
//# sourceMappingURL=Board.js.map