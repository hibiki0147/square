import { GameResult } from "./GameResult";
import { LineStatus } from "./LineStatus";

export class VictoryPattern {
  
  /**
   * 勝敗をチェックする
   * 
   * @returns GameResult | null 対戦結果か継続の場合、null
   */
  public check_20240826(boardDatas:Array<LineStatus>):GameResult | null{
    for(const data of this.shapeDataList) {
      let shiftRight = 0;
      let shiftBottom = 0;
      let checkData:Array<number> | null = [...data];
      while(true) {
        let gameResult = this.check_thisShape(boardDatas, checkData);
        if(gameResult !== null) { // 戻り値チェック
          return gameResult;
        } else {
          shiftRight += 1;
          checkData = this.shiftRight(shiftRight, data);
          if(checkData === null) {
            shiftRight = 0;
            shiftBottom += 1;
            checkData = this.shiftBottom(shiftBottom, data);
            if(checkData === null) {
              break;
            }
          }
        }
      }
    }
    return null;
  }


  /**
   * 勝利できる条件の１つ形から、盤面を調べる
   * 
   * @param boardDatas 現在のボードの状態
   * @param shape チェックする形
   * @returns GameResult | null （赤の勝ち、青の勝ち、継続）
   */
  private check_thisShape(
    boardDatas:Array<LineStatus>, 
    shape:Array<number>
  ):GameResult | null {
    let targetPlayer:LineStatus = LineStatus.None;
    let isOk = true;
    for(const index of shape) {
      const boardData:LineStatus = boardDatas[index];
      if(boardData === LineStatus.None || 
        (targetPlayer !== LineStatus.None && boardData !== targetPlayer)) {
        isOk = false;
        break;
      }
      if(targetPlayer === LineStatus.None) {
        targetPlayer = boardDatas[index];
      }
    }
    if(isOk && targetPlayer !== LineStatus.None) {
      // UI描画を先にするためsetTimeout
      // setTimeout(() => { alert(targetPlayer + "の勝ち"); }, 1);
      if(targetPlayer === LineStatus.Red) {
        return GameResult.RedWin;
      } else {
        return GameResult.BlueWin;
      }
    } else {
      return null;
    }
  }

  public check(boardDatas:Array<LineStatus>) {
    for(const data of this.shapeDataList) {
      let shiftRight = 0;
      let shiftBottom = 0;
      while(true) {
        let newShape = this.shiftRight(shiftRight, data);
        if(newShape === null) {
          shiftRight = 0;
          shiftBottom++;
        } else {
          shiftRight++;
          newShape = this.shiftBottom(shiftBottom, data);
          if(newShape === null) {
            break;
          } else {
            let rOrb:LineStatus = LineStatus.None;
            let isOk = true;
            for(const index of newShape) {
              const boardData:LineStatus = boardDatas[index];
              if(boardData === LineStatus.None || 
                (rOrb !== 0 && boardData !== rOrb)) {
                isOk = false;
                break;
              }
              if(
                boardData !== LineStatus.None as LineStatus && 
                rOrb === LineStatus.None as LineStatus
              ) {
                rOrb = boardDatas[index];
              }
            }
            if(isOk && rOrb !== 0) {
              // UI描画を先にするためsetTimeout
              setTimeout(() => { alert(rOrb + "の勝ち"); }, 1);
              return;
            } else {
              // console.log(newShape.data);
            }
          }
        }
      }
    }
  }

  /**
   * 右へ移動
   * 
   * @param multiple いくつ右へ移動するか
   * @param data 移動させるデータ
   * @returns Array<number> | null 
   */
  private shiftRight(
    multiple:number, data:Array<number>
  ):Array<number> | null {
    const newData:Array<number> = [...data];
    for(let i = 0; i < newData.length; i++) {
      let newPosition = 0;
      let plus:number;
      if(newData[i] % 10 < 3) {
        plus = 1 * multiple;
        newPosition = newData[i] + plus;
        if(newPosition % 10 >= 3) {
          return null;
        }
      } else {
        plus = 2 * multiple;
        newPosition = newData[i] + plus;
        if(newPosition % 10 <= 2) {
          return null;
        }
      }
      newData[i] = newPosition;
    }
    return newData;
  }

  /**
   * 下へ移動
   * 
   * @param multiple いくつ下へ移動するか
   * @param data 移動させるデータ
   * @returns Array<number> | null
   */
  private shiftBottom(
    multiple:number, data:Array<number>
  ):Array<number> | null {
    const newData:Array<number> = [...data];
    for(let i = 0; i < newData.length; i++) {
      let plus:number = 10 * multiple;
      newData[i] += plus;
      if(newData[i] > 32) {
        return null;
      }
    }
    return newData;
  }

  private shapeDataList:Array<Array<number>> = [
    [0, 1, 2], // 横                                  0
    [3, 13, 23], // 縦                                1
    [8, 16, 24], // 斜め                              2
    [0, 3, 5, 10], // 正方形 1*1                      3
    [0, 1, 3, 7, 13, 17, 20, 21], // 正方形 2*2       4
    [0, 1, 3, 7, 10, 11], // 長方形（横）1*2           5
    [0, 3, 5, 13, 15, 20], // 長方形（縦）2*1          6
    [0, 1, 3, 6, 10], // 台形１（横）1-2               7
    [1, 4, 7, 10, 11], // 台形１（横反転）1-2          8
    [4, 5, 13, 15, 20], // 台形１（縦）2-1            9
    [0, 3, 5, 13, 14], // 台形１（縦下向き）2-1       10
    [1, 4, 6, 13, 14], // 台形２ 2-1                 11
    [6, 7, 14, 16, 20], // 台形２（反転）2-1          12
    [1, 4, 6, 10], // ひし形 1*1                     13
    [2, 6, 8, 14, 16, 20], // ひし形 2*1             14
    [1, 2, 4, 8, 10, 11], // ひし形 1*2              15
  ]
}