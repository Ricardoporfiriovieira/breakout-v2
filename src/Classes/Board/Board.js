export default class Board {
    constructor(width, height, element){
        this.width = width;
        this.height = height;
        this.element = element;
    }

    create(){
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
    }
}