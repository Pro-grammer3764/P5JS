function setup() {
  angleMode(DEGREES);
  createCanvas(400, 400);
  
  size = createVector(1, 1); //first int = columns, second int = rows
  unit = createVector(width/size.x, height/size.y);
  paddleHeight = unit.y / 5;
  paddleWidth = unit.x / 50;
  paddleOffset = paddleWidth / 2;
  ballSize = paddleWidth;
  ballSpeed = ballSize / 2;

  games = [];
  let area = size.x * size.y; //amount of games
  let alpha = 500 / (area + 1.9); //overlay alpha
  for (let y = 0; y < size.x; y++) {
    games[y] = [];
    for (let x = 0; x < size.x; x++) {
      //m = new bound(x*unit.x, y*unit.y, unit.x, unit.y);
      //games[y][x] = new pongGame(m, paddleWidth, paddleHeight, paddleOffset, ballSize, alpha);
      //games[y][x].ball.speed = ballSpeed;

      m = new bound(0, 0, width, height);
      games[y][x] = new pongGame(m, 10, 80, 5, 10, alpha);
    }
  }
}

function draw() {
  background(0, 100);
  for (let y = 0; y < size.x; y++) {
    for (let x = 0; x < size.x; x++) {
      games[y][x].show();
      games[y][x].update();
    }
  }
}

function mouseClicked(){
  let GS = new gameState(games[0][0]);
  print(GS);
}