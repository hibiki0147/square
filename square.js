"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var buttons = [];
var boardDatas = [];
var boardRecord = [];
var redText;
var blueText;
var nowRecordIndex = 0;
var Player;
(function (Player) {
    Player[Player["None"] = 0] = "None";
    Player[Player["Red"] = 1] = "Red";
    Player[Player["Blue"] = 2] = "Blue";
})(Player || (Player = {}));
;
var nowPlayer = Player.Red;
window.addEventListener("load", function () {
    var _a, _b, _c, _d;
    var btnElements = document.querySelectorAll(".mass button");
    for (var _i = 0, btnElements_1 = btnElements; _i < btnElements_1.length; _i++) {
        var elem = btnElements_1[_i];
        buttons.push(elem);
    }
    buttons.sort(function (a, b) {
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
    (_a = document.querySelector(".redo")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { redo(); });
    (_b = document.querySelector(".undo")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () { undo(); });
    buttons.forEach(function (b) {
        boardDatas.push(Player.None);
        b.addEventListener("click", function () {
            if (b.dataset.id != undefined) {
                var index = Number(b.dataset.id);
                if (boardDatas[index] === Player.None) {
                    var color = nowPlayer === Player.Red ? "red" : "blue";
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
    var shape = new Shape(shapeDataList[1]);
    var data = (_d = (_c = shape.shiftRight(3)) === null || _c === void 0 ? void 0 : _c.shiftBottom(1)) === null || _d === void 0 ? void 0 : _d.data;
    if (data != null) {
        for (var _e = 0, data_1 = data; _e < data_1.length; _e++) {
            var index = data_1[_e];
            buttons[index].style.background = "red";
        }
    }
    else {
        console.log("null");
    }
    // testViewOneShape(0, 0, 0, buttons);
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
    boardRecord.push(__spreadArray([], boardDatas, true));
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
        boardDatas = __spreadArray([], boardRecord[nowRecordIndex], true);
        reColorButtons();
    }
}
function reColorButtons() {
    for (var i = 0; i < boardDatas.length; i++) {
        var color = "black";
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
var intervalID = 0;
function testCheckOneShape(index, buttons) {
    if (index >= 0 && index < shapeDataList.length) {
        var shape_1 = new Shape(shapeDataList[index]);
        var shiftRight_1 = 0;
        var shiftBottom_1 = 0;
        var isLoop = true;
        intervalID = setInterval(function () {
            var newShape = shape_1.shiftRight(shiftRight_1);
            if (newShape === null) {
                shiftRight_1 = 0;
                shiftBottom_1++;
            }
            else {
                shiftRight_1++;
                newShape = newShape.shiftBottom(shiftBottom_1);
                if (newShape === null) {
                    clearInterval(intervalID);
                    return false;
                }
                else {
                    // ... 
                    for (var _i = 0, _a = Array.from(buttons); _i < _a.length; _i++) {
                        var button = _a[_i];
                        button.style.background = "#f0f0f0";
                    }
                    for (var _b = 0, _c = newShape.data; _b < _c.length; _b++) {
                        var index_1 = _c[_b];
                        buttons[index_1].style.background = "red";
                    }
                }
            }
        }, 500);
        // while(isLoop) {
        // }
    }
}
function testViewOneShape(index, right, bottom, buttons) {
    var _a, _b;
    if (index >= 0 && index < shapeDataList.length) {
        var shape = new Shape(shapeDataList[index]);
        var data = (_b = (_a = shape.shiftRight(right)) === null || _a === void 0 ? void 0 : _a.shiftBottom(bottom)) === null || _b === void 0 ? void 0 : _b.data;
        if (data != null) {
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var index_2 = data_2[_i];
                buttons[index_2].style.background = "red";
            }
        }
        else {
            console.log("null");
        }
    }
}
function check() {
    // let i = 0;
    for (var _i = 0, shapeDataList_1 = shapeDataList; _i < shapeDataList_1.length; _i++) {
        var data = shapeDataList_1[_i];
        // console.log("-----------------");
        // console.log(data);
        var shape = new Shape(data);
        var shiftRight = 0;
        var shiftBottom = 0;
        var _loop_1 = function () {
            var newShape = shape.shiftRight(shiftRight);
            if (newShape === null) {
                shiftRight = 0;
                shiftBottom++;
            }
            else {
                shiftRight++;
                newShape = newShape.shiftBottom(shiftBottom);
                if (newShape === null) {
                    return "break";
                }
                else {
                    var rOrb_1 = Player.None;
                    var isOk = true;
                    for (var _a = 0, _b = newShape.data; _a < _b.length; _a++) {
                        var index = _b[_a];
                        var boardData = boardDatas[index];
                        if (boardData === Player.None ||
                            (rOrb_1 !== 0 && boardData !== rOrb_1)) {
                            isOk = false;
                            break;
                        }
                        if (boardData !== Player.None && rOrb_1 === Player.None) {
                            rOrb_1 = boardDatas[index];
                        }
                    }
                    if (isOk && rOrb_1 !== 0) {
                        // UI描画を先にするためsetTimeout
                        setTimeout(function () { alert(rOrb_1 + "の勝ち"); }, 1);
                        return { value: void 0 };
                    }
                    else {
                        // console.log(newShape.data);
                    }
                }
            }
        };
        while (true) {
            var state_1 = _loop_1();
            if (typeof state_1 === "object")
                return state_1.value;
            if (state_1 === "break")
                break;
        }
        // console.log("-----------------");
        // i++;
    }
}
var Shape = /** @class */ (function () {
    function Shape(data) {
        this.maxWidth = 3;
        this.maxLength = 3;
        this.oneLine = 9;
        if (data != undefined) {
            this.data = data;
        }
    }
    Shape.prototype.shiftRight = function (multiple) {
        var newData = __spreadArray([], this.data, true);
        for (var i = 0; i < newData.length; i++) {
            var newPosition = 0;
            var plus = void 0;
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
    };
    Shape.prototype.shiftBottom = function (multiple) {
        var newData = __spreadArray([], this.data, true);
        for (var i = 0; i < newData.length; i++) {
            var plus = 10 * multiple;
            newData[i] += plus;
            if (newData[i] > 32) {
                return null;
            }
        }
        return new Shape(newData);
    };
    return Shape;
}());
var shapeDataList = [
    [0, 1, 2], // 横                                  0
    [3, 13, 23], // 縦                                1
    [8, 16, 24], // 斜め                              2
    [0, 3, 5, 10], // 正方形 1*1                      3
    [0, 1, 3, 7, 13, 17, 20, 21], // 正方形 2*2       4
    [0, 1, 3, 7, 10, 11], // 長方形（横）1*2          5
    [0, 3, 5, 13, 15, 20], // 長方形（縦）2*1         6
    [0, 1, 3, 6, 10], // 台形１（横）1-2              7
    [1, 4, 7, 10, 11], // 台形１（横反転）1-2         8           
    [4, 5, 13, 15, 20], // 台形１（縦）2-1            9        
    [0, 3, 5, 13, 14], // 台形１（縦下向き）2-1       10           
    [1, 4, 6, 13, 14], // 台形２ 2-1                 11
    [6, 7, 14, 16, 20], // 台形２（反転）2-1          12             
    [1, 4, 6, 10], // ひし形 1*1                     13
    [2, 6, 8, 14, 16, 20], // ひし形 2*1             14        
    [1, 2, 4, 8, 10, 11], // ひし形 1*2              15       
];
