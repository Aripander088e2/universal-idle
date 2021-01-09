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
  updateGenerator(ms)
  updateSize(ms)
  
  document.getElementById("atom").innerHTML = formate(game.atoms, 2)
  document.getElementById("size").innerHTML = formate(game.size, 2)
  
  document.getElementById("sizeSpeed").innerHTML = formate(getSizeSpeed(), 2)
  document.getElementById("sizeBoost").innerHTML = formate(getSizeBoost(), 3)
  
  for (let i=1; i<8.5; i++){
    document.getElementById("gen" + i + "Bought").innerHTML = formate(game.generatorBought[i], 0)
    document.getElementById("gen" + i + "Amount").innerHTML = formate(game.generator[i], 0)
    document.getElementById("gen" + i + "Multi").innerHTML = formate(getGeneratorMulti(i), 0)
  }
}