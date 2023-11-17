class pongGame{
  constructor(bound, pWidth, pHeight, padding, ballSize, a){
    this.bound = bound;
    this.a = min(a, 256);
    this.left  = new pongPaddle(bound, pWidth, pHeight, padding, 0, this.a); //left
    this.right = new pongPaddle(bound, pWidth, pHeight, padding, 1, this.a); //right
    this.ball = new ball(bound, ballSize, this.a);
    this.ball.showText = true;
    this.ph = pHeight;
    this.pw = pWidth;
    this.leftScore = 0;
    this.rightScore = 0;
  }

  show(){
    this.left.show();
    this.bound.show(this.a);
    this.ball.show();
    this.right.show();

    //UI
    push();
    strokeWeight(1);
    stroke(256, this.a)
    let num = 12;
    for (let i = 0; i < num; i++) {
      if(i % 2 == 0){stroke(256, this.a)}else{noStroke()}
      line(this.bound.x + this.bound.w/2, 
            this.bound.y + (this.bound.h / num) * i, 
            this.bound.x + this.bound.w/2, 
            this.bound.y + (this.bound.h / num) * (i+1));
    }

    fill(256, this.a); noStroke();
    textSize(this.pw * 2);
    textAlign(CENTER, CENTER);
    text(this.leftScore,  this.bound.x + (this.bound.w * 0.25), this.bound.y + (this.bound.h / 10));
    text(this.rightScore, this.bound.x + (this.bound.w * 0.75), this.bound.y + (this.bound.h / 10));
    pop();
  }

  update(){
    this.ball.update();
    this.ballCollision();
    this.autoPlay();
  }

  ballCollision(){
    switch (this.ball.checkCollisions(this.left, this.right)) {
      case 'right score':
        this.rightScore++;
        break;
      case 'left score':
        this.leftScore++;
        break;
      default:
        break;
    }
  }

  autoPlay(){
    //left
    //this.left.y = this.ball.y - (random(-0.01, 0.01) * this.ph/2); //easy bot
    this.left.y = this.ball.y - this.ph/2; //perfect bot
    //this.left.y = this.ball.y - 10; //perfect offset
    //this.left.y = mouseY - this.ph/2; //mouse control
    this.left.update();

    //right
    this.right.y = this.ball.y - this.ph/2; //perfect bot
    this.right.update();
  }
}