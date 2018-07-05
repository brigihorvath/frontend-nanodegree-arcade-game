// Enemies our player must avoid
const lightBox = document.querySelector('.lightBox');
let interval;
let second = 1;
let minute = 0;


//timer function
function startTimer(){
    
    const timer = document.querySelector('.timer');
    interval = setInterval(function(){
        if(minute > 0 && second > 9){
            timer.innerHTML = `${minute} : ${second}`;
        }else if(minute > 0 && second < 10){
            timer.innerHTML = `${minute} : 0${second}`;
        }else if(second < 10){
            timer.innerHTML = `0:0${second}`;        
        }else{
            timer.innerHTML = `0:${second}`;
        }
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


class Enemy {
    constructor(x, y, speed){
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
        //use the width and the height with the collision function
        this.height = 83; 
        this.width = 101;

    }
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt){
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    //in case one enemy reaches the end of the canvas, then it will appear again on the other side
    if (this.x >= 505){
        this.x = -101; //the width of the bug is 101
    }
    //sets the bug to the new location (distance = speed*time)
    this.x += this.speed * dt;
    this.collisionHandler();

}

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //if the enemy hits the player or the player steps too near a bug, 
    //than a collision is detected and the player is set back to its original place
    //the width values are corrected, because the real images are wider, than they appear on the screen
    collisionHandler(){
        if ((player.y == (this.y + 10)) && player.x <this.x + this.width - 28 && player.x + player.width - 20 > this.x)
         {
            player.y = 406;
            player.x = 200;
        }
    }
    
    
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(x, y){
        //the default sprite is char-boy, but there is an opportunity to change this
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        //height and with used at collision detection
        this.height = 83;
        this.width =101;
    }
    //when the player reaches the water, it will be reset to the original place
    //and a winning message shows up
    update(){
        player.reset();
    }
    //draw the player to the canvas
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //move the player according to the pressed arrow keys

    handleInput(allowedKeys){
    switch(allowedKeys){
        case 'left':
        if(this.x > 0){
            this.x -= 101;
        }
        break;

        case 'up':
        if(this.y > 0){
            this.y -= 83;
        }
        break;

        case 'right':
        if(this.x < 400){
        this.x += 101;
        }
        break;

        case 'down':
        if(this.y < 400){
            this.y += 83;
        } 
        break;
    }

    }

    //If the player reaches the water the game should be reset by moving the player back to the initial location
    reset(){
        if ( player.y <= 0){
            setTimeout (() => {
                player.y = 406;
                player.x = 200;
                player.winningMessage();//ezt jó ide, vagy inkább az object-en kívülre kellene? 
            }, 500)
            clearInterval(interval);


        }

    }
    //when the player reaches the water, a winning message shows up
    winningMessage(){       
        document.querySelector(".lightBox").style.display = "block";
        if(minute === 0){
        document.getElementsByClassName("timerToMessage")[0].innerHTML = ` ${second-1} sec`; //-1 sec because of the setTimeout
        }else{
            document.getElementsByClassName("timerToMessage")[0].innerHTML = ` ${minute} min ${second-1} sec`;//-1 sec because of the setTimeout
        }
    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
//the speed of the bugs will be random
const speed1 = Math.random()*400;
const speed2 = Math.random()*400;
const speed3 = Math.random()*400;
const firstEnemy = new Enemy(200, 64, speed1);
const secondEnemy = new Enemy (10, 147, speed2);
const thirdEnemy = new Enemy ( 100, 230, speed3);
//const fourthEnemy = new Enemy (-100, 60, speed1);
//const fifthEnemy = new Enemy (-300, 145, speed2);
//const sixthEnemy = new Enemy (-200, 230, speed3);
const allEnemies = [firstEnemy, secondEnemy, thirdEnemy/*, fourthEnemy, fifthEnemy, sixthEnemy*/];

// Place the player object in a variable called player
const player = new Player(200, 406);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//EventListener to make the lightbox disappear to a click
lightBox.addEventListener('click',function(evt){
    lightBox.style.display = "none";
    window.location.reload();
});

 
//EventListener to make the lightbox disappear to the ESC button press
document.addEventListener('keydown', function(e){
    if (e.which == 27) {
        setTimeout(() => {
            lightBox.style.display = "none";
            window.location.reload();},500);
    }
});


//EventListener, that changes the players sprite to the chosen one
//starts the timer
//makes the lightbox disappear
document.querySelector('.playerSelection').addEventListener('click',function(event){
    if ( event.target.tagName.toUpperCase() == "IMG"){
        player.sprite = event.target.getAttribute('src');
    }
    startTimer();
    document.querySelector('.playersLightBox').style.display = "none";
    
});
