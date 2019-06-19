// Ball variable
let xBall = 300;
let yBall = 200;
let dBall = 13;

// Ball velocity
let velocityXBall = 10;
let velocityYBall = 10;

// Racket variable
let xRacket = 5;
let yRacket = 150;
let racketLenght = 10;
let racketHeight = 90;

// Enemy Racket
let xRacketE = 585;
let yRacketE = 150;
let velocityYE;

let radius = dBall / 2;

let hit = false;

// Game Score
let myScores = 0;
let enemyScores = 0;

// Sounds
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  //trilha.loop();
}

function draw() {
  background(0);
  showBall();
  showRacket();
  ballMovement();
  collisionCheck();
  moveRacket();
  collisionRacket();
  score();
  middle();
}

function showBall() {
  circle(xBall, yBall, dBall);
}

function showRacket() {
  rect(xRacket, yRacket, racketLenght, racketHeight);
  rect(xRacketE, yRacketE, racketLenght, racketHeight);
}

function ballMovement() {
  xBall += velocityXBall;
  yBall += velocityYBall;
}

function collisionCheck() {
  if(xBall + radius > width || xBall - radius < 0) {
    velocityXBall *= -1;
  }
  if(yBall + radius >  height || yBall - radius < 0) {
    velocityYBall *= -1;
  }
}

function moveRacket() {
  if(keyIsDown(UP_ARROW)) {
     yRacketE -= 10;
  }
  if(keyIsDown(DOWN_ARROW)) {
    yRacketE += 10;
  }
  if(keyIsDown(87)) {
     yRacket -= 10;
  }
  if(keyIsDown(83)) {
    yRacket += 10;
  }
}


function collisionRacket() {
  hit = collideRectCircle(xRacket, yRacket, racketLenght, racketHeight, xBall, yBall, radius);
  if(hit) {
    velocityXBall *= -1;
    raquetada.play();
  }
  hit = collideRectCircle(xRacketE, yRacketE, racketLenght, racketHeight, xBall, yBall, radius);
  if(hit) {
    velocityXBall *= -1;
    raquetada.play();
  }
}

function score() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(myScores, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(enemyScores, 470, 26);
  if(xBall > 590) {
    myScores++;
    ponto.play();
  }
  if(xBall < 10) {
    enemyScores++;
    ponto.play();
  }
  if(myScores == 7) {
    text("VAGNER WIN", 300, 200);
    let stop = abort();
  } else if(enemyScores == 7) {
    text("ELOISA WIN", 300, 200);
    let stop = abort();
  }
}

function middle() {
  let y = 400;
  while(y >= 0) {
      rect(300, y, 5, 30);
      y -= 50;
  }
}