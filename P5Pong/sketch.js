function setup() {
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  createCanvas(400, 400);

  Neuron.prototype.Sigmoid = Sigmoid();
  NeuralLayer.prototype.Sigmoid = Sigmoid();
  NeuralNetwork.prototype.Sigmoid = Sigmoid();
  pongGame.prototype.Sigmoid = Sigmoid();

  gamesManager = new GamesManager(3, new bound(0, 0, width, height));
  gamesManager.innitializeGames();
}

function draw() {
  background(0, 100);
  gamesManager.showGames();
  gamesManager.updateGames();
}

function mouseClicked(){
}

function Sigmoid(x){
  return (1) / (1 + (pow(Math.E, (x * -1))));
}