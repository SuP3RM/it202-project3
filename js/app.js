let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

// for canvas width set to device's innerWidth
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let game = {
  score: 0,
  lives: 3,
  state: "play",
  level: 1
};

let gameObjects = [];

gameObjects.push({
  type: "player",
  x: 20,
  y: c.height / 2,
  r: 15,
  color: "white",
  speed: 10
});

gameObjects.push({
  type: "enemy",
  x: 100,
  y: 75,
  r: 30,
  color: "white",
  speed: 5
});

gameObjects.push({
  type: "oneUpLife",
  x: 20,
  y: 25,
  r: 20,
  color: "green",
  speed: 2.5
});

let player = gameObjects[0];

// backgroundImg
let backgroundImg = new Image();
backgroundImg.src = "blackTheme.jpg";

function draw() {
  // clear canvas
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.drawImage(backgroundImg, 0, 0, c.width, c.height);
  // draw objects

  for (i in gameObjects) {
    g = gameObjects[i];
    ctx.beginPath();
    ctx.arc(g.x, g.y, g.r, 0, 2 * Math.PI);
    ctx.strokeStyle = g.color;
    ctx.stroke();

    if (g.type != "player") {

      g.x -= g.speed * game.level;

      if (colliding(player, g)) {
        if (g.type == "enemy") {
          game.lives--;
        } else if (g.type == "oneUpLife") {
          game.score += 100;
          // console.log('mario here')
          if (game.score % 100 == 0) {
            game.level++;

            if (game.level % 2 == 0) {
              gameObjects.push({
                type: "enemy",
                x: 100,
                y: 75,
                r: 10,
                color: "red",
                speed: game.level
              });
            }
          }
        }
        g.state = "collision"
      }
      if ((g.x + g.r < 0) || g.state == "collision") {
        g.x = c.width + g.r;
        g.y = Math.random() * (c.height - 0) + 0;
        g.state = "";
      }
    }
  }

  // font for score and number of lives
  ctx.font = "24px Impact, Charcoal, sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "cyan";
  ctx.fillText("Score: " + game.score + " Player Lives: " + game.lives, c.width / 2, 20);

  // next frame
  if (game.lives > 0) {
    window.requestAnimationFrame(draw);
  } else {
    gameOver();
    watch.stopTimer();
  }

}

function gameOver() {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.drawImage(backgroundImg, 0, 0, c.width, c.height);

  // font for Game Over Screen
  ctx.font = "200px Comic Sans MS";
  ctx.fillStyle = "cyan";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", c.width / 2, c.height / 2);

}

// Credit to Ryan Waite for the clock/timer:
// https://github.com/ryanwaite28/script-store/blob/master/js/stop-watch.js
// clock/timer
let StopWatch = function StopWatch() {
  const self = this;

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  let timer;
  let on = false;

  self.startTimer = function(callback) {
    if (on === true) {
      return;
    }
    on = true;
    timer = setInterval(function() {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
      }
      if (callback && callback.constructor === Function) {
        callback();
      }
    }, 1000);
    console.log('timer started');
  }

  self.stopTimer = function() {
    clearInterval(timer);
    on = false;
    console.log('timer ended: ', self.getTimeString());
  }

  self.resetTimer = function() {
    self.stopTimer();
    hours = 0;
    minutes = 0;
    seconds = 0;
  }

  self.getTimeString = function() {
    let hour = hours > 9 ? String(hours) : '0' + String(hours);
    let minute = minutes > 9 ? String(minutes) : '0' + String(minutes);
    let second = seconds > 9 ? String(seconds) : '0' + String(seconds);
    let timeString = hour + ':' + minute + ':' + second;
    return timeString;
  }

  self.getHours = function() {
    return hours;
  }

  self.getMinutes = function() {
    return minutes;
  }

  self.getSeconds = function() {
    return seconds;
  }
}

let watch = new StopWatch();
let timerText = document.querySelector('.timer');

// displays timer on screen
function displayOnScreen() {
  watch.startTimer(function() {
    timerText.innerHTML = watch.getTimeString();
  });
}
displayOnScreen();


window.requestAnimationFrame(draw);

function colliding(circle1, circle2) {
  let result = false;

  let dx = circle1.x - circle2.x;
  let dy = circle1.y - circle2.y;
  let distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < circle1.r + circle2.r) {
    result = true;
  }

  return result;
}

document.onkeydown = checkKey;

// key events to use arrow keys
function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == '38') {
    // up arrow
    player.y -= player.speed;
  } else if (e.keyCode == '40') {
    // down arrow
    player.y += player.speed;
  } else if (e.keyCode == '37') {
    // left arrow
  } else if (e.keyCode == '39') {
    // right arrow
  }

}
