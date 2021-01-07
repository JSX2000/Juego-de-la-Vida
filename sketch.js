let tablero;
let columnas;
let renglones
let celda_tamanio = 10;
let generaciones = 0;
let checkbox;

function setup() {
  createCanvas(600, 400);
  columnas = width/celda_tamanio;
  renglones = height/celda_tamanio;
  tablero = creaTablero(columnas, renglones);
  for(let x = 1; x < columnas - 1; x++){
    for(let y = 1; y < renglones - 1; y++){
      tablero[x][y] = floor(random(2));
    }
  }
  checkbox = createCheckbox('Detener/Continuar Simulación', false);
  checkbox.changed(myCheckedEvent);
}

function draw() {
  background(225);
  pintaTablero();
  siguienteGeneracion();
  fill('white');
  stroke(0);
  contadorVidas();
  contadorMuertes();
  contadorNacimientos();
  rect(20, 360, 130, 20)
  fill(255)
  text('Generaciones: ', 22, 375)
  text(generaciones, 120, 375)
}

function siguienteGeneracion(){
  let tablero_siguiente = creaTablero(columnas, renglones);
  for(let x = 1; x < columnas - 1; x++){
    for(let y = 1; y < renglones - 1; y++){
      let celda = tablero[x][y];
      let vecinos = cuentaVecinos(x, y);
      if(celda == 0 && vecinos == 3){
        tablero_siguiente[x][y] = 1;
      }
      else if(celda == 1 && (vecinos > 3 || vecinos < 2)){
        tablero_siguiente[x][y] = 0;
      }
      else{
        tablero_siguiente[x][y] = celda;
      }
    }
  }
  tablero_anterior = tablero;
  tablero = tablero_siguiente;
  generaciones = generaciones + 1;
  if(generaciones == 10000){
    noLoop();
  }
}

function cuentaVecinos(x, y){
  let suma_vecinos = 0;
  suma_vecinos += tablero[x - 1][y - 1];
  suma_vecinos += tablero[x][y - 1];
  suma_vecinos += tablero[x + 1][y - 1];
  suma_vecinos += tablero[x - 1][y];
  suma_vecinos += tablero[x + 1][y];
  suma_vecinos += tablero[x - 1][y + 1];
  suma_vecinos += tablero[x][y + 1];
  suma_vecinos += tablero[x + 1][y + 1];
  return suma_vecinos;
}

function pintaTablero(){
  for(let x = 0; x < columnas; x++){
    for(let y = 0; y < renglones; y++){
      let posx = x*celda_tamanio;
      let posy = y*celda_tamanio;
      if(tablero[x][y] == 1){
        fill(floor(random(0, 255)), floor(random(0, 255)), floor(random(0, 255)));
        stroke(0);
        rect(posx, posy, celda_tamanio, celda_tamanio);
      }
    }
  }
}

function creaTablero(cols, ren){
  let tab = new Array(cols);
  for(let i = 0; i < tab.length; i++){
    tab[i] = new Array(ren);
  }
  return tab;
}


function contadorVidas() {
  let vidas = 0;
  for(let x=1; x<columnas-1; x+=1)  {
    for(let y=1; y<renglones-1; y+=1)  {
      if (tablero[x][y] ==1) {
        vidas+=1;
      }
    }
  }
  fill('white')
  rect(20,336,130,20)
  fill(50)
  text('Vidas: ', 22, 350)
  text(vidas, 120, 350)
}

function contadorMuertes() {
  let muertes = 0;
  for(let x=1; x<columnas-1; x+=1)  {
    for(let y=1; y<renglones-1; y+=1)  {
      if (tablero_anterior[x][y]==1 && tablero[x][y]==0) {
        muertes+=1;
      }
    }
  }
  fill('white')
  rect(20,310,130,20)
  fill(50)
  text('Muertes: ', 22, 325)
  text(muertes, 120, 325)
}

function contadorNacimientos() {
  let nacimientos = 0;
  for(let x=1; x<columnas-1; x+=1)  {
    for(let y=1; y<renglones-1; y+=1)  {
      if (tablero_anterior[x][y]==0 && tablero[x][y]==1) {
        nacimientos+=1;
      }
    }
  }
  fill('white');
  rect(20,285,130,20);
  fill(50);
  text('Nacimientos: ', 22, 300);
  text(nacimientos, 120, 300);
}

function myCheckedEvent() {
  if (this.checked()) {
    noLoop();
  } else {
    loop();
  }
}

//NO OLVIDAR HACER EL MERGE DE LAS 2 RAMAS, PERO SOLO HE SUBIDO UNA RAMA :v