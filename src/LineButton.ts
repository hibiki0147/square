import { LineStatus } from "./LineStatus";

export class LineButton {
  private button!: HTMLButtonElement;

  constructor(
    query:string,
    listener: (element: HTMLButtonElement, ev: MouseEvent) => void
  ) {
    console.log(query + ":Button初期化" + document.readyState);
    switch(document.readyState) {
      case "loading":
        // 「DOMContentLoaded」ではたまにイベントの追加が間に合わない
        window.addEventListener("DOMContentLoaded", () => {
          this.init(query, listener);
          console.log("イベント追加");
        });
        break;
      case "interactive":
      case "complete":
        this.init(query, listener);
        console.log("イベント追加");
        break;
    }
  }

  private init(
    query:string,
    listener: (element: HTMLButtonElement, ev: MouseEvent) => void
  ) {
    const buttonTmp = document.querySelector<HTMLButtonElement>(query);
    if(buttonTmp === null) {
      throw Error("Button Error:ボタンが見つかりませんでした");
    } else {
      this.button = buttonTmp;
      this.button.addEventListener(
        "click", 
        (ev:MouseEvent) => { 
          listener(buttonTmp, ev);
          console.log(query + ":クリック"); 
        }
      );
    }
  }

  public changeButtonColor(lineStatus:LineStatus) {
    let color = ""
    switch(lineStatus) {
      case LineStatus.Red:
        color = "Red";
        break;
      case LineStatus.Blue:
        color = "Blue";
        break;
      case LineStatus.None:
        color = "Black";
        break;
    }
    this.button.style.backgroundColor = color;
    this.button.style.borderColor = color;
  }

}