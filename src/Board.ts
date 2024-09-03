import { BoardLogs } from "./BoardLogs";
import { LineStatus } from "./LineStatus";
import { VictoryPattern } from "./VictoryPattern";

export class Board {
  private boardDatas:Array<LineStatus> = [];
  private boardLogs:BoardLogs;
  private victoryPattern:VictoryPattern;

  constructor(boardLineSum:number) {
    for(let i = 0; i < boardLineSum; i++) {
      this.boardDatas.push(LineStatus.None);
    }
    this.boardLogs = new BoardLogs();
    this.victoryPattern = new VictoryPattern();
  }
  
}