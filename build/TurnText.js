define(["require", "exports", "./Player"], function (require, exports, Player_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TurnText = void 0;
    class TurnText {
        constructor() {
            const redTextTmp = document.querySelector(".redText");
            if (redTextTmp === null) {
                throw Error("TurnText Error: 赤ターンのSpanエレメントを設置してください");
            }
            else {
                this.redText = redTextTmp;
            }
            const blueTextTmp = document.querySelector(".blueText");
            if (blueTextTmp === null) {
                throw Error("TurnText Error: 青ターンのSpanエレメントを設置してください");
            }
            else {
                this.blueText = blueTextTmp;
            }
        }
        toggleViewTurnText(turnPlayer) {
            if (turnPlayer === Player_1.Player.Red) {
                this.redText.style.opacity = "1";
                this.blueText.style.opacity = "0";
            }
            else {
                this.redText.style.opacity = "0";
                this.blueText.style.opacity = "1";
            }
        }
    }
    exports.TurnText = TurnText;
});
//# sourceMappingURL=TurnText.js.map