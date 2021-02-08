function updateStuffs(ms){
  renderVariable(ms)
  renderMain()
  if (game.tab == 1) renderTab1()
  if (game.tab == 2) renderTab2()
  if (game.tab == 101) renderTab101()
  if (game.tab == 102) renderTab102()
  if (game.tab == 103) renderTab103()
}

function renderVariable(ms){
  updateGenerator(gameSpeed().mul(ms)) // update Generators and Atoms amount
  if (game.atoms.gte(new Decimal(2).pow(1024)) && !game.achievement.includes(31)) game.atoms = new Decimal(2).pow(1024)
  if (game.generatorBoost.gte(game.bestGenBoost)) game.bestGenBoost = game.generatorBoost
  updateSize(gameSpeed().mul(ms)) // update Universe size
  updateTime(ms) // update Universe time
  game.tPlayedWTimeSpeed = game.tPlayedWTimeSpeed.add(gameSpeed().mul(ms).div(1000))
  getAchievement()
}

function renderMain(){
  // Atom
  document.getElementById("atom").innerHTML = formate(game.atoms, 2, 2)
  document.getElementById("atomSpeed").innerHTML = formate(game.productionDisplay == 0 ? getGeneratorSpeed(1).mul(gameSpeed()) : productionRate(game.atoms, getGeneratorSpeed(1).mul(gameSpeed()), game.productionDisplay-1), (game.productionDisplay == 0 ? 2 : game.productionDisplay+1), 2) + (game.productionDisplay == 0 ? "" : (game.productionDisplay == 1 ? "% of " : " OoM of "))
  // Size
  document.getElementById("size").innerHTML = formate(game.size, 2, 2)
  document.getElementById("sizeSpeed").innerHTML = formate(game.productionDisplay == 0 ? getSizeSpeed().mul(gameSpeed()) : productionRate(game.size, getSizeSpeed().mul(gameSpeed()), game.productionDisplay-1), (game.productionDisplay == 0 ? 2 : game.productionDisplay+1), 2) + (game.productionDisplay == 0 ? "" : (game.productionDisplay == 1 ? "% of " : " OoM of "))
  document.getElementById("sizeBoost").innerHTML = formate(getSizeBoost(), 3, 3)
  document.getElementById("postgen8_1").style.display = (isFullSetAchieved(1) ? "block" : "none")
  document.getElementById("postgen8_2").style.display = (isFullSetAchieved(1) ? "block" : "none")
  document.getElementById("postgen8_3").style.display = (isFullSetAchieved(1) ? "block" : "none")
  // Time
  document.getElementById("time").innerHTML = formateTime(game.time, 3, 3)
  document.getElementById("timeSpeed").innerHTML = game.productionDisplay == 0 ? formateTime(getTimeSpeed(), 3, 3) : formate(productionRate(game.time, getTimeSpeed(), game.productionDisplay-1), (game.productionDisplay == 0 ? 3 : game.productionDisplay+2), 3) + (game.productionDisplay == 0 ? "" : (game.productionDisplay == 1 ? "% of time " : " OoM of time "))
  document.getElementById("timeBoost").innerHTML = formate(getTimeBoost(), 4, 4)
  document.getElementById("postuni2_1").style.display = (game.universeUpgrade[2] ? "block" : "none")
  document.getElementById("postuni2_2").style.display = (game.universeUpgrade[2] ? "block" : "none")
  // Misc
  document.getElementById("title").innerHTML = formate(game.atoms, 0, 2) + " atoms, " + formate(game.size, 0, 2) + " meters"
  document.getElementById("t2").style.display = (isPrestigeAvailable(1) || game.achievement.includes(21) ? "inline-block" : "none")
  document.getElementById("gameSpeed").textContent = (gameSpeed().eq(1) ? "" : "Game Speed: " + formate(gameSpeed(), 2, 2) + "x")
}

