define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BoardLogs = void 0;
    class BoardLogs {
        constructor(initBoardDatas) {
            this.boardLogDatas = [];
            this.nowLogsIndex = 0;
            this.push(initBoardDatas);
            console.log(this.boardLogDatas);
        }
        push(boardDatas) {
            this.boardLogDatas = this.boardLogDatas.slice(0, this.nowLogsIndex + 1);
            this.boardLogDatas.push([...boardDatas]);
            this.nowLogsIndex = this.boardLogDatas.length - 1;
        }
        undo() {
            if (this.nowLogsIndex > 0) {
                this.nowLogsIndex--;
                return [...this.boardLogDatas[this.nowLogsIndex]];
            }
            else {
                return null;
            }
        }
        redo() {
            if (this.nowLogsIndex + 1 < this.boardLogDatas.length) {
                this.nowLogsIndex++;
                return [...this.boardLogDatas[this.nowLogsIndex]];
            }
            else {
                return null;
            }
        }
        getNowBoardData() {
            if (this.nowLogsIndex >= 0 && this.nowLogsIndex < this.boardLogDatas.length) {
                return [...this.boardLogDatas[this.nowLogsIndex]];
            }
            else {
                return null;
            }
        }
        reset() {
            this.boardLogDatas = [];
            this.nowLogsIndex = 0;
        }
    }
    exports.BoardLogs = BoardLogs;
});
//# sourceMappingURL=BoardLogs.js.map