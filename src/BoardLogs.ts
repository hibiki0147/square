import { LineStatus } from "./LineStatus";

export class BoardLogs {
  private boardLogDatas:Array<Array<LineStatus>> = [];
  private nowLogsIndex:number; 

  constructor(initBoardDatas:Array<LineStatus>) {
    this.nowLogsIndex = 0;
    this.push(initBoardDatas);
    console.log(this.boardLogDatas);
  }

  public push(boardDatas:Array<LineStatus>):void {
    this.boardLogDatas = this.boardLogDatas.slice(0, this.nowLogsIndex + 1);
    this.boardLogDatas.push([...boardDatas]);
    this.nowLogsIndex = this.boardLogDatas.length - 1;
  }

  public undo():Array<LineStatus> | null {
    if(this.nowLogsIndex > 0) {
      this.nowLogsIndex--;
      return [...this.boardLogDatas[this.nowLogsIndex]];
    } else {
      return null;
    }
  }

  public redo():Array<LineStatus> | null {
    if(this.nowLogsIndex + 1 < this.boardLogDatas.length) {
      this.nowLogsIndex++;
      return [...this.boardLogDatas[this.nowLogsIndex]];
    } else {
      return null;
    }
  }

  public getNowBoardData():Array<LineStatus> | null {
    if(this.nowLogsIndex >= 0 && this.nowLogsIndex < this.boardLogDatas.length) {
      return [...this.boardLogDatas[this.nowLogsIndex]];
    } else {
      return null;
    }
  }

  public reset() {
    this.boardLogDatas = [];
    this.nowLogsIndex = 0;
  }
}