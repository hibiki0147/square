"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VictoryPattern = void 0;
const LineStatus_1 = require("./LineStatus");
class VictoryPattern {
    constructor(boardDatas) {
        this.shapeDataList = [
            [0, 1, 2],
            [3, 13, 23],
            [8, 16, 24],
            [0, 3, 5, 10],
            [0, 1, 3, 7, 13, 17, 20, 21],
            [0, 1, 3, 7, 10, 11],
            [0, 3, 5, 13, 15, 20],
            [0, 1, 3, 6, 10],
            [1, 4, 7, 10, 11],
            [4, 5, 13, 15, 20],
            [0, 3, 5, 13, 14],
            [1, 4, 6, 13, 14],
            [6, 7, 14, 16, 20],
            [1, 4, 6, 10],
            [2, 6, 8, 14, 16, 20],
            [1, 2, 4, 8, 10, 11],
        ];
        this.boardDatas = boardDatas;
    }
    check() {
        for (const data of this.shapeDataList) {
            let shiftRight = 0;
            let shiftBottom = 0;
            while (true) {
                let newShape = this.shiftRight(shiftRight, data);
                if (newShape === null) {
                    shiftRight = 0;
                    shiftBottom++;
                }
                else {
                    shiftRight++;
                    newShape = this.shiftBottom(shiftBottom, data);
                    if (newShape === null) {
                        break;
                    }
                    else {
                        let rOrb = LineStatus_1.LineStatus.None;
                        let isOk = true;
                        for (const index of newShape) {
                            const boardData = this.boardDatas[index];
                            if (boardData === LineStatus_1.LineStatus.None ||
                                (rOrb !== 0 && boardData !== rOrb)) {
                                isOk = false;
                                break;
                            }
                            if (boardData !== LineStatus_1.LineStatus.None &&
                                rOrb === LineStatus_1.LineStatus.None) {
                                rOrb = this.boardDatas[index];
                            }
                        }
                        if (isOk && rOrb !== 0) {
                            setTimeout(() => { alert(rOrb + "の勝ち"); }, 1);
                            return;
                        }
                        else {
                        }
                    }
                }
            }
        }
    }
    shiftRight(multiple, data) {
        const newData = [...data];
        for (let i = 0; i < newData.length; i++) {
            let newPosition = 0;
            let plus;
            if (newData[i] % 10 < 3) {
                plus = 1 * multiple;
                newPosition = newData[i] + plus;
                if (newPosition % 10 >= 3) {
                    return null;
                }
            }
            else {
                plus = 2 * multiple;
                newPosition = newData[i] + plus;
                if (newPosition % 10 <= 2) {
                    return null;
                }
            }
            newData[i] += plus;
        }
        return newData;
    }
    shiftBottom(multiple, data) {
        const newData = [...data];
        for (let i = 0; i < newData.length; i++) {
            let plus = 10 * multiple;
            newData[i] += plus;
            if (newData[i] > 32) {
                return null;
            }
        }
        return newData;
    }
}
exports.VictoryPattern = VictoryPattern;
//# sourceMappingURL=VictoryPattern.js.map