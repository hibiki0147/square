import { Player } from "./Player";
import { Button } from "./Button";
import { TurnText } from "./TurnText";
import { LineStatus } from "./LineStatus";
import { LineButton } from "./LineButton";

export class GameUI {
  private undoButton:Button;
  private redoButton:Button;
  
  // private resetButton:Button;
  // private homeButton:Button;

  private lineButtons:Array<LineButton> = [];

  private turnText:TurnText;

  constructor(
    undoEvent: (element: HTMLButtonElement, ev: MouseEvent) => void,
    redoEvent: (element: HTMLButtonElement, ev: MouseEvent) => void,
    resetEvent: (element: HTMLButtonElement, ev: MouseEvent) => void,
    homeEvent: (element: HTMLButtonElement, ev: MouseEvent) => void,
    lineEvent: (element: HTMLButtonElement, ev: MouseEvent) => void
  ) {
    this.undoButton = new Button(".undo",undoEvent);
    this.redoButton = new Button(".redo", redoEvent);
    
    // this.resetButton = new Button(".reset",resetEvent);
    // this.homeButton = new Button(".home", homeEvent);

    for(let i = 0; i < 33; i++) {
      this.lineButtons.push(
        new LineButton(`button[data-id="${i}"]`, lineEvent)
      );
    }

    this.turnText = new TurnText();
  }

  public changeLineButtonColor(index:number, lineStatus:LineStatus) {
    if(index >= 0 && index < this.lineButtons.length) {
      this.lineButtons[index].changeButtonColor(lineStatus);
    } else {
      throw Error(`GameUI Error:IndexOutOfBoundsExceptionです. index=[${index}]`);
    }
  }

  public changeLineButtonsColor(boardDatas:Array<LineStatus>) {
    if(this.lineButtons.length === boardDatas.length) {
      for(let i = 0; i < this.lineButtons.length; i++) {
        this.lineButtons[i].changeButtonColor(boardDatas[i]);
      }
    } else {
      throw Error(`GameUI Error:線と盤面データの数が合いません line=[${this.lineButtons.length}] boardDatas=[${boardDatas.length}]`);
    }
  }

  public toggleViewTurnText(turnPlayer:Player) {
    this.turnText.toggleViewTurnText(turnPlayer);
  }

  

}