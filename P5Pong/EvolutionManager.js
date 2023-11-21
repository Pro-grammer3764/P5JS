class GamesManager{
    constructor(count, bound){
        this.bound = bound;
        this.games = new Array(count);
        this.globalTimer = 0;
        this.resetTime = 600; //600 frames ~ 10 seconds
    }

    innitializeGames(){
        const gridLength =  ceil(pow(this.games.length, 0.5));
        const unit = createVector(this.bound.w / gridLength, this.bound.h / gridLength);

        let paddleHeight = unit.y / 5;
        let paddleWidth = unit.x / 50;
        let paddleOffset = paddleWidth / 2;
        let ballSize = paddleWidth;

        for (let y = 0; y < gridLength; y++) {
            for (let x = 0; x < gridLength; x++) {
                if(((y * gridLength) + x) < this.games.length){
                    let m = new bound(x * unit.x, y * unit.y, unit.x, unit.y);
                    this.games[(y * gridLength) + x] = new pongGame(m, paddleWidth, paddleHeight, paddleOffset, ballSize, 256);
                }
            }
        }
    }

    showGames(){
        for(let i = 0; i < this.games.length; i++){
            this.games[i].show();
        }
    }

    updateGames(){
        //AI is not learning most likely due to the fact that its not creating a new array of games

        this.globalTimer++;
        if(!this.checkGames()){
            for(let i = 0; i < this.games.length; i++){
                this.games[i].update();
            }

        }else{
            let nextGen = this.games.toSorted((a,b) => b.totalAccuracy - a.totalAccuracy);
            this.games = [];
            let topDNA = nextGen[0].DNA.combine(nextGen[1].DNA);
            print(topDNA);
            print("max: " + nextGen[0].totalAccuracy + ", min: " + nextGen[nextGen.length - 1].totalAccuracy); //prints highest and lowest score
            print(this);
            print(nextGen);
            print(nextGen.length);

            for(let i = 0; i < nextGen.length; i++){
                if(i < nextGen.length / 2 || true){
                    //top 50%
                    print(nextGen[i].totalAccuracy);
                    nextGen[i].DNA = nextGen[i].DNA.mutateDNA();
                }else{
                    //bottom 50%
                    print(nextGen[i].totalAccuracy);
                    nextGen[i].DNA = topDNA.mutateDNA();
                }

                nextGen[i].AI.insertDNA(nextGen[i].DNA);
                
                this.games[i] = nextGen[i];
                this.games[i].AI.placement = map(i, 0, nextGen.length - 1, 1, 0)
                this.games[i].totalAccuracy = 0;
                this.games[i].rightScore = 0;
                this.games[i].leftScore = 0;
                this.games[i].completedCycle = false;
                this.games[i].reset();
            }

            nextGen = [];
            print(this);
            print(nextGen);

            //noLoop();



            // for(let i = 0; i < this.games.length; i++){
            //     if(i > this.games.length / 2){
            //         //worst 50% of generation
            //         this.games[i].AI.insertDNA(topDNA.mutateDNA());
            //     }else{
            //         //best 50% of generation
            //         this.games[i].AI.insertDNA(nextGen[i].DNA) //insert new mutated DNA
            //         this.games[i].DNA.mutateDNA(); //mutate DNA
            //     }
                
            //     this.games[i].AI.placement = map(i, 0, this.games.length - 1, 1, 0);
            //     this.games[i].totalAccuracy = 0;
            //     this.games[i].fitness = 0;
            //     this.games[i].rightScore = 0;
            //     this.games[i].leftScore = 0;
            //     this.games[i].completedCycle = false;
            //     this.games[i].reset();
            // }
            
            this.globalTimer = 0;
        }
    }

    sortGames(){
        this.games.sort((a,b) => b.totalAccuracy - a.totalAccuracy);
    }

    checkGames(){
        for(let i = 0; i < this.games.length; i++){
            if(this.games[i].completedCycle == false){return false;}
        }

        return true;
    }
}