import { Player } from "./Player";
import { GameStatus } from "./GameStatus";
import { GameResult } from "./GameResult";
import { Board } from "./Board";
import { LineStatus } from "./LineStatus";
import { GameUI } from "./GameUI";

export class Game {
  // vvv changeTurnを通しているがtsで認識されないため初期化 vvv
  private turnPlayer:Player = Player.Red;
  private gameStatus:GameStatus;
  private gameResult:GameResult | null;
  private board:Board;
  private gameUI:GameUI;

  constructor() {
    this.gameStatus = GameStatus.Progress;
    this.gameResult = null;
    this.board = new Board(33); // 33は現在は決め打ち
    this.gameUI = new GameUI(
      (element:HTMLButtonElement,ev:MouseEvent)=>{this.undoEvent(element,ev);},
      (element:HTMLButtonElement,ev:MouseEvent)=>{this.redoEvent(element,ev);},
      (element:HTMLButtonElement,ev:MouseEvent)=>{this.resetEvent(element,ev);},
      // vvv ダミー vvv
      (element:HTMLButtonElement,ev:MouseEvent)=>{this.lineEvent(element,ev);},
      (element:HTMLButtonElement,ev:MouseEvent)=>{this.lineEvent(element,ev);},
    );
    this.changeTurn(Player.Red);
  }

  private lineEvent(element:HTMLButtonElement, ev:MouseEvent):void {
    if(this.gameStatus === GameStatus.Progress) {
      if(element.dataset.id != null) {
        const id:number = Number(element.dataset.id);
        const lineState = this.turnPlayer === Player.Red ? LineStatus.Red : LineStatus.Blue;
        if(this.board.isChangeableLine(id)) {
          const result = this.board.changeLineStatus(id, lineState);
          this.gameUI.changeLineButtonColor(id, lineState);
          if(result != null) {
            this.victoryEffect(result);
          }
          this.changeTurn();
        }
      } else {
        throw Error("Game Error:HTMLElementに data-id を設定してください");
      }
    }
  }
  
  private victoryEffect(gameResult:GameResult) {
    this.gameResult = gameResult;
    let message = "";
    switch(this.gameResult) {
      case GameResult.RedWin:
        message = "赤プレイヤーの勝利";
        break;
      case GameResult.BlueWin:
        message = "青プレイヤーの勝利";
        break;
      case GameResult.Draw:
        message = "引き分け";
        break;
    }
    setTimeout(() => {
      window.alert(message);
    }, 1);
    this.gameStatus = GameStatus.End;
  }

  private undoEvent(element:HTMLButtonElement, ev:MouseEvent):void {
    const result = this.board.undo();
    if(result) {
      this.changeTurn();
      // vvv 対戦ドメインの役割から逸脱している気がする
      this.gameUI.changeLineButtonsColor(this.board.getBoardDatas());
    }
  }

  private redoEvent(element:HTMLButtonElement, ev:MouseEvent):void {
    const result = this.board.redo();
    if(result) {
      this.changeTurn();
      // vvv 対戦ドメインの役割から逸脱している気がする
      this.gameUI.changeLineButtonsColor(this.board.getBoardDatas());
    }
  }

  private resetEvent(element:HTMLButtonElement, ev:MouseEvent):void {
    this.board.reset();
    this.changeTurn(Player.Red);
    this.gameStatus = GameStatus.Progress;
  }

  private changeTurn(nextPlayer?:Player) {
    if(nextPlayer === undefined) {
      this.turnPlayer = this.turnPlayer === Player.Red ? Player.Blue : Player.Red;
    } else {
      this.turnPlayer = nextPlayer;
    }
    this.gameUI.toggleViewTurnText(this.turnPlayer);
  }
}

const game = new Game();

