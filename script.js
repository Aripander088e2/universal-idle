let game = {
  tLast: Date.now(),
  tPlayedWTimeSpeed: new Decimal(0),
  tStart: Date.now(), 
  atoms: new Decimal(10),
  size: new Decimal(1),
  time: new Decimal(0),
  generator: [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
  generatorBought: [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
  generatorBoost: new Decimal(0),
  universePoints: new Decimal(0),
  bestUniPtsInOneReset: new Decimal(0),
  universeUpgrade: [null, false, false, false, false, false, false, false, false, false, false],
  repeatableUniverseUpgrade: [null, new Decimal(0)],
  totalAtoms: new Decimal(0),
  bestSize: new Decimal(0),
  bestGenBoost: new Decimal(0),
  tab: 1,
  notation: 0,
  timeDisplay: 0,
  productionDisplay: 0,
  achievement: [],
}

loadGame(JSON.parse(localStorage.getItem("universal-idle")))
Tab(game.tab)

const universeUpgradeCost = [null, new Decimal(2), new Decimal(5), new Decimal(25), new Decimal(100), new Decimal(400), new Decimal(1000), new Decimal(Infinity), new Decimal(Infinity), new Decimal(Infinity), new Decimal(Infinity)]
const repeatableUniverseUpgradeCost = [null, new Decimal(10)]
const repeatableUniverseUpgradeCostScaling = [null, new Decimal(10)]

let deltaTime;
const calculate = window.setInterval(() => {
  deltaTime = Date.now() - game.tLast;
  loop(20);
  game.tLast = Date.now()
}, 20);

function loop(ms){
  updateStuffs(ms)
}