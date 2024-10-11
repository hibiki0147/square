define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Button = void 0;
    class Button {
        constructor(query, listener) {
            console.log(query + ":Button初期化" + document.readyState);
            switch (document.readyState) {
                case "loading":
                    window.addEventListener("DOMContentLoaded", () => {
                        this.init(query, listener);
                    });
                    break;
                case "interactive":
                case "complete":
                    this.init(query, listener);
                    break;
                default:
                    throw Error("Button Error:UIの初期化に失敗しました");
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
        setEnable(value) {
            if (this.button !== undefined) {
                this.button.disabled = !value;
            }
            else {
                throw Error("Button Error:ボタンが初期化されていない状態です");
            }
        }
        getEnable() {
            if (this.button !== undefined) {
                return !this.button.disabled;
            }
            else {
                throw Error("Button Error:ボタンが初期化されていない状態です");
            }
        }
    }
    exports.Button = Button;
});
//# sourceMappingURL=Button.js.map