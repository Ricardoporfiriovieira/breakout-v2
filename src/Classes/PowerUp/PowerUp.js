class PowerUp {
    constructor() {
        this.active = false;
        this.timer;
    }

    activatePaddlePowerUp(paddle) {
        this.active = true;
        paddle.width += 20;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.deactivatePaddlePowerUp(paddle);
        }, 5000);
    }

    deactivatePaddlePowerUp(paddle) {
        this.active = false;
        paddle.width = 75;
    }
}

export default PowerUp;