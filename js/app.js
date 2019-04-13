let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let game = {
  score: 0,
  lives: 3,
  state: "play"
};

let gameObjects = [];

gameObjects.push({
  type: "player",
  x: 20,
  y: c.height / 2,
  r: 15,
  color: "green",
  speed: 1
});

gameObjects.push({
  type: "harm",
  x: 100,
  y: 75,
  r: 10,
  color: "red",
  speed: 1
});

gameObjects.push({
  type: "benefit",
  x: 20,
  y: 25,
  r: 20,
  color: "yellow",
  speed: 1
});

let player = gameObjects[0];


function draw() {
  // clear canvas
  ctx.clearRect(0, 0, c.width, c.height);

  // draw objects

  for (idx in gameObjects) {
    g = gameObjects[idx];
    ctx.beginPath();
    ctx.arc(g.x, g.y, g.r, 0, 2 * Math.PI);
    //ctx.stroke();
    ctx.fillStyle = g.color;
    ctx.fill();

    if (g.type != "player") {

      g.x += g.speed;

      if (colliding(player, g)) {
        if (g.type == "harm") {
          game.lives--;
        } else if (g.type == "benefit") {
          game.score += 100;
        }
        console.log(game);
      }



      if (g.x - g.r > c.width) {
        g.x = 0 - g.r;
        g.y = Math.random() * (c.height - 0) + 0;
        // g.speed += 1;
      }
    }
  }

  // next frame
  window.requestAnimationFrame(draw);
}


window.requestAnimationFrame(draw);


function colliding(circle1, circle2) {
  let result = false;

  let dx = circle1.x - circle2.x;
  let dy = circle1.y - circle2.y;
  let distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < circle1.r + circle2.r) {
    // collision detected!
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
