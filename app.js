const canvas = document.getElementById("gamecanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");

let score = 0;
let gameOver = false;
let timeLeft = 2;
let gameOverPlayed = false;
let canShoot = true;
let keys = {};

import Player from "./player.js";
import Enemy from "./enemy.js";
import Background from "./background.js";
import Bullet from "./bullet.js";


const shootSound = new Audio("sounds/shoot.mp3");
const explosionSound = new Audio("sounds/explosion.wav");
const gameOverSound = new Audio("sounds/gameover.mp3");

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
  restartBtn.style.display = "block";
  if (!gameOverPlayed) { 
    gameOverSound.play();
    gameOverPlayed = true;
}
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

window.addEventListener("keydown", (event) => {
  keys[event.code] = true;
});

window.addEventListener("keyup", (event) => {
  keys[event.code] = false;
});

function updatePlayer() {
  if (keys["ArrowLeft"] && player.x > 0) {
      player.move("left");
  }
  if (keys["ArrowRight"] && player.x + player.width < canvas.width) {
    player.move("right");
  }
}

function handleShooting() {
  if (keys["Space"] && canShoot) {
      bullets.push(new Bullet(player.x, player.y));
      canShoot = false;
      setTimeout(() => {
          canShoot = true;
          shootSound.currentTime = 0;
      }, 300); 
  }
}



restartBtn.addEventListener("click", () => {
  score = 0;
  timeLeft = 60;
  gameOver = false;
  bullets.length = 0;
  enemies.length = 0;

  restartBtn.style.display = "none"; 

  timerInterval = setInterval(() => {
      if (timeLeft > 0) {
          timeLeft--;
      } else {
          gameOver = true;
          clearInterval(timerInterval);
      }
  }, 1000);

  gameLoop();
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
    updatePlayer();
    handleShooting();
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
          explosionSound.currentTime = 0;
          explosionSound.volume = 0.1;
          explosionSound.play();
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
