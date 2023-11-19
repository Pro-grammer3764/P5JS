class ball{
    constructor(bound, ballSize, a){
        this.radius = ballSize;
        this.bound = bound;
        this.a = min(a * 4, 256);
        this.col = color(256, 256, 256, this.a);
        this.speed = ballSize / 2;
        this.debug = false;
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
                left.accuracy = abs(map(this.y, left.y, left.y + left.h, 0, 2) - 1);
                return 'continue';
            }
        }
        
        //right paddle collision
        if (this.y > right.y && this.y < (right.y + right.h)){
            if(this.x > right.x - this.radius/2){
                this.vel.reflect(createVector(1, random(0, 0.25)));
                this.x = right.x - this.radius/2; //nudge
                right.accuracy = abs(map(this.y, right.y, right.y + right.h, 0, 2) - 1);
                return 'continue';
            }
        }
        
        //left and right wall collision
        if(this.x < this.bound.x + this.radius/2){
            //left wall
            this.reset();
            left.reset();
            right.reset();
            return 'right score';
        }else if(this.x > this.bound.x + this.bound.w - this.radius/2){
            //right wall
            this.reset();
            left.reset();
            right.reset();
            return 'left score';
        }

        return 'continue';
    }
}