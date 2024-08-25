import { Board } from "./Board";

class Game {
  private turnPlayer:number = 1;
  private board:Board;
  constructor() {
    this.board = new Board(33); // 33は現在は決め打ち
  }
}