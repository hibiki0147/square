export class Button {
  private button:HTMLButtonElement | undefined;

  constructor(
    query:string,
    listener: (element: HTMLButtonElement, ev: MouseEvent) => void
  ) {
    console.log(query + ":Button初期化" + document.readyState);
    switch(document.readyState) {
      case "loading":
        window.addEventListener("DOMContentLoaded", () => {
          this.init(query, listener);
        });
        break;
      case "interactive":
      case "complete":
        this.init(query, listener);
        break;
      default:
        throw Error("Button Error:UIの初期化に失敗しました");
    }
  }

  private init(
    query:string,
    listener: (element: HTMLButtonElement, ev: MouseEvent) => void
  ) {
    const buttonTmp = document.querySelector<HTMLButtonElement>(query);
    console.log(buttonTmp);
    if(buttonTmp === null) {
      throw Error("Button Error:ボタンが見つかりませんでした");
    } else {
      this.button = buttonTmp;
      this.button.addEventListener(
        "click", 
        (ev:MouseEvent) => { 
          listener(buttonTmp, ev);
        }
      );
    }
  }

  public setEnable(value:boolean) {
    if(this.button !== undefined) {
      this.button.disabled = !value;
    } else {
      throw Error("Button Error:ボタンが初期化されていない状態です");
    }
  }

  public getEnable():boolean {
    if(this.button !== undefined) {
      return !this.button.disabled;
    } else {
      throw Error("Button Error:ボタンが初期化されていない状態です");
    }
  }

}