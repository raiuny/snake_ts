class Snake {
  headEl: HTMLElement;
  bodyEl: HTMLCollection; //蛇身 包括蛇头
  snakeEl: HTMLElement;
  constructor() {
    this.snakeEl = document.getElementById("snake")!;
    this.headEl = document.querySelector("#snake > div") as HTMLElement;
    this.bodyEl = document.getElementById("snake")!.getElementsByTagName("div");
  }
  get X() {
    return this.headEl.offsetLeft;
  }
  get Y() {
    return this.headEl.offsetTop;
  }
  set X(x: number) {
    if (this.X === x) return;
    if (x < 0 || x > 290) throw new Error("蛇撞墙了, Game Over");
    if(this.bodyEl[1] && (this.bodyEl[1] as HTMLElement).offsetLeft === x) //说明调头了
    {
        if(this.X > x) x = this.X + 10;
        else x = this.X - 10;
        // 修正方向
    }
    this.moveBody();
    this.headEl.style.left = x + "px";
    this.checkHeadtoBody();
  }
  set Y(y: number) {
    if (this.Y === y) return;
    if (y < 0 || y > 290) throw new Error("蛇撞墙了, Game Over");

    if(this.bodyEl[1] && (this.bodyEl[1] as HTMLElement).offsetTop === y) //说明调头了
    {
        if(this.Y > y) y = this.Y + 10;
        else y = this.Y - 10;
        // 修正方向
    }
    this.moveBody();
    this.headEl.style.top = y + "px";
    this.checkHeadtoBody();
  }
  addBody() {
    this.snakeEl.insertAdjacentHTML("beforeend", "<div></div>");
  }
  moveBody() {
    //将后面的div位置设为前面的div的位置
    for (let i = this.bodyEl.length - 1; i > 0; i--) {
      let x = (this.bodyEl[i - 1] as HTMLElement).offsetLeft;
      let y = (this.bodyEl[i - 1] as HTMLElement).offsetTop;
      (this.bodyEl[i] as HTMLElement).style.left = x + "px";
      (this.bodyEl[i] as HTMLElement).style.top = y + "px";
    }
  }
  checkHeadtoBody() {
      for(let i = 1; i < this.bodyEl.length; i++) {
          let bd = this.bodyEl[i] as HTMLElement;
          if(this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
            throw new Error('蛇咬了自己, Game Over');
          }
      }
  }
}
export default Snake;
