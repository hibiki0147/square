define(["require", "exports", "./BoardLogs", "./LineStatus", "./VictoryPattern"], function (require, exports, BoardLogs_1, LineStatus_1, VictoryPattern_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Board = void 0;
    class Board {
        constructor(boardLineSum) {
            this.boardDatas = [];
            for (let i = 0; i < boardLineSum; i++) {
                this.boardDatas.push(LineStatus_1.LineStatus.None);
            }
            this.boardLogs = new BoardLogs_1.BoardLogs(this.boardDatas);
            this.victoryPattern = new VictoryPattern_1.VictoryPattern();
        }
        changeLineStatus(index, lineStatus) {
            if (index >= 0 && index < this.boardDatas.length) {
                this.boardDatas[index] = lineStatus;
                this.boardLogs.push(this.boardDatas);
                return this.victoryPattern.check(this.boardDatas);
            }
            else {
                throw Error(`Board Error:IndexOutOfBoundsExceptionです. index=[${index}]`);
            }
        }
        undo() {
            const result = this.boardLogs.undo();
            if (result != null) {
                this.boardDatas = result;
                return true;
            }
            else {
                return false;
            }
        }
        redo() {
            const result = this.boardLogs.redo();
            if (result != null) {
                this.boardDatas = result;
                return true;
            }
            else {
                return false;
            }
        }
        reset() {
            for (let i = 0; i < this.boardDatas.length; i++) {
                this.boardDatas[i] = LineStatus_1.LineStatus.None;
            }
            this.boardLogs.reset();
        }
        isChangeableLine(index) {
            if (index >= 0 && index < this.boardDatas.length) {
                return this.boardDatas[index] === LineStatus_1.LineStatus.None;
            }
            else {
                throw Error(`Board Error:IndexOutOfBoundsExceptionです. index=[${index}]`);
            }
        }
        getBoardDatas() {
            return this.boardDatas;
        }
    }
    exports.Board = Board;
});
//# sourceMappingURL=Board.js.map