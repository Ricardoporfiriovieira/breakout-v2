class RotatingBlock {
    constructor(canvas, width, height, rotationSpeed) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.x = canvas.width / 2 + 100;
        this.y = canvas.height / 2 - 50;
        this.angle = 0;
        this.rotationSpeed = rotationSpeed;
        this.status = 1;
    }

    draw(ctx) {
        if (this.status == 1) {
            ctx.save();
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            ctx.rotate(this.angle);
            ctx.fillStyle = "green";
            ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        }
    }
}

export default RotatingBlock;