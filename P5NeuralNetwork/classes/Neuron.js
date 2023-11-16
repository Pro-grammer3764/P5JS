class Neuron{
    constructor(length1){
        this.weights = []; //equal to the amount of neurons in the next layer
        if(length1 !== null){
            for(let i = 0; i < length1; i++){
                this.weights[i] = random(-5, 5);
            }
        }
        this.bias = random(-1, 1); //constant added before sigmoid function is applied
        this.value = 0; //number between 0, 1
        
        //position in screen space (does not effect calculations)
        this.x = 0; 
        this.y = 0;
    }
}