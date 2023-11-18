class gameState{
    constructor(pongGame){
        this.ballX = pongGame.ball.normalPos.x;
        this.ballY = pongGame.ball.normalPos.y;
        this.ballVelX = pongGame.ball.normalVel.x;
        this.ballVelY = pongGame.ball.normalVel.y;
        this.leftY = pongGame.left.normalPos.y;
        //this.rightY = pongGame.right.normalPos.y;

        this.state = [];
        this.updateState();
    }

    update(pongGame){
        this.ballX = pongGame.ball.normalPos.x;
        this.ballY = pongGame.ball.normalPos.y;
        this.ballVelX = pongGame.ball.normalVel.x;
        this.ballVelY = pongGame.ball.normalVel.y;
        this.leftY = pongGame.left.normalPos.y;
        //this.rightY = pongGame.right.normalPos.y;

        this.updateState();
    }

    updateState(){
        this.state[0] = this.ballX
        this.state[1] = this.ballY
        this.state[2] = this.ballVelX
        this.state[3] = this.ballVelY
        this.state[4] = this.leftY
        //this.state[5] = this.rightY
    }
}