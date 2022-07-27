//SETTING UP CANVAS
const myGameArea = {
    canvas: document.createElement('canvas'),
    frames: 0, //to count how many times we call the updateGameArea function
    start: function(){ //function to start the game - setting the canvas width + height, initialising the canvas, initialising this.interval 
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext('2d'); //Unitialising context
        document.body.insertBefore(this.canvas, document.body.childNodes[0]); //insertBefore = insterts a node before the reference child
        this.interval = setInterval(updateGameArea, 20); //updateGameArea every 20ms
    },
    stop: function(){ //function to stop the game by using clearInterval to stop this.interval from repeating 
        clearInterval(this.interval);
    },
    clear: function(){ //function to clear the canvas 
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

//EMPTY ARRAY FOR OBSTACLES
const myObstacles = [];

//FUNCTIONS
function updateGameArea(){ 
    myGameArea.clear(); //clear game area
    player.newPos(); //update player position before drawing
    player.update(); //update player position
    updateObstacles(); 
}

function updateObstacles(){
    myGameArea.frames += 1; //incrementing property: frames
    if (myGameArea.frames % 120 === 0){ //every 120 frames
        let x = myGameArea.canvas.width;
        let minHeight = 20; //parameter for obstacles
        let maxHeight = 200; //parameter for obstacles
        let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight); //generate random height within previously defined constraints
        let minGap = 50; //parameter for obstacles
        let maxGap = 200; //parameter for obstacles
        let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap); //generate random gap within previously defined constraints
        myObstacles.push(new Component(10, height, 'red', x, 0)); //adding first obstacle to the array
        myObstacles.push(new Component(10, x - height- gap,'red', x, height + gap)); //adding second obstacle to the array
    }
    for (let i = 0; i < myObstacles.length; i++){
        myObstacles[i].x += -1; //decrements the x position of the obstacle 
        myObstacles[i].update(); //updates obstacle position
    }
}

//COMPONENET CLASS 
class Component {
    constructor(width, height, color, x, y) { //defining Component properties
        //initial width height color of player
        this.width = width;
        this.height = height;
        this.color = color;
        //initial position of player
        this.x = x;
        this.y = y;
        //Properties to control speed of player
        this.speedX = 0;
        this.speedY = 0;
    }
    update() { //method to create rectangle 
        const ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    newPos() { //method to change position 
        this.x += this.speedX; //this.x = this.x + speedX
        this.y += this.speedY; //this.y = this.y + speedY
    }
    //Colision detection 
    //Methods to return the current position of the component 
    left() {
        return this.x;
    }
    right() {
        return this.x + this.width;
    }
    top() {
        return this.y;
    }
    bottom() {
        return this.y + this.height;
    }
    crashWidth(obstacle) { 
        return !(this.bottom() < obstacle.top()) || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.left();
    }
}

//PLAYER (COMPONENT)
const player = new Component(30, 30, 'blue', 0, 110); //creating new component (w, h, color, x, y)

//PLAYER EVENT LISTENERS 
document.addEventListener('keydown', (e) => { //Increasing speed 'keydown'
    switch (e.keyCode) {
        case 38: //up arrow
        player.speedY -= 1;
        break;
        case 40: //down arrow
        player.speedY += 1;
        break;
        case 37: //left arrow
        player.speedX -= 1;
        break;
        case 39: //right arrow
        player.speedX += 1;
        break;
    }
});

document.addEventListener('keyup', (e) => { //Setting speed to 0 'keyup'
    player.speedX = 0;
    player.speedY = 0;
});

//INITIALISING THE GAME 
myGameArea.start(); 