class NeuralNetwork{
    constructor(bound, layerCounts){
        //innitializes layers to desired length using array layerCounts
        this.bound = bound;
        this.layers = [];
        for(let i = 0; i < layerCounts.length - 1; i++){
            this.layers[i] = new NeuralLayer(layerCounts[i], layerCounts[i + 1]);
        }
        this.layers[layerCounts.length - 1] = new NeuralLayer(layerCounts[layerCounts.length - 1]);
    }

    showNerualNetwork(){
        push();
        stroke(256);
        strokeWeight(1);

        //set neuron positions
        let len = this.layers.length
        for(let x = 0; x < len; x++){
            let laylen = this.layers[x].neurons.length;
            let xpos = this.bound.x + (this.bound.w * ((x + 1) / (len + 1)))
            for(let y = 0; y < laylen; y++){
                let ypos = this.bound.y + (this.bound.h * ((y + 1) / (laylen + 1)));
                this.layers[x].neurons[y].x = xpos;
                this.layers[x].neurons[y].y = ypos;
            }
        }
        
        push();
        strokeWeight(1);
        //show neuron connections
        for(let x = 0; x < len - 1; x++){
            //loop amount of layers - 1
            for(let y = 0; y < this.layers[x].neurons.length; y++){
                //loop amount of neurons in current layer
                let p1x = this.layers[x].neurons[y].x;
                let p1y = this.layers[x].neurons[y].y;
                for(let n = 0; n < this.layers[x + 1].neurons.length; n++){
                    //loop amount of neurons in next layer
                    let p2x = this.layers[x + 1].neurons[n].x;
                    let p2y = this.layers[x + 1].neurons[n].y;
                    stroke(0, 0, abs(this.layers[x].neurons[y].weights[n] * 256))
                    line(p1x, p1y, p2x, p2y);
                } 
            }
        }
        pop();

        //show neuron positions
        for(let x = 0; x < len; x++){
            let laylen = this.layers[x].neurons.length;
            for(let y = 0; y < laylen; y++){
                let v = this.layers[x].neurons[y].value;
                let b = this.layers[x].neurons[y].bias;
                let w = "";

                for(let i = 0; i < this.layers[x].neurons[y].weights.length; i++){
                    w += nf(this.layers[x].neurons[y].weights[i], 1, 4).toString();
                    w += ", "
                }
                
                push();
                translate(this.layers[x].neurons[y].x, this.layers[x].neurons[y].y)
                noStroke(); fill(256); textSize(5);
                text("Value: " + nf(v, 1, 4) +"\nBias: " + nf(b, 1, 4) + "\nWeigths: " + w, 0, 20);
                fill(v * 256);
                //stroke(b * 256, 0, 0);
                stroke(256);
                circle(0, 0, 10);
                pop();

            }
        }

        pop();
    }

    insertInputs(array){
        //inserts inputs using array
        for(let i = 0; i < this.layers[0].neurons.length; i++){
            this.layers[0].neurons[i].value = array[i];
        }
    }

    propagateNetwork(){
        for (let x = 1; x < this.layers.length; x++) {
            //repeats amount of layers - 1, starts from the second layer,
            for(let y = 0; y < this.layers[x].neurons.length; y++){
                //repeats for every neuron in current layer
                let sum = 0; //start the sum at 0;

                for(let n = 0; n < this.layers[x - 1].neurons.length; n++){
                    //repeats for every weight in the previous layer
                    //n refers to the neurons in the previous layer
                    //y refers to the bias we will use for the current sum

                    sum += (this.layers[x - 1].neurons[n].value) * (this.layers[x - 1].neurons[n].weights[y])
                }
                
                //add bias from x,y then apply sigmoid then set x,y to the final sum
                sum += this.layers[x].neurons[y].bias; //add bias to sum
                sum = Sigmoid(sum); //apply Sigmoid function to total sum
                this.layers[x].neurons[y].value = sum;
            }
        }
    }

    returnOutputs(){
        let lastLen = this.layers[this.layers.length - 1].neurons.length;
        let array = [];

        for(let i = 0; i < lastLen; i++){
            array.push(this.layers[this.layers.length - 1].neurons[i].value);
        }
        
        return array;
    }
}