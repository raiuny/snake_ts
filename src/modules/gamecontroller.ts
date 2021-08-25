import Snake from "./snake";
import Food from "./food";
import ScorePanel from "./score-panel";
class GameController {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  direction = "";
  gameover: boolean = false;
  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.init();
  }

  init() {
    // 绑定键盘按下的事件
    document.addEventListener("keydown", this.keydownHandler.bind(this));
    this.run();
  }
  // 创建按键的响应函数；
  keydownHandler(event: KeyboardEvent) {
    this.direction = event.key;
  }
  //移动方法
  run() {
    //根据this.direction 来改变蛇的位置
    let x = this.snake.X;
    let y = this.snake.Y;
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        x -= 10;
        break;
      case "ArrowRight":
      case "Right":
        x += 10;
        break;
      default:
        break;
    }
    if (this.checkEat(x, y)) {
      this.food.change();
      this.scorePanel.addScore();
      this.snake.addBody();
      console.log(this.snake.bodyEl.length);
    }
    //更新坐标
    try {
      this.snake.X = x;
      this.snake.Y = y;
    } catch (e) {
      alert(e.message);
      this.gameover = true;
    }
    !this.gameover &&
      setTimeout(this.run.bind(this), 300 - 20 * (this.scorePanel.level - 1));
  }

  checkEat(x: number, y: number): boolean {
    if (x === this.food.X && y === this.food.Y) return true;
    else return false;
  }
}

export default GameController;
