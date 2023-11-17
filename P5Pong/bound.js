class bound{
    constructor(x, y, w, h){
        this.x = x;    
        this.y = y;
        this.w = w;
        this.h = h;
    }

    show(a){
        push();
        noFill(); stroke(256, a); strokeWeight(1);
        rect(this.x, this.y, this.w, this.h);
        pop();
    }
}