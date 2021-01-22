let game = {
  tLast: Date.now(),
  tStart: Date.now(), 
  atoms: new Decimal(10),
  size: new Decimal(1),
  time: new Decimal(0),
  generator: [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
  generatorBought: [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
  generatorBoost: new Decimal(0),
  universePoints: new Decimal(0),
  universeUpgrade: [null, false, false, false, false, false, false, false, false, false, false],
  repeatableUniverseUpgrade: [null, new Decimal(0)],
  totalAtoms: new Decimal(0),
  bestSize: new Decimal(0),
  notation: 0,
  achievement: [],
}

moveTab1()
loadGame(JSON.parse(localStorage.getItem("universal-idle")))

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
  updateGenerator(gameSpeed().mul(ms)) // update Generators and Atoms amount
  updateSize(gameSpeed().mul(ms)) // update Universe size
  updateTime(gameSpeed().mul(ms)) // update Universe time
  
  if (game.atoms.gte(new Decimal(2).pow(1024))) game.atoms = new Decimal(2).pow(1024)
  // Atom
  document.getElementById("atom").innerHTML = formate(game.atoms, 2, 2)
  document.getElementById("atomSpeed").innerHTML = formate(getGeneratorSpeed(1), 2, 2)
  // Size
  document.getElementById("size").innerHTML = formate(game.size, 2, 2)
  document.getElementById("sizeSpeed").innerHTML = formate(getSizeSpeed(), 2, 2)
  document.getElementById("sizeBoost").innerHTML = formate(getSizeBoost(), 3, 3)
  // Time
  document.getElementById("time").innerHTML = formateTime(game.time, 2, 3)
  document.getElementById("timeSpeed").innerHTML = formateTime(getTimeSpeed(), 3, 3)
  document.getElementById("timeBoost").innerHTML = formate(getTimeBoost(), 4, 4)
  // Generators
  for (let i=1; i<8.5; i++){
    document.getElementById("gen" + i).style.display = (i == 1 ? "block" : (game.generator[i-1].gt(0) ? "block" : "none"))
    document.getElementById("gen" + i + "Bought").innerHTML = formate(game.generatorBought[i], 0, 3)
    document.getElementById("gen" + i + "Amount").innerHTML = formate(game.generator[i], 0, 2)
    document.getElementById("gen" + i + "Speed").innerHTML = formate(getGeneratorSpeed(i+1), 0, 2)
    document.getElementById("gen" + i + "Multi").innerHTML = formate(getGeneratorMulti(i), 2, 2)
    document.getElementById("gen" + i + "Cost").innerHTML = formate(getGeneratorCost(i), 0, 2)
  }
  // Generator Boost
  document.getElementById("genBoostAmount").innerHTML = formate(game.generatorBoost, 0, 3)
  document.getElementById("genBoostCost").innerHTML = formate(getGeneratorBoostCost(), 0, 3)
  document.getElementById("genB").style.display = (game.achievement.includes(21) ? "block" : "none")
  // Generator Boost Effect
  document.getElementById("genBoostEff1").innerHTML = formate(getGeneratorBoostBaseEffect()[1].pow(game.generatorBoost), 2, 2)
  document.getElementById("genBoostEff2").innerHTML = formate(game.generatorBoost.mul(getGeneratorBoostBaseEffect()[2]), 3, 2)
  document.getElementById("genBoostEff3").innerHTML = formate(game.generatorBoost.mul(getGeneratorBoostBaseEffect()[3]), 0, 2)
  // Title & Notation
  document.getElementById("title").innerHTML = formate(game.atoms, 0, 2) + " atoms, " + formate(game.size, 0, 2) + " meters"
  document.getElementById("notation").innerHTML = "Notation: " + getNotation()
  // Display
  document.getElementById("postgen8_1").style.display = (isFullSetAchieved(1) ? "block" : "none")
  document.getElementById("postgen8_2").style.display = (isFullSetAchieved(1) ? "block" : "none")
  document.getElementById("postgen8_3").style.display = (isFullSetAchieved(1) ? "block" : "none")
  document.getElementById("postuni2_1").style.display = (game.universeUpgrade[2] ? "block" : "none")
  document.getElementById("postuni2_2").style.display = (game.universeUpgrade[2] ? "block" : "none")
  document.getElementById("postuni2_3").style.display = (game.universeUpgrade[2] ? "block" : "none")
  // Button
  document.getElementById("t2").style.display = (isPrestigeAvailable(1) || game.achievement.includes(21) ? "inline-block" : "none")
  document.getElementById("uniReset").innerHTML = isPrestigeAvailable(1) ? "Reset for " + formate(getPrestigeGain(1), 2, 2) + " Universe Points" : "Reach " + formate(new Decimal(1e80), 2, 2) + " atoms and " + formate(new Decimal(8.8e26), 2, 2) + " meters to reset"
  // Prestige
  document.getElementById("uniPts").innerHTML = formate(game.universePoints, 2, 2)
  
  for (let i=1; i<10.5; i++){
    document.getElementById("uniUpg" + i + "Cost").innerHTML = formate(universeUpgradeCost[i], 0, 2)
    document.getElementById("uniUpg" + i + "Bought").innerHTML = game.universeUpgrade[i] ? "(BOUGHT)" : ""
  }
  for (let i=1; i<1.5; i++){
    document.getElementById("repeatUniUpg" + i + "Cost").innerHTML = formate(repeatableUniverseUpgradeCost[i].mul(repeatableUniverseUpgradeCostScaling[i].pow(game.repeatableUniverseUpgrade[i]), 0, 2))
    document.getElementById("repeatUniUpg" + i + "Level").innerHTML = formate(game.repeatableUniverseUpgrade[i], 0, 2)
  }
  // Achievement
  document.getElementById("achieveTotal").textContent = game.achievement.length.toLocaleString()
  updateAchievement() // update Achievements
  getAchievement() // get Achievements
  
  document.getElementById("gameSpeed").textContent = (gameSpeed().eq(1) ? "" : "Game Speed: " + formate(gameSpeed(), 2, 2) + "x")
  
  document.getElementById("statistic1").textContent = formateTime((game.tLast - game.tStart)/1000, 3, 2)
  document.getElementById("statistic2").textContent = formate(game.totalAtoms, 2, 2)
  document.getElementById("statistic3").textContent = formate(game.bestSize, 2, 2)
}