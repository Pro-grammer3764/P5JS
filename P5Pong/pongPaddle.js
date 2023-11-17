class pongPaddle{
    constructor(bound, paddleW, paddleH, padding, LR, a){
        if(LR == 0) {
            //left
            this.x = bound.x + padding;
        }else if(LR == 1) {
            //right
            this.x = (bound.x + bound.w) - (paddleW + padding);
        }
        this.a = a;
        this.col = color(256, 256, 256, a);
        this.bound = bound;
        this.y = (bound.y + bound.h) / 2;
        this.w = paddleW;
        this.h = paddleH;
        this.y -= this.h/2;
        this.vel = 0;
        this.normalPos = createVector(0, 0); //x pos is constant, defualt 0
        this.accuracy = 1;
        this.showText = false;
    }

    update(){
        this.y += this.vel;
        this.vel = lerp(this.vel, 0, 1/3);
        this.col = color(256 * this.accuracy, 256 * (1 - this.accuracy), 0, this.a);

        if(this.y < this.bound.y){
            this.y = this.bound.y; //nudge
        }
        if(this.y > this.bound.y + this.bound.h - this.h){
            this.y = this.bound.y + this.bound.h  - this.h; //nudge
        }

        //update normalized position
        this.normalPos.y = map(this.y, this.bound.y, (this.bound.y + this.bound.h) - this.h, 0, 1);
    }

    show(){
        push();
            fill(this.col); noStroke();
            translate(this.x, this.y);
            rect(0, 0, this.w, this.h, 2, 2, 2, 2);
            fill(0); rotate(90); textSize(this.w);
            if(this.showText){
                text(nf(this.normalPos.y, 0, 5), 0, -1);
            }
        pop();
    }
}