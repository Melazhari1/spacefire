const canvas = document.getElementById("gamecanvas");
const ctx = canvas.getContext("2d");
let score = 0;
let gameOver = false;
let timeLeft = 60;

import Player from "./player.js";
import Enemy from "./enemy.js";
import Background from "./background.js";
import Bullet from "./bullet.js";

window.canvas = canvas;
window.ctx = ctx;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const timeInterval = setInterval(() => {
  if (timeLeft > 0) {
    timeLeft--;
  } else {
    gameOver = true;
    clearInterval(timeInterval);
  }
}, 1000);

function showGameOver() {
  ctx.fillStyle = "red";
  ctx.font = "40px Arial";
  ctx.fillText("GAME OVER", canvas.width / 2 - 120, canvas.height / 2);
  ctx.fillStyle = "White";
  ctx.font = "30px Arial";
  ctx.fillText("Score : "+score,canvas.width / 2 - 60, canvas.height / 2 + 60);
}

//background
const bgImg = new Image();
bgImg.src = "background.png";
window.bgImg = bgImg;
const background = new Background();

//Player
const playerImg = new Image();
playerImg.src = "player.png";
window.playerImg = playerImg;
const player = new Player();
window.player = player;

//Bullet
const bullets = [];

//Enemy
const enemies = [];
setInterval(() => {
  let typeR = parseInt(Math.random() * 2);
  const enemyImg = new Image();
  enemyImg.src = "enemy1.png";
  if (typeR == 1) enemyImg.src = "enemy.png";
  window.enemyImg = enemyImg;
  enemies.push(new Enemy(enemyImg));
}, 1000);

document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key == "ArrowLeft") {
    player.move("left");
  }
  if (event.key == "ArrowRight") {
    player.move("right");
  }

  if (event.key == " ") {
    bullets.push(new Bullet(player.x, player.y));
  }
});

function isCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //draw background
  background.draw();

  if (!gameOver) {
    //draw player
    player.draw();
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Time Left: " + timeLeft +"s", canvas.width - 140, 30);

    //draw bullets
    bullets.forEach((bullet, index) => {
      bullet.update();
      bullet.draw();

      if (bullet.y < 0) {
        bullets.splice(index, 1);
      }
    });

    //draw enemies
    enemies.forEach((enemy, enemyIndex) => {
      enemy.update();
      enemy.draw();
      bullets.forEach((bullet, bulletIndex) => {
        if (isCollision(bullet, enemy)) {
          enemies.splice(enemyIndex, 1);
          bullets.splice(bulletIndex, 1);
          score += 10;
        }
      });
      if (enemy.y > canvas.height) {
        enemies.splice(enemyIndex, 1);
      }
    });
  }else{
    showGameOver();
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
