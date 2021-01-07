let tablero;
let columnas;
let renglones
let celda_tamanio = 10;

function setup() {
  createCanvas(600, 400);
  columnas = width/celda_tamanio;
  renglones = height/celda_tamanio;
  tablero = creaTablero(columnas, renglones);
  for(let x = 1; x < columnas - 1; x++){
    for(let y = 1; y < renglones - 1; y++){
      tablero[x][y] = floor(random(2));
      //print(tablero[x][y]);
    }
  }
  //print(tablero);
}

function draw() {
  background(220);
  pintaTablero();
  siguienteGeneracion();
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
  tablero = tablero_siguiente;
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
        fill(100, 0, 215);
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