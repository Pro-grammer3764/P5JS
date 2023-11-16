//contains sigmoid function

class Neuron{
    constructor(){
        this.weights = []; //equal to the amount of neurons in the next layer
        this.bias = 0; //constant added before sigmoid function is applied
        this.value = 0; //number between 0, 1
        this.x = 0;
        this.y = 0;
    }

    setValue(value){
        this.value = Sigmoid(value);
    }

    evaluate(previousLayer){
        //inputs: previous layer
        //evaluates this neuron based on the previous layer (brute force method)
        //for each neuron in previous layer muiltiply its value by its bias and add to a total sum
        //add this.bias to total sum
        //apply sigmoid function
        //return final value between 0, 1
    }
}