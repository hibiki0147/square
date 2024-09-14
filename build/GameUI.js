define(["require", "exports", "./Button", "./TurnText", "./LineButton"], function (require, exports, Button_1, TurnText_1, LineButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameUI = void 0;
    class GameUI {
        constructor(undoEvent, redoEvent, resetEvent, homeEvent, lineEvent) {
            this.lineButtons = [];
            this.undoButton = new Button_1.Button(".undo", undoEvent);
            this.redoButton = new Button_1.Button(".redo", redoEvent);
            for (let i = 0; i < 33; i++) {
                this.lineButtons.push(new LineButton_1.LineButton(`button[data-id="${i}"]`, lineEvent));
            }
            this.turnText = new TurnText_1.TurnText();
        }
        changeLineButtonColor(index, lineStatus) {
            if (index >= 0 && index < this.lineButtons.length) {
                this.lineButtons[index].changeButtonColor(lineStatus);
            }
            else {
                throw Error(`GameUI Error:IndexOutOfBoundsExceptionです. index=[${index}]`);
            }
        }
        changeLineButtonsColor(boardDatas) {
            if (this.lineButtons.length === boardDatas.length) {
                for (let i = 0; i < this.lineButtons.length; i++) {
                    this.lineButtons[i].changeButtonColor(boardDatas[i]);
                }
            }
            else {
                throw Error(`GameUI Error:線と盤面データの数が合いません line=[${this.lineButtons.length}] boardDatas=[${boardDatas.length}]`);
            }
        }
        toggleViewTurnText(turnPlayer) {
            this.turnText.toggleViewTurnText(turnPlayer);
        }
    }
    exports.GameUI = GameUI;
});
//# sourceMappingURL=GameUI.js.map