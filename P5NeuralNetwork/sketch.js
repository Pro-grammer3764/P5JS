//1. Node
//2. Layer
//3. Neural Network

//convention: topmost = 0, bottommost = n

function setup() {
  createCanvas(400, 400);
  Neuron.prototype.Sigmoid = Sigmoid();

  let size = [];
  for(let i = 0; i < round(random(3, 5)); i++){
    size[i] = round(random(2, 6));
  }
  neuralNetwork = new NeuralNetwork(size);
  let n = neuralNetwork.layers[0].neurons.length;
  put = [];
  for(let i = 0; i < n; i++){
    put[i] = random();
  }
  neuralNetwork.input(put);
  b = new Bound(0, 0, width, height);
}

function draw() {
  background(0);
  neuralNetwork.showNerualNetwork(b);
}

function Sigmoid(x){
  return (1) / (1 + (pow(Math.E, (x * -1))));
}
