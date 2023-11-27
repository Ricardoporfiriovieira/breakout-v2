class Ball {
    constructor(canvas, radius = 10) {
        this.canvas = canvas;
        this.radius = radius;
        this.x = canvas.width / 2;
        this.y = canvas.height - 30;
        this.speed = 2;
        this.dx = this.speed;
        this.dy = this.speed * - 1;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}

export default Ball;