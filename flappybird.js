
//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34; //width/height ratio = 408/228 = 17/12
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

//pipes
let pipeArray = [];
let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//confetti
let confettiWidth = 34*360;
let confettiHeight = 640;
let confettiX = 0;
let confettiY = boardHeight-confettiHeight;
let confettiImg;
let confettiFrameWidth = 360;
let confettiFrameHight = 640;
let temp=1;

//physics
let velocityX = -2; //pipes moving left speed
let velocityY = 0; //bird jump speed
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board
    //draw flappy bird
    // context.fillStyle = "green";
    // context.fillRect(bird.x, bird.y, bird.width, bird.height);

    //load images
    birdImg = new Image();
    birdImg.src = "./flappybird.png";
    birdImg.onload = function() {
        context.drawImage(birdImg, bird.x, bird.y, bird.width*1.5, bird.height*1.5);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";

    context.fillText("confetti", 5, 160);
    confettiImg = new Image();
    confettiImg.src = "./confetti.png";
    
    
    requestAnimationFrame(update);
    setInterval(placePipes, 1500); //every 1.5 seconds
    document.addEventListener("click", moveBird);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //bird
    velocityY += gravity;
    // bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0); //apply gravity to current bird.y, limit the bird.y to top of the canvas
    context.drawImage(birdImg, bird.x-15, bird.y-10, bird.width*2, bird.height*2);

    if (bird.y > board.height) {
        gameOver = true;
    }

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5; //0.5 because there are 2 pipes! so 0.5*2 = 1, 1 for each set of pipes
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }

   
    

    //clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift(); //removes first element from the array
    }
    
        //confetti
    if (score>=60){
        if (confettiX<=-confettiWidth){confettiX = 0;} 
        else if (temp<0){confettiX = confettiX-confettiFrameWidth;}
        temp=-temp;
        context.drawImage(confettiImg, confettiX, confettiY, confettiWidth, confettiHeight);
    }
    
    //score
    context.fillStyle = "blue";
    context.font="30px sans-serif";
    let scoreText = `${score} år`;
    context.fillText(scoreText, 5, 40);

    if (gameOver && (score<60)) { 
        context.fillText("GAME OVER!", 5, 80);
        context.fillText("Pappa är", 5, 120);
        context.fillText("STÖRST", 5, 160);
    }
    if (score>59) {
        context.fillText("GRATTIS!!", 5, 80);
        context.fillText("Nu är du", 5, 120);
        context.fillText("STOR", 5, 160);
    }

}

function placePipes() {
    if (gameOver) {
        return;
    }
    
    //(0-1) * pipeHeight/2.
    // 0 -> -128 (pipeHeight/4)
    // 1 -> -128 - 256 (pipeHeight/4 - pipeHeight/2) = -3/4 pipeHeight
    if(score<=57){
        let randomPipeY;
        let openingSpace;
        let rand =Math.random();
        if ( rand<= 0.7){
            randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
            openingSpace = board.height/3;
        }
        else if (rand <= 0.95){
            randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
            openingSpace = board.height/4; 
        }
        else {
            randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
            openingSpace = board.height/4.5; 
        }
    
        let topPipe = {
            img : topPipeImg,
            x : pipeX,
            y : randomPipeY,
            width : pipeWidth,
            height : pipeHeight,
            passed : false
        }
        pipeArray.push(topPipe);
    
        let bottomPipe = {
            img : bottomPipeImg,
            x : pipeX,
            y : randomPipeY + pipeHeight + openingSpace,
            width : pipeWidth,
            height : pipeHeight,
            passed : false
        }
        pipeArray.push(bottomPipe);
    }
    else{
        let randomPipeY;
        let openingSpace;
        let rand =Math.random();
        if ( rand<= 0.1){
            randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
            openingSpace = board.height/3;
        }
        else if (rand <= 0.6){
            randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
            openingSpace = board.height/4; 
        }
        else {
            randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
            openingSpace = board.height/4.5; 
        }
    
        let topPipe = {
            img : topPipeImg,
            x : pipeX,
            y : randomPipeY,
            width : pipeWidth,
            height : pipeHeight,
            passed : false
        }
        pipeArray.push(topPipe);
    
        let bottomPipe = {
            img : bottomPipeImg,
            x : pipeX,
            y : randomPipeY + pipeHeight + openingSpace,
            width : pipeWidth,
            height : pipeHeight,
            passed : false
        }
        pipeArray.push(bottomPipe);
    }
}

function moveBird() {
    //jump
    velocityY = -6;

    //reset game
    if (gameOver) {
        bird.y = birdY;
        pipeArray = [];
        score = 0;
        gameOver = false;
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner

}







































