
class ScorePanel {
    score = 0;
    level = 1;
    scoreEl: HTMLElement;
    levelEl: HTMLElement;
    maxLevel: number;
    upScore: number;
    constructor(maxLevel: number = 10, upScore: number = 2) {
        this.scoreEl = document.getElementById("score")!;
        this.levelEl = document.getElementById("level")!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }
    //加分的方法
    addScore() {
        this.scoreEl.innerHTML = ++this.score + '';
        if(this.score % this.upScore === 0) {
            this.levelUp();
        }
    }

    levelUp() {
        if(this.level < this.maxLevel)
        this.levelEl.innerHTML = String(++this.level);
    }
}
export  default ScorePanel;