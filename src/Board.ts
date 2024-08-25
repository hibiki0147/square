import { BoardLogs } from "./BoardLogs";
import { LineStatus } from "./LineStatus";

export class Board {
  private boardDatas:Array<LineStatus> = [];
  private boardLogs:BoardLogs;

  constructor(boardLineSum:number) {
    for(let i = 0; i < boardLineSum; i++) {
      this.boardDatas.push(LineStatus.None);
    }
    this.boardLogs = new BoardLogs();
  }

}