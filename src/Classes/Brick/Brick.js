class Brick {
    constructor(x, y, width, height, powerUp = false) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.status = 1;
        this.powerUp = powerUp;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}

export default Brick;