let game;
reset()
loadGame(JSON.parse(localStorage.getItem("universal-idle")))
Tab(game.tab)

const universeUpgradeCost = [null, new Decimal(2), new Decimal(5), new Decimal(25), new Decimal(100), new Decimal(400), new Decimal(1000), new Decimal(3000), new Decimal(9e6), new Decimal(Infinity), new Decimal(Infinity)]
const repeatableUniverseUpgradeCost = [null, new Decimal(10), new Decimal(25000), new Decimal(Infinity), new Decimal(Infinity)]
const repeatableUniverseUpgradeCostScaling = [null, new Decimal(10), new Decimal(100000), new Decimal(Infinity), new Decimal(Infinity)]

let deltaTime;
const calculate = window.setInterval(() => {
  deltaTime = Date.now() - game.tLast;
  loop(20);
  game.tLast = Date.now()
}, 20);

function loop(ms){
  updateStuffs(ms)
  if (game.autoGen) buyMaxAllGenerator()
  if (game.autoGenBoost) buyGeneratorBoost()
}