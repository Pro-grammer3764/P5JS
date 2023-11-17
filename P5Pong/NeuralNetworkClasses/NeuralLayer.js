class NeuralLayer{
    constructor(length0, length1){
        this.neurons = [];
        for (let i = 0; i < length0; i++) {  
            this.neurons[i] = new Neuron(length1);
        }
    }
}