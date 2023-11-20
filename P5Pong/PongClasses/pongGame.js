class pongGame{
  constructor(bound, pWidth, pHeight, padding, ballSize, a){
    this.bound = bound;
    this.a = min(a, 256); //alpha (transparency)
    this.left  = new pongPaddle(bound, pWidth, pHeight, padding, 0, this.a); //left paddle
    this.right = new pongPaddle(bound, pWidth, pHeight, padding, 1, this.a); //right paddle
    this.ball = new ball(bound, ballSize, this.a);
    this.ph = pHeight; //paddle height
    this.pw = pWidth; //paddle width
    this.leftScore = 0;
    this.rightScore = 0;

    this.state = new gameState(this);
    this.AI = new NeuralNetwork(this.bound, [5, 4, 3, 2]);
    this.DNA = new NeuralDNA(this.AI);
    //print(this.DNA);
    
    this.completedCycle = false;
    this.fitness = 0;
    this.totalAccuracy = 0;
  }

  show(){
    this.left.show();
    this.bound.show(this.a);
    this.ball.show();
    this.right.show();
    
    //UI
    push();
    //Center Line
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
    
    //Score
    fill(256, this.a); noStroke();
    textSize(this.pw * 2);
    textAlign(CENTER, CENTER);
    text(this.leftScore,  this.bound.x + (this.bound.w * 0.25), this.bound.y + (this.bound.h / 10)); //left score text
    text(this.rightScore, this.bound.x + (this.bound.w * 0.75), this.bound.y + (this.bound.h / 10)); //right score text

    //Total Accuracy

    pop();
    
    this.AI.showNerualNetwork();
  }

  update(){
    if(this.rightScore > 4){this.completedCycle = true; this.left.col = color(256, 0, 0); return;} else{this.left.col = color(256);}

    this.ball.update();
    this.ballCollision();
    
    this.state.update(this); //update current game state
    this.AI.insertInputs(this.state.state); //insert game state into network
    this.AI.propagateNetwork(); //forward propagate network
    this.AI.updatePaddle(this.AI.returnOutputs(), this.left); //update paddle
    
    this.totalAccuracy += this.left.accuracy;

    this.autoPlay();
  }

  setFitness(globalTimer){
    this.fitness = this.totalAccuracy / globalTimer;
  }

  ballCollision(){
    switch (this.ball.checkCollisions(this.left, this.right, this)) {
      case 'right score':
        this.reset()
        this.rightScore++;
        break;
      case 'left score':
        this.reset()
        this.leftScore++;
        break;
      default:
        break;
    }
  }

  reset(){
    this.ball.reset();
    this.left.reset();
    this.right.reset();
  }

  autoPlay(){
    //left
    //this.left.y = this.ball.y - (random(-0.01, 0.01) * this.ph/2); //easy bot
    //this.left.y = this.ball.y - this.ph/2; //perfect bot
    //this.left.y = this.ball.y - 10; //perfect offset
    //this.left.y = mouseY - this.ph/2; //mouse control
    this.left.update();

    //right
    this.right.y = this.ball.y - this.ph/2; //perfect bot
    this.right.update();
  }
}