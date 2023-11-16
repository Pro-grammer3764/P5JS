class NeuralNetwork{
    constructor(layerCounts){
        this.layers = [];
        for(let i = 0; i < layerCounts.length; i++){
            this.layers[i] = new NeuralLayer(layerCounts[i]); //innitializes this layers to desired length
        }
    }

    input(input){
        //input any array of numbers
        this.layers[0].innitializeLayer(input);
    }

    showNerualNetwork(bound){
        push();
        stroke(256);
        strokeWeight(1);

        //set neuron positions
        let len = this.layers.length
        for(let x = 0; x < len; x++){
            let laylen = this.layers[x].neurons.length;
            let xpos = bound.x + (bound.w * ((x + 1) / (len + 1)))
            for(let y = 0; y < laylen; y++){
                let ypos = bound.y + (bound.h * ((y + 1) / (laylen + 1)));
                this.layers[x].neurons[y].x = xpos;
                this.layers[x].neurons[y].y = ypos;
            }
        }
        
        push();
        stroke(256, 50);
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
                    
                    line(p1x, p1y, p2x, p2y);
                } 
            }
        }
        pop();

        //show neuron positions
        for(let x = 0; x < len; x++){
            let laylen = this.layers[x].neurons.length;
            for(let y = 0; y < laylen; y++){
                fill(this.layers[x].neurons[y].value * 256);
                circle(this.layers[x].neurons[y].x, this.layers[x].neurons[y].y, 10);
            }
        }

        pop();
    }

    evaluateNextLayer(layer0, layer1){
        
    }
}