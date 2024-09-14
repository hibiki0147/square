import { Player } from "./Player";

export class TurnText {
  private redText:HTMLSpanElement;
  private blueText:HTMLSpanElement;

  constructor() {
    const redTextTmp = document.querySelector<HTMLSpanElement>(".redText");
    if(redTextTmp === null) {
      throw Error("TurnText Error: 赤ターンのSpanエレメントを設置してください");
    } else {
      this.redText = redTextTmp;
    }
    
    const blueTextTmp = document.querySelector<HTMLSpanElement>(".blueText");
    if(blueTextTmp === null) {
      throw Error("TurnText Error: 青ターンのSpanエレメントを設置してください");
    } else {
      this.blueText = blueTextTmp;
    }
  }

  public toggleViewTurnText(turnPlayer:Player) {
    if(turnPlayer === Player.Red) {
      this.redText.style.opacity = "1";
      this.blueText.style.opacity = "0";
    } else {
      this.redText.style.opacity = "0";
      this.blueText.style.opacity = "1";
    }
  }

}