define(["require", "exports", "./Player", "./GameStatus", "./GameResult", "./Board", "./LineStatus", "./GameUI"], function (require, exports, Player_1, GameStatus_1, GameResult_1, Board_1, LineStatus_1, GameUI_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = void 0;
    class Game {
        constructor() {
            this.turnPlayer = Player_1.Player.Red;
            this.gameStatus = GameStatus_1.GameStatus.Progress;
            this.gameResult = null;
            this.board = new Board_1.Board(33);
            this.gameUI = new GameUI_1.GameUI((element, ev) => { this.undoEvent(element, ev); }, (element, ev) => { this.redoEvent(element, ev); }, (element, ev) => { this.resetEvent(element, ev); }, (element, ev) => { this.lineEvent(element, ev); }, (element, ev) => { this.lineEvent(element, ev); });
            this.changeTurn(Player_1.Player.Red);
        }
        lineEvent(element, ev) {
            if (this.gameStatus === GameStatus_1.GameStatus.Progress) {
                if (element.dataset.id != null) {
                    const id = Number(element.dataset.id);
                    const lineState = this.turnPlayer === Player_1.Player.Red ? LineStatus_1.LineStatus.Red : LineStatus_1.LineStatus.Blue;
                    if (this.board.isChangeableLine(id)) {
                        const result = this.board.changeLineStatus(id, lineState);
                        this.gameUI.changeLineButtonColor(id, lineState);
                        if (result != null) {
                            this.victoryEffect(result);
                        }
                        this.changeTurn();
                    }
                }
                else {
                    throw Error("Game Error:HTMLElementに data-id を設定してください");
                }
            }
        }
        victoryEffect(gameResult) {
            this.gameResult = gameResult;
            let message = "";
            switch (this.gameResult) {
                case GameResult_1.GameResult.RedWin:
                    message = "赤プレイヤーの勝利";
                    break;
                case GameResult_1.GameResult.BlueWin:
                    message = "青プレイヤーの勝利";
                    break;
                case GameResult_1.GameResult.Draw:
                    message = "引き分け";
                    break;
            }
            setTimeout(() => {
                window.alert(message);
            }, 1);
            this.gameStatus = GameStatus_1.GameStatus.End;
        }
        undoEvent(element, ev) {
            const result = this.board.undo();
            if (result) {
                this.changeTurn();
                this.gameUI.changeLineButtonsColor(this.board.getBoardDatas());
            }
        }
        redoEvent(element, ev) {
            const result = this.board.redo();
            if (result) {
                this.changeTurn();
                this.gameUI.changeLineButtonsColor(this.board.getBoardDatas());
            }
        }
        resetEvent(element, ev) {
            this.board.reset();
            this.changeTurn(Player_1.Player.Red);
            this.gameStatus = GameStatus_1.GameStatus.Progress;
        }
        changeTurn(nextPlayer) {
            if (nextPlayer === undefined) {
                this.turnPlayer = this.turnPlayer === Player_1.Player.Red ? Player_1.Player.Blue : Player_1.Player.Red;
            }
            else {
                this.turnPlayer = nextPlayer;
            }
            this.gameUI.toggleViewTurnText(this.turnPlayer);
        }
    }
    exports.Game = Game;
    const game = new Game();
});
//# sourceMappingURL=Game.js.map