"use strict";
let buttons = [];
let boardDatas = [];
let boardRecord = [];
let redText;
let blueText;
let nowRecordIndex = 0;
var Player;
(function (Player) {
    Player[Player["None"] = 0] = "None";
    Player[Player["Red"] = 1] = "Red";
    Player[Player["Blue"] = 2] = "Blue";
})(Player || (Player = {}));
;
let nowPlayer = Player.Red;
window.addEventListener("load", () => {
    var _a, _b, _c, _d;
    const btnElements = document.querySelectorAll(".mass button");
    for (const elem of btnElements) {
        buttons.push(elem);
    }
    buttons.sort((a, b) => {
        if (a.dataset.id != undefined && b.dataset.id != undefined) {
            return Number(a.dataset.id) - Number(b.dataset.id);
        }
        else {
            return 0;
        }
    });
    redText = document.querySelector(".redText");
    blueText = document.querySelector(".blueText");
    toggleTurnText();
    (_a = document.querySelector(".redo")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => { redo(); });
    (_b = document.querySelector(".undo")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => { undo(); });
    buttons.forEach(b => {
        boardDatas.push(Player.None);
        b.addEventListener("click", () => {
            if (b.dataset.id != undefined) {
                const index = Number(b.dataset.id);
                if (boardDatas[index] === Player.None) {
                    let color = nowPlayer === Player.Red ? "red" : "blue";
                    b.style.background = color;
                    b.style.borderColor = color;
                    console.log(b.dataset.id);
                    boardDatas[index] = nowPlayer;
                    pushRecord();
                    console.log("Click");
                    check();
                    nowPlayer = nowPlayer === Player.Red ? Player.Blue : Player.Red;
                    toggleTurnText();
                }
                else {
                    console.log(boardDatas.length);
                    console.log(boardDatas[index]);
                }
            }
        });
    });
    pushRecord();
    const shape = new Shape(shapeDataList[1]);
    const data = (_d = (_c = shape.shiftRight(3)) === null || _c === void 0 ? void 0 : _c.shiftBottom(1)) === null || _d === void 0 ? void 0 : _d.data;
    if (data != null) {
        for (const index of data) {
            buttons[index].style.background = "red";
        }
    }
    else {
        console.log("null");
    }
});
function toggleTurnText() {
    if (nowPlayer === Player.Red) {
        if (redText != null && blueText != null) {
            redText.style.opacity = "1";
            blueText.style.opacity = "0";
        }
    }
    else {
        if (redText != null && blueText != null) {
            redText.style.opacity = "0";
            blueText.style.opacity = "1";
        }
    }
}
function pushRecord() {
    boardRecord = boardRecord.slice(0, nowRecordIndex + 1);
    console.log(nowRecordIndex);
    boardRecord.push([...boardDatas]);
    nowRecordIndex = boardRecord.length - 1;
    console.log(boardRecord);
}
function undo() {
    if (nowRecordIndex > 0) {
        nowRecordIndex--;
        reRecord();
        nowPlayer = nowPlayer === Player.Red ? Player.Blue : Player.Red;
        toggleTurnText();
    }
    console.log(nowRecordIndex);
}
function redo() {
    if (nowRecordIndex < boardRecord.length - 1) {
        nowRecordIndex++;
        reRecord();
        nowPlayer = nowPlayer === Player.Red ? Player.Blue : Player.Red;
        toggleTurnText();
    }
    console.log(nowRecordIndex);
}
function reRecord() {
    if (nowRecordIndex >= 0 && nowRecordIndex < boardRecord.length) {
        boardDatas = [...boardRecord[nowRecordIndex]];
        reColorButtons();
    }
}
function reColorButtons() {
    for (let i = 0; i < boardDatas.length; i++) {
        let color = "black";
        if (boardDatas[i] === Player.Red) {
            color = "red";
        }
        else if (boardDatas[i] === Player.Blue) {
            color = "blue";
        }
        buttons[i].style.background = color;
        buttons[i].style.borderColor = color;
    }
}
let intervalID = 0;
function testCheckOneShape(index, buttons) {
    if (index >= 0 && index < shapeDataList.length) {
        const shape = new Shape(shapeDataList[index]);
        let shiftRight = 0;
        let shiftBottom = 0;
        let isLoop = true;
        intervalID = setInterval(() => {
            let newShape = shape.shiftRight(shiftRight);
            if (newShape === null) {
                shiftRight = 0;
                shiftBottom++;
            }
            else {
                shiftRight++;
                newShape = newShape.shiftBottom(shiftBottom);
                if (newShape === null) {
                    clearInterval(intervalID);
                    return false;
                }
                else {
                    for (const button of Array.from(buttons)) {
                        button.style.background = "#f0f0f0";
                    }
                    for (const index of newShape.data) {
                        buttons[index].style.background = "red";
                    }
                }
            }
        }, 500);
    }
}
function testViewOneShape(index, right, bottom, buttons) {
    var _a, _b;
    if (index >= 0 && index < shapeDataList.length) {
        const shape = new Shape(shapeDataList[index]);
        const data = (_b = (_a = shape.shiftRight(right)) === null || _a === void 0 ? void 0 : _a.shiftBottom(bottom)) === null || _b === void 0 ? void 0 : _b.data;
        if (data != null) {
            for (const index of data) {
                buttons[index].style.background = "red";
            }
        }
        else {
            console.log("null");
        }
    }
}
function check() {
    for (const data of shapeDataList) {
        const shape = new Shape(data);
        let shiftRight = 0;
        let shiftBottom = 0;
        while (true) {
            let newShape = shape.shiftRight(shiftRight);
            if (newShape === null) {
                shiftRight = 0;
                shiftBottom++;
            }
            else {
                shiftRight++;
                newShape = newShape.shiftBottom(shiftBottom);
                if (newShape === null) {
                    break;
                }
                else {
                    let rOrb = Player.None;
                    let isOk = true;
                    for (const index of newShape.data) {
                        const boardData = boardDatas[index];
                        if (boardData === Player.None ||
                            (rOrb !== 0 && boardData !== rOrb)) {
                            isOk = false;
                            break;
                        }
                        if (boardData !== Player.None && rOrb === Player.None) {
                            rOrb = boardDatas[index];
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
class Shape {
    constructor(data) {
        this.data = [];
        this.maxWidth = 3;
        this.maxLength = 3;
        this.oneLine = 9;
        if (data != undefined) {
            this.data = data;
        }
    }
    shiftRight(multiple) {
        const newData = [...this.data];
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
        return new Shape(newData);
    }
    shiftBottom(multiple) {
        const newData = [...this.data];
        for (let i = 0; i < newData.length; i++) {
            let plus = 10 * multiple;
            newData[i] += plus;
            if (newData[i] > 32) {
                return null;
            }
        }
        return new Shape(newData);
    }
}
const shapeDataList = [
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
//# sourceMappingURL=square.js.map