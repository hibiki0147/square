import { Player } from "./Player";
import { GameStatus } from "./GameStatus";
import { GameResult } from "./GameResult";
import { Board } from "./Board";
    
class Game {
  private turnPlayer:Player;
  private gameStatus:GameStatus;
  private gameResult:GameResult | null;
  private board:Board;

  constructor() {
    this.turnPlayer = Player.Red;
    this.gameStatus = GameStatus.Progress;
    this.gameResult = null;
    this.board = new Board(33); // 33は現在は決め打ち
  }
  
}