class NeuralLayer{
    constructor(length){
        this.neurons = [];
        for (let i = 0; i < length; i++) {  
            this.neurons[i] = new Neuron();
        }
    }

    innitializeLayer(inputLayer){
        for(let i = 0; i < inputLayer.length; i++){
            this.neurons[i].setValue(inputLayer[i]);
        }
    }

    innitializeNeuronBias(nextLayer){
        for(let i = 0; i < this.neurons.length; i++){
            //goes through all neurons in this layer
            for(let j = 0; j < nextLayer.length; j++){
                this.neurons.weights[j] = 0;
            }
        }
    }


}