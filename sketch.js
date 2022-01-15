//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 30;
let raio = diametro / 2;
//variáveis da velocidade da bolinha
let xVelBolinha = 4;
let yVelBolinha = 6;

//variáveis da raquete
let xRaquete = 2; 
let yRaquete = 155;
let velDeMovimentoRaquete = 10;

//variáveis da raquete do oponente
let xRaqueteOponente = 588;
let yRaqueteOponente = 0;
let velXRaqueteOponente;
let velYRaqueteOponente;
let chanceDeErrar = 0;

//pontos
let pontosP1 = 0;
let pontosP2 = 0;

//sons
let trilha;
let ponto;
let raquetada;

let comprimentoRaquete = 10;
let alturaRaquete = 90;

let colidiu = false;
let loose = "GAME OVER";

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  colisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  aceleraBolinha();
}


function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  
  xBolinha += xVelBolinha;
  yBolinha += yVelBolinha;

}

function verificaColisaoBorda(){
  if(xBolinha + raio > width || xBolinha - raio < 1){
    xVelBolinha *= -1;
  }
  if(yBolinha + raio > height || yBolinha - raio < 0){
    yVelBolinha *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, comprimentoRaquete, alturaRaquete)
}

function movimentaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= velDeMovimentoRaquete;
     }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += velDeMovimentoRaquete;
  }
  if(yRaquete + alturaRaquete > height){
    yRaquete = height -alturaRaquete;
  }
  if(yRaquete < 0){
    yRaquete = 0;
  }
}


function colisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, diametro)
  if(colidiu){
    xVelBolinha *= -1
    
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velYRaqueteOponente = yBolinha - yRaqueteOponente - comprimentoRaquete / 2 - 30;
  yRaqueteOponente += velYRaqueteOponente  + chanceDeErrar;
  
  if(yRaqueteOponente + alturaRaquete > height){
    yRaqueteOponente = height -alturaRaquete;
  }
  if(yRaqueteOponente < 0){
    yRaqueteOponente = 0;
  }
  calculaChanceDeErrar();
}


function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(15);
  fill(color(253, 107, 20));
  rect(150, 10, 40, 20);
  fill(255);
  text(pontosP1, 170, 25);
  fill(color(253, 107, 20));
  rect(420, 10, 40, 20);
  fill(255);
  text(pontosP2, 440, 25);
}

function marcaPonto(){
  if(xBolinha > 585 ){
    pontosP1 += 1;
    ponto.play();
  }
  if(xBolinha < 15){
    pontosP2 += 1;
    ponto.play();
  }
}

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function calculaChanceDeErrar(){
  if(pontosP2 > pontosP1){
    chanceDeErrar += 1;
    if(chanceDeErrar >= 59){
      chanceDeErrar = 60;
    }
  } else{
    chanceDeErrar -= 1;
    if(chanceDeErrar < 40){
      chanceDeErrar = 40;
    }
  }
}

function aceleraBolinha(){
  if(pontosP1 > pontosP2){
    xVelBolinha += 2;
    yVelBolinha += 1;
  }
}