function renderTab1(){
  // Generators
  for (let i=1; i<8.5; i++){
    document.getElementById("gen" + i).style.display = (i == 1 ? "block" : (game.generator[i-1].gt(0) ? "block" : "none"))
    document.getElementById("gen" + i + "Bought").innerHTML = formate(game.generatorBought[i], 0, 3)
    document.getElementById("gen" + i + "Amount").innerHTML = formate(game.generator[i], 0, 2)
    document.getElementById("gen" + i + "Speed").innerHTML = formate(game.productionDisplay == 0 ? getGeneratorSpeed(i+1).mul(gameSpeed()) : productionRate(game.generator[i],getGeneratorSpeed(i+1).mul(gameSpeed()),game.productionDisplay-1), (game.productionDisplay == 0 ? 0 : game.productionDisplay+1), 2) + (game.productionDisplay == 0 ? "" : (game.productionDisplay == 1 ? "%" : " OoM"))
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
}

function renderTab2(){
  // universe reset
  document.getElementById("uniReset").innerHTML = isPrestigeAvailable(1) ? "Reset for " + formate(getPrestigeGain(1), 2, 2) + " Universe Points" : "Reach " + formate(new Decimal(1e80), 2, 2) + " atoms and " + formate(new Decimal(8.8e26), 2, 2) + " meters to reset"
  document.getElementById("uniPts").innerHTML = formate(game.universePoints, 2, 2)
  
  document.getElementById("postuni2_3").style.display = (game.universeUpgrade[2] ? "block" : "none")
  // universe upgrades
  for (let i=1; i<10.5; i++){
    document.getElementById("uniUpg" + i + "Cost").innerHTML = formate(universeUpgradeCost[i], 0, 2)
    document.getElementById("uniUpg" + i + "Bought").innerHTML = game.universeUpgrade[i] ? "(BOUGHT)" : ""
  }
  for (let i=1; i<1.5; i++){
    document.getElementById("repeatUniUpg" + i + "Cost").innerHTML = formate(getRepeatableUniverseUpgradeCost(1, 1), 0, 2)
    document.getElementById("repeatUniUpg" + i + "Level").innerHTML = formate(game.repeatableUniverseUpgrade[i], 0, 2)
  }
}

function renderTab101(){
  document.getElementById("notation").innerHTML = "Notation: " + getNotation()
  document.getElementById("timedisplay").innerHTML = "Time Display: " + getTimeDisplay()
  document.getElementById("productiondisplay").innerHTML = "Production Display: " + getProductionDisplay()
}

function renderTab102(){
  document.getElementById("statistic1").textContent = formateTime((game.tLast - game.tStart)/1000, 3, 3)
  document.getElementById("statistic2").textContent = formate(game.totalAtoms, 2, 2)
  document.getElementById("statistic3").textContent = formate(game.bestSize, 2, 2)
  document.getElementById("statistic4").textContent = formateTime(game.tPlayedWTimeSpeed, 3, 3)
  document.getElementById("statistic5").textContent = formate(game.bestUniPtsInOneReset, 2, 2)
  
  document.getElementById("resourcestat1").textContent = 
    "Your atoms is enough to fill " + (game.atoms.gte(1e80) ? formate(game.atoms.log(1e80).floor(), 0, 2) + " Universes" + (game.atoms.lt("e8e7") ? " and " + formate(game.atoms.div(new Decimal(1e80).pow(game.atoms.max(1).log(1e80).floor())).log(1e80).mul(100), 3, 3) + "% of another" : "") :
                                       formate(game.atoms.div(new Decimal(1e80).pow(game.atoms.max(1).log(1e80).floor())).log(1e80).mul(100), 3, 3) + "% of universe") + " (" + formate(game.atoms.max(1).log(1e80).ceil().max(1), 0, 2) + " Universe" + (game.atoms.gte(1e80) ? "s" : "") + " = " + formate(new Decimal(1e80).pow(game.atoms.max(1).log(1e80).ceil().max(1)), 2, 2) + " atoms)"
  document.getElementById("resourcestat2").textContent = 
    "Your size is enough to explain " + (game.size.gte(8.8e26) ? formate(game.size.log(8.8e26).floor(), 0, 2) + " Universes" + (game.size.lt(new Decimal(8.8e26).pow(1e6)) ? " and " + formate(game.size.div(new Decimal(8.8e26).pow(game.size.max(1).log(8.8e26).floor())).log(8.8e26).mul(100), 3, 3) + "% of another" : "") :
                                         formate(game.size.max(1).div(new Decimal(8.8e26).pow(game.size.max(1).log(8.8e26).floor())).log(8.8e26).mul(100), 3, 3) + "% of universe") + " (" + formate(game.size.max(1).log(8.8e26).ceil().max(1), 0, 2) + " Universe" + (game.size.gte(8.8e26) ? "s" : "") + " = " + formate(new Decimal(8.8e26).pow(game.size.max(1).log(8.8e26).ceil().max(1)), 2, 2) + " meters)"
  document.getElementById("resourcestat3").textContent = 
    "Your age is enough to goes " + (game.time.gte(31.536e6*13.799e9) ? formate(game.time.log(31.536e6*13.799e9).floor(), 0, 2) + " Universes" + (game.time.lt(new Decimal(31.536e6*13.799e9).pow(1e6)) ? " and " + formate(game.time.max(1).div(new Decimal(31.536e6*13.799e9).pow(game.time.max(1).log(31.536e6*13.799e9).floor())).log(31.536e6*13.799e9).mul(100), 3, 3) + "% of another" : "") :
                                     formate(game.time.max(1).div(new Decimal(31.536e6*13.799e9).pow(game.time.max(1).log(31.536e6*13.799e9).floor())).log(31.536e6*13.799e9).mul(100), 3, 3) + "% of universe") + " (" + formate(game.time.max(1).log(31.536e6*13.799e9).ceil().max(1), 0, 2) + " Universe = " + (game.time.gte(31.536e6*13.799e9) ? "s" : "") + formate(new Decimal(31.536e6*13.799e9).pow(game.time.max(1).log(31.536e6*13.799e9).ceil().max(1)), 3, 3) + " seconds)"
  // Mantissa Part is hidden after ^1 M because it no longer accelerate
}

function renderTab103(){
  document.getElementById("achieveTotal").textContent = game.achievement.length.toLocaleString()
  updateAchievement()
}