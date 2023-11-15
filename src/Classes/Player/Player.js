export default class Player{
    constructor(x, y, width, height, ctx){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ctx = ctx;

        this.playerSpeed = 5;

        addEventListener("keydown", (key) => {
            this.move(key);
        });
        
    }

    create(){
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(){
        this.ctx.clearRect(0, 0, 500, 600);
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move(key){
        if (key.code == "ArrowRight") this.x += this.playerSpeed;
        if (key.code == "ArrowLeft") this.x -= this.playerSpeed;
    }
}