class ball{
    constructor(bound, ballSize, a){
        this.radius = ballSize;
        this.bound = bound;
        this.a = min(a * 4, 256);
        this.col = color(256, 256, 256, this.a);
        this.speed = ballSize / 2;
        this.speed = 1;
        this.debug = true;
        this.normalPos = createVector(0, 0);
        this.normalVel = createVector(0, 0);
        this.reset();
    }

    reset(){
        this.x = this.bound.x + this.bound.w/2;
        this.y = this.bound.y + this.bound.h/2;
        this.vel = createVector(1, 0);
        this.vel.rotate(random(-60,60));
        if(random() > 0.5) {this.vel.reflect(createVector(1,0))}
        this.vel.setMag(this.speed);
        this.vel.x = abs(this.vel.x);
    }

    show(){
        push();
            translate(this.x, this.y);
            fill(this.col); noStroke();
            circle(0, 0, this.radius);

            if(this.debug){  
                textSize(5);
                textAlign(CENTER, CENTER);
                fill(256, 100);
                let s = '(' + nf(this.normalPos.x, 1, 2) + ', ' + nf(this.normalPos.y, 1, 2) + ')';
                text(s, 0, -this.radius - 2)
                s = ' (' + nf(this.normalVel.x, 1, 5) + ', ' + nf(this.normalVel.y, 1, 5) + ')';
                text(s, 0, -this.radius - 10)

                stroke(this.col); strokeWeight(1);
                //line(0, 0, 0, -this.radius*2); //upwards line
                //line(0, 0, 0, this.radius*2); //downwards line
                line(this.bound.x - this.x, 0, this.bound.x + this.bound.w - this.x, 0);
                rotate(this.vel.heading() - 90);
                line(0, 0, 0, this.radius*2); //ball direction
            }
        pop();
    }

    update(){
        this.x += this.vel.x;
        this.y += this.vel.y;

        //update normalized position and heading
        this.normalPos.x = map(this.x, this.bound.x, this.bound.x + this.bound.w, 0, 1);
        this.normalPos.y = map(this.y, this.bound.y, this.bound.y + this.bound.h, 0, 1);
        this.normalVel = this.vel.copy();
        this.normalVel.normalize();
    }
    
    checkCollisions(left, right){
        //top and bottom wall collision
        if(this.y < this.bound.y + this.radius/2){
            if(abs(this.vel.angleBetween(createVector(0,-1))) < 15){
                //if the ball is bouncing  at an angle less than 15° increase angle
                this.vel.x *= random(2, 3);
                this.vel.setMag(this.speed);
            }
            this.vel.reflect(createVector(0,1));
            this.y = this.bound.y + this.radius/2; //nudge
        }else if(this.y > this.bound.y + this.bound.h - this.radius/2){
            if(abs(this.vel.angleBetween(createVector(0,1))) < 15){
                //if the ball is bouncing  at an angle less than 15° increase angle
                this.vel.x *= random(2, 3);
                this.vel.setMag(this.speed);
            }
            this.vel.reflect(createVector(0,1));
            this.y = this.bound.y + this.bound.h - this.radius/2; //nudge
        }
        
        //left paddle collision
        if(this.y > left.y && this.y < (left.y + left.h)){
            if(this.x < left.x + left.w + this.radius/2){
                this.vel.reflect(createVector(1, random(0, 0.25)));
                this.x = left.x + left.w + this.radius/2; //nudge
                return 'continue';
            }
        }
        
        //right paddle collision
        if (this.y > right.y && this.y < (right.y + right.h)){
            if(this.x > right.x - this.radius/2){
                this.vel.reflect(createVector(1, random(0, 0.25)));
                this.x = right.x - this.radius/2; //nudge
                return 'continue';
            }
        }
        
        //left and right wall collision
        if(this.x < this.bound.x + this.radius/2){
            //left wall
            this.reset();
            return 'right score';
        }else if(this.x > this.bound.x + this.bound.w - this.radius/2){
            //right wall
            this.reset();
            return 'left score';
        }
        
        left.accuracy = pow(1 - min(abs(((left.y + (left.h/2)) - this.y) / (left.h/2)), 1), 2);
        //left.accuracy = accuracyWeight(this.bound, left.accuracy, this.x);

        right.accuracy = pow(1 - min(abs(((right.y + (right.h/2)) - this.y) / (right.h/2)), 1), 2);
        //right.accuracy = accuracyWeight(this.bound, right.accuracy, this.x);

        return 'continue';
    }
}

let r1 = 3;
let r2 = 1.5;
function accuracyWeight(bound, accuracy, ballX){
    let m = ((r1 * r2) / ((bound.w * r2) - (bound.w * r1)));
    let w = (m * (ballX - (bound.x + (bound.w/r1)))) + 1

    return (accuracy * max(min(w, 1), 0));
}