class NeuralDNA{
    constructor(neuralNetwork, score){
        this.score = score;
        this.weightDNA = []
        this.biasDNA = [];
        for(let x = 0; x < neuralNetwork.layers.length - 1; x++){
            for(let y = 0; y < neuralNetwork.layers[x].neurons.length; y++){
                this.weightDNA.push(neuralNetwork.layers[x].neurons[y].weights)
                this.biasDNA.push(neuralNetwork.layers[x].neurons[y].bias)
            }
        }
    }
}