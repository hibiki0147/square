define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameStatus = void 0;
    var GameStatus;
    (function (GameStatus) {
        GameStatus[GameStatus["Progress"] = 0] = "Progress";
        GameStatus[GameStatus["TmpProgress"] = 1] = "TmpProgress";
        GameStatus[GameStatus["End"] = 2] = "End";
    })(GameStatus || (exports.GameStatus = GameStatus = {}));
});
//# sourceMappingURL=GameStatus.js.map