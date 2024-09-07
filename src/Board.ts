import { BoardLogs } from "./BoardLogs";
import { GameResult } from "./GameResult";
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
    this.boardLogs = new BoardLogs(this.boardDatas);
    this.victoryPattern = new VictoryPattern();
  }

  public changeLineStatus(index:number, lineStatus:LineStatus):GameResult | null {
    if(index >= 0 && index < this.boardDatas.length) {
      this.boardDatas[index] = lineStatus;
      this.boardLogs.push(this.boardDatas);
      return this.victoryPattern.check(this.boardDatas);
    } else {
      throw Error(`Board Error:IndexOutOfBoundsExceptionです. index=[${index}]`);
    }
  }

  public undo():boolean {
    const result:Array<LineStatus> | null = this.boardLogs.undo();
    if(result != null) {
      this.boardDatas = result;
      return true;
    } else {
      return false;
    }
  }

  public redo():boolean {
    const result:Array<LineStatus> | null = this.boardLogs.redo();
    if(result != null) {
      this.boardDatas = result;
      return true;
    } else {
      return false;
    }
  }

  public reset() {
    for(let i = 0; i < this.boardDatas.length; i++) {
      this.boardDatas[i] = LineStatus.None;
    }
    this.boardLogs.reset();
  }

  public isChangeableLine(index:number):boolean {
    if(index >= 0 && index < this.boardDatas.length) {
      return this.boardDatas[index] === LineStatus.None;
    } else {
      throw Error(`Board Error:IndexOutOfBoundsExceptionです. index=[${index}]`);
    }
  }

  
  public getBoardDatas():Array<LineStatus> {
    return this.boardDatas;
  }

}