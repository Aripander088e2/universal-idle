let game = {
  tLast: Date.now(),
  atoms: new Decimal(10),
  size: new Decimal(1),
  generator: [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
  generatorBought: [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
  
}

const genCost = [null, new Decimal(10), new Decimal(1e4), new Decimal(1e9), new Decimal(1e16), new Decimal(1e25), new Decimal(1e36), new Decimal(1e49), new Decimal(1e64)]
const genCostScaling = [null, new Decimal(10), new Decimal(100), new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e7), new Decimal(1e8)]

let deltaTime;
const calculate = window.setInterval(() => {
  deltaTime = Date.now() - game.tLast;
  loop(20);
  game.tLast = Date.now()
}, 20);

function loop(ms){
  document.getElementById("atom").innerHTML = game.atoms
  document.getElementById("size").innerHTML = game.size
  
  document.getElementById("sizeSpeed").innerHTML = getSizeSpeed()
  document.getElementById("sizeBoost").innerHTML = getSizeBoost()
}