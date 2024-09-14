export class Button {
  private button:HTMLButtonElement | undefined;

  constructor(
    query:string,
    listener: (element: HTMLButtonElement, ev: MouseEvent) => void
  ) {
    console.log(query + ":Button初期化" + document.readyState);
    switch(document.readyState) {
      case "loading":
      case "interactive":
        window.addEventListener("DOMContentLoaded", () => {
          this.init(query, listener);
        });
        break;
      case "complete":
        this.init(query, listener);
        break;
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


}