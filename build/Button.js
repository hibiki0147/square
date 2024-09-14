define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Button = void 0;
    class Button {
        constructor(query, listener) {
            console.log(query + ":Button初期化" + document.readyState);
            switch (document.readyState) {
                case "loading":
                case "interactive":
                    window.addEventListener("DOMContentLoaded", () => {
                        this.init(query, listener);
                    });
                    break;
                case "complete":
                    this.init(query, listener);
                    break;
            }
        }
        init(query, listener) {
            const buttonTmp = document.querySelector(query);
            console.log(buttonTmp);
            if (buttonTmp === null) {
                throw Error("Button Error:ボタンが見つかりませんでした");
            }
            else {
                this.button = buttonTmp;
                this.button.addEventListener("click", (ev) => {
                    listener(buttonTmp, ev);
                });
            }
        }
    }
    exports.Button = Button;
});
//# sourceMappingURL=Button.js.map