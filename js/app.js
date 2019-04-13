let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
ctx.canvas.width  = window.innerWidth;
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
  color: "green",
  speed: 10
});

gameObjects.push({
  type: "harm",
  x: 100,
  y: 75,
  r: 10,
  color: "red",
  speed: 5
});

gameObjects.push({
  type: "benefit",
  x: 20,
  y: 25,
  r: 20,
  color: "yellow",
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

  for (idx in gameObjects) {
    g = gameObjects[idx];
    ctx.beginPath();
    ctx.arc(g.x, g.y, g.r, 0, 2 * Math.PI);
    //ctx.stroke();
    ctx.fillStyle = g.color;
    ctx.fill();

    if (g.type != "player") {

      g.x -= g.speed * game.level;

      if (colliding(player, g)) {
        if (g.type == "harm") {
          game.lives--;
        } else if (g.type == "benefit") {
          game.score += 100;

          if (game.score % 100 == 0) {
            game.level++;

            if (game.level % 2 == 0) {
              gameObjects.push({
                type: "harm",
                x: 100,
                y: 75,
                r: 10,
                color: "red",
                speed: 1
              });
            }

          }

        }
        console.log(game);

        g.state = "collision"
      }

      if ((g.x + g.r < 0) || g.state == "collision") {
        g.x = c.width + g.r;
        g.y = Math.random() * (c.height - 0) + 0;
        g.state = "";
      }
    }
  }

  // draw text
  ctx.font = "20px Comic Sans MS";
  ctx.textAlign = "center";
  ctx.fillText("Score: " + game.score + " - Lives: " + game.lives, c.width / 2, 20);

  // next frame
  if (game.lives > 0) {
    window.requestAnimationFrame(draw);
  } else {
    gameOver();
  }

}

function gameOver() {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.drawImage(backgroundImg, 0, 0, c.width, c.height);
  // font for Game Over Screen
  ctx.font = "250px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", c.width / 2, c.height / 2);

}

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

function checkKey(e) {

  e = e || window.event;

  // console.log(e);
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
