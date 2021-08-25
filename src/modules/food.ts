class Food {
    element: HTMLElement;
    constructor(){
        this.element = document.getElementById('food')!;
        //!表示这东西一定存在，不用你来管
    }
    //定义获取食物坐标的方法
    get X() {
        return this.element.offsetLeft;
    }
    get Y() {
        return this.element.offsetTop;
    }
    //修改食物位置的方法,食物x坐标在0到290且必须是整十
    change() {
        let x_new = Math.round(Math.random()*29)*10;
        let y_new = Math.round(Math.random()*29)*10;
        this.element.style.left = x_new + "px";
        this.element.style.top = y_new + "px";
    }
}

export default Food;