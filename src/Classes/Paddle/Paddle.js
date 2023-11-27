class Paddle {
    constructor(canvas, width = 75) {
        this.canvas = canvas;
        this.width = width;
        this.height = 10;
        this.x = (canvas.width - this.width) / 2;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.canvas.height - this.height, this.width, this.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}

export default Paddle;