define(["require", "exports", "./LineStatus"], function (require, exports, LineStatus_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LineButton = void 0;
    class LineButton {
        constructor(query, listener) {
            console.log(query + ":Button初期化" + document.readyState);
            switch (document.readyState) {
                case "loading":
                    window.addEventListener("DOMContentLoaded", () => {
                        this.init(query, listener);
                        console.log("イベント追加");
                    });
                    break;
                case "interactive":
                case "complete":
                    this.init(query, listener);
                    console.log("イベント追加");
                    break;
            }
        }
        init(query, listener) {
            const buttonTmp = document.querySelector(query);
            if (buttonTmp === null) {
                throw Error("Button Error:ボタンが見つかりませんでした");
            }
            else {
                this.button = buttonTmp;
                this.button.addEventListener("click", (ev) => {
                    listener(buttonTmp, ev);
                    console.log(query + ":クリック");
                });
            }
        }
        changeButtonColor(lineStatus) {
            let color = "";
            switch (lineStatus) {
                case LineStatus_1.LineStatus.Red:
                    color = "Red";
                    break;
                case LineStatus_1.LineStatus.Blue:
                    color = "Blue";
                    break;
                case LineStatus_1.LineStatus.None:
                    color = "Black";
                    break;
            }
            this.button.style.backgroundColor = color;
            this.button.style.borderColor = color;
        }
    }
    exports.LineButton = LineButton;
});
//# sourceMappingURL=LineButton.js.map