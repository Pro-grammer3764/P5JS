function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);

  Neuron.prototype.Sigmoid = Sigmoid();
  NeuralLayer.prototype.Sigmoid = Sigmoid();
  NeuralNetwork.prototype.Sigmoid = Sigmoid();
  let bound = new Bound(0, 0, width, height);
  
  let size = [2, 3, 4, 3, 2];
  neuralNetwork = new NeuralNetwork(bound, size);
  neuralNetwork.insertInputs([0.5, 1]);
  neuralNetwork.propagateNetwork();
}


function draw() {
  background(0);
  if (pmouseX !== mouseX || pmouseY !== mouseY) {
    let x = map(mouseX, 0, width , 0, 1);
    let y = map(mouseY, 0, height, 0, 1);
    neuralNetwork.insertInputs([x, y]);
    neuralNetwork.propagateNetwork();
  }
  neuralNetwork.showNerualNetwork();
}

function Sigmoid(x){
  return (1) / (1 + (pow(Math.E, (x * -1))));
}