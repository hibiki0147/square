"use strict";

let buttons:Array<HTMLButtonElement> = [];
let boardDatas:Array<Player> = [];
let boardRecord:Array<Array<Player>> = [];
let redText:HTMLSpanElement | null;
let blueText:HTMLSpanElement | null;
let nowRecordIndex = 0;

enum Player {
  None,
  Red,
  Blue
};

let nowPlayer:Player = Player.Red;

window.addEventListener("load", () => {
  const btnElements = document.querySelectorAll<HTMLButtonElement>(".mass button");
  for(const elem of btnElements) {
    buttons.push(elem);
  }
  buttons.sort((a, b) => { 
    if(a.dataset.id != undefined && b.dataset.id != undefined) {
      return Number(a.dataset.id) - Number(b.dataset.id);
    } else {
      return 0;
    }
  });
  
  redText = document.querySelector<HTMLElement>(".redText");
  blueText = document.querySelector<HTMLElement>(".blueText");
  toggleTurnText();
  

  document.querySelector<HTMLElement>(".redo")?.addEventListener("click", () => { redo(); });
  document.querySelector<HTMLElement>(".undo")?.addEventListener("click", () => { undo(); });
  
  buttons.forEach(b => {
    boardDatas.push(Player.None);
    b.addEventListener("click", () => {
      if(b.dataset.id != undefined) {
        const index = Number(b.dataset.id);
        if(boardDatas[index] === Player.None) {
          let color:string = nowPlayer === Player.Red ? "red" : "blue";
          b.style.background = color;
          b.style.borderColor = color;
          console.log(b.dataset.id);
          
          boardDatas[index] = nowPlayer;
          pushRecord();
          
          console.log("Click");
          check();
          nowPlayer = nowPlayer === Player.Red ? Player.Blue : Player.Red;
          toggleTurnText();
        } else {
          console.log(boardDatas.length);
          console.log(boardDatas[index]);
        }
      }
    });
  });
  pushRecord();
  
  const shape:Shape = new Shape(shapeDataList[1]);
  const data = shape.shiftRight(3)?.shiftBottom(1)?.data;
  if(data != null) {
    for(const index of data) {
      buttons[index].style.background = "red";
    }
  } else {
    console.log("null");
  }
  // testViewOneShape(0, 0, 0, buttons);
});




function toggleTurnText():void {
  if(nowPlayer === Player.Red) {
    if(redText != null && blueText != null) {
      redText.style.opacity = "1";
      blueText.style.opacity = "0";
    }
  } else {
    if(redText != null && blueText != null) {
      redText.style.opacity = "0";
      blueText.style.opacity = "1";
    }
  }
}


function pushRecord() {
  boardRecord = boardRecord.slice(0, nowRecordIndex + 1);
  console.log(nowRecordIndex);
  boardRecord.push([...boardDatas]);
  nowRecordIndex = boardRecord.length - 1;
  console.log(boardRecord);
}



function undo() {
  if(nowRecordIndex > 0) {
    nowRecordIndex--;
    reRecord();
    nowPlayer = nowPlayer === Player.Red ? Player.Blue : Player.Red;
    toggleTurnText();
  }
  console.log(nowRecordIndex);
}

function redo() {
  if(nowRecordIndex < boardRecord.length - 1) {
    nowRecordIndex++;
    reRecord();
    nowPlayer = nowPlayer === Player.Red ? Player.Blue : Player.Red;
    toggleTurnText();
  }
  console.log(nowRecordIndex);
}

function reRecord() {
  if(nowRecordIndex >= 0 && nowRecordIndex < boardRecord.length) {
    boardDatas = [...boardRecord[nowRecordIndex]];
    reColorButtons();
  }
}

function reColorButtons() {
  for(let i = 0; i < boardDatas.length; i++) {
    let color = "black";
    if(boardDatas[i] === Player.Red) {
      color = "red";
    } else if(boardDatas[i] === Player.Blue) {
      color = "blue";
    }
    buttons[i].style.background = color;
    buttons[i].style.borderColor = color;
  }
}




let intervalID = 0;
function testCheckOneShape(index:number, buttons:NodeListOf<HTMLButtonElement>) {
  if(index >= 0 && index < shapeDataList.length) {
    const shape:Shape = new Shape(shapeDataList[index]);
    let shiftRight = 0;
    let shiftBottom = 0;
    let isLoop: boolean = true;
    intervalID = setInterval(() => {
      let newShape = shape.shiftRight(shiftRight);
      if(newShape === null) {
        shiftRight = 0;
        shiftBottom++;
      } else {
        shiftRight++;
        newShape = newShape.shiftBottom(shiftBottom);
        if(newShape === null) {
          clearInterval(intervalID);
          return false;
        } else {
          // ... 
          for(const button of Array.from(buttons)) {
            button.style.background = "#f0f0f0";
          }
          for(const index of newShape.data) {
            buttons[index].style.background = "red";
          }
        }
      }
    }, 500);
    // while(isLoop) {
      
    // }
  }
}
function testViewOneShape(index:number, right, bottom, buttons:NodeListOf<HTMLButtonElement>) {
  if(index >= 0 && index < shapeDataList.length) {
    const shape:Shape = new Shape(shapeDataList[index]);
    const data = shape.shiftRight(right)?.shiftBottom(bottom)?.data;
    if(data != null) {
      for(const index of data) {
        buttons[index].style.background = "red";
      }
    } else {
      console.log("null");
    }
  }
}


function check() {
  // let i = 0;
  for(const data of shapeDataList) {
    // console.log("-----------------");
    // console.log(data);
    const shape:Shape = new Shape(data);
    let shiftRight = 0;
    let shiftBottom = 0;
    while(true) {
      let newShape = shape.shiftRight(shiftRight);
      if(newShape === null) {
        shiftRight = 0;
        shiftBottom++;
      } else {
        shiftRight++;
        newShape = newShape.shiftBottom(shiftBottom);
        if(newShape === null) {
          break;
        } else {
          let rOrb:Player = Player.None;
          let isOk = true;
          for(const index of newShape.data) {
            const boardData:Player = boardDatas[index];
            if(boardData === Player.None || 
              (rOrb !== 0 && boardData !== rOrb)) {
              isOk = false;
              break;
            }
            if(boardData !== Player.None as Player && rOrb === Player.None) {
              rOrb = boardDatas[index];
            }
          }
          if(isOk && rOrb !== 0) {
            // UI描画を先にするためsetTimeout
            setTimeout(() => { alert(rOrb + "の勝ち"); }, 1);
            // console.log(newShape.data);
            return;
          } else {
            // console.log(newShape.data);
          }
        }
      }
    }
    // console.log("-----------------");
    // i++;
  }
}


class Shape {
  public data:Array<number>;
  public maxWidth = 3;
  public maxLength = 3;
  public oneLine = 9;
  
  constructor(data?:Array<number>) {
    if(data != undefined) {
      this.data = data;
    }
  }
  
  public shiftRight(multiple:number) {
    const newData:Array<number> = [...this.data];
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
      newData[i] += plus;
    }
    return new Shape(newData);
  }

  public shiftBottom(multiple:number) {
    const newData:Array<number> = [...this.data];
    for(let i = 0; i < newData.length; i++) {
      let plus:number = 10 * multiple;
      newData[i] += plus;
      if(newData[i] > 32) {
        return null;
      }
    }
    return new Shape(newData);
  }

}


const shapeDataList:Array<Array<number>> = [
  [0, 1, 2], // 横                                  0
  [3, 13, 23], // 縦                                1
  [8, 16, 24], // 斜め                              2
  [0, 3, 5, 10], // 正方形 1*1                      3
  [0, 1, 3, 7, 13, 17, 20, 21], // 正方形 2*2       4
  [0, 1, 3, 7, 10, 11], // 長方形（横）1*2          5
  [0, 3, 5, 13, 15, 20], // 長方形（縦）2*1         6
  [0, 1, 3, 6, 10], // 台形１（横）1-2              7
  [1, 4, 7, 10, 11], // 台形１（横反転）1-2         8           
  [4, 5, 13, 15, 20], // 台形１（縦）2-1            9        
  [0, 3, 5, 13, 14], // 台形１（縦下向き）2-1       10           
  [1, 4, 6, 13, 14], // 台形２ 2-1                 11
  [6, 7, 14, 16, 20], // 台形２（反転）2-1          12             
  [1, 4, 6, 10], // ひし形 1*1                     13
  [2, 6, 8, 14, 16, 20], // ひし形 2*1             14        
  [1, 2, 4, 8, 10, 11], // ひし形 1*2              15       
]






