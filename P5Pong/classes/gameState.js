class gameState{
    constructor(pongGame){
        this.ballNormal = pongGame.ball.normalPos;
        this.ballVel = pongGame.ball.normalVel;
        this.leftNormal = pongGame.left.normalPos;
        this.leftAccuracy = pongGame.left.accuracy;
        this.rightNormal = pongGame.right.normalPos;
        this.rightAccuracy = pongGame.right.accuracy;
    }
}