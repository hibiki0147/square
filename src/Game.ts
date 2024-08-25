import { Player } from "./Player";
import { GameStatus } from "./GameStatus";
import { GameResult } from "./GameResult";

class Game {
  private turnPlayer:Player;
  private gameStatus:GameStatus;
  private gameResult:GameResult | null;

  constructor() {
    this.turnPlayer = Player.Red;
    this.gameStatus = GameStatus.Progress;
    this.gameResult = null;
  }
  
}