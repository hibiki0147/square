var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "./GameResult", "./LineStatus"], function (require, exports, GameResult_1, LineStatus_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VictoryPattern = void 0;
    let clearId = 0;
    class VictoryPattern {
        constructor() {
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
                [4, 5, 13, 14],
                [6, 7, 14, 16, 23, 24],
                [4, 5, 13, 15, 23, 24],
            ];
        }
        test() {
            const lineButtons = [];
            for (let i = 0; i < 33; i++) {
                const temp = document.querySelector(`button[data-id="${i}"]`);
                if (temp != null) {
                    lineButtons.push(temp);
                }
            }
            this.testShapeListView(lineButtons, 250);
        }
        testShapeListView(lineButtons, timeout = 500) {
            return __awaiter(this, void 0, void 0, function* () {
                let index = 0;
                while (index < this.shapeDataList.length) {
                    yield this.testOneShapeListView(index, lineButtons, timeout);
                    index++;
                }
            });
        }
        testOneShapeListView(index, lineButtons, timeout = 500) {
            return __awaiter(this, void 0, void 0, function* () {
                let data = this.shapeDataList[index];
                let shiftRight = 0;
                let shiftBottom = 0;
                let checkData = [...data];
                while (true) {
                    for (const elem of lineButtons) {
                        elem.style.backgroundColor = "Black";
                    }
                    for (const index of checkData) {
                        if (index >= 0 && index < lineButtons.length) {
                            lineButtons[index].style.backgroundColor = "Red";
                        }
                    }
                    yield new Promise(resolve => setTimeout(resolve, timeout));
                    console.log("500ミリ秒経過");
                    shiftRight += 1;
                    checkData = this.shiftRight(shiftRight, data);
                    if (checkData === null) {
                        shiftRight = 0;
                        shiftBottom += 1;
                        checkData = data;
                    }
                    checkData = this.shiftBottom(shiftBottom, checkData);
                    if (checkData === null) {
                        for (const elem of lineButtons) {
                            elem.style.backgroundColor = "Black";
                        }
                        break;
                    }
                }
            });
        }
        check(boardDatas) {
            for (const data of this.shapeDataList) {
                let shiftRight = 0;
                let shiftBottom = 0;
                let checkData = [...data];
                while (true) {
                    let gameResult = this.check_thisShape(boardDatas, checkData);
                    if (gameResult !== null) {
                        return gameResult;
                    }
                    else {
                        shiftRight += 1;
                        checkData = this.shiftRight(shiftRight, data);
                        if (checkData === null) {
                            shiftRight = 0;
                            shiftBottom += 1;
                            checkData = data;
                        }
                        checkData = this.shiftBottom(shiftBottom, checkData);
                        if (checkData === null) {
                            break;
                        }
                    }
                }
            }
            for (const boardData of boardDatas) {
                if (boardData === LineStatus_1.LineStatus.None) {
                    return null;
                }
            }
            return GameResult_1.GameResult.Draw;
        }
        check_thisShape(boardDatas, shape) {
            let targetPlayer = LineStatus_1.LineStatus.None;
            let isOk = true;
            for (const index of shape) {
                const boardData = boardDatas[index];
                if (boardData === LineStatus_1.LineStatus.None ||
                    (targetPlayer !== LineStatus_1.LineStatus.None && boardData !== targetPlayer)) {
                    isOk = false;
                    break;
                }
                if (targetPlayer === LineStatus_1.LineStatus.None) {
                    targetPlayer = boardDatas[index];
                }
            }
            if (isOk && targetPlayer !== LineStatus_1.LineStatus.None) {
                if (targetPlayer === LineStatus_1.LineStatus.Red) {
                    return GameResult_1.GameResult.RedWin;
                }
                else {
                    return GameResult_1.GameResult.BlueWin;
                }
            }
            else {
                return null;
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
                newData[i] = newPosition;
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
});
//# sourceMappingURL=VictoryPattern.js.map