function updateStuffs(ms){
  renderVariable(ms)
  renderMain()
  if (game.tab == 1) renderTab1()
  if (game.tab == 2) renderTab2()
  if (game.tab == 3) renderTab3()
  if (game.tab == 4) renderTab4()
  if (game.tab == 101) renderTab101()
  if (game.tab == 102) renderTab102()
  if (game.tab == 103) renderTab103()
  if (game.tab == 104) renderTab104()
}

function renderVariable(ms){
  updateGenerator(gameSpeed().mul(ms)) // update Generators and Atoms amount
  if (game.atoms.gte(new Decimal(2).pow(1024)) && !game.achievement.includes(31)) game.atoms = new Decimal(2).pow(1024)
  if (game.generatorBoost.gte(game.bestGenBoost)) game.bestGenBoost = game.generatorBoost
  updateSize(gameSpeed().mul(ms)) // update Universe size
  updateTime(ms) // update Universe time
  getAchievement()
}

function renderMain(){
  // Atom
  document.getElementById("atom").innerHTML = "You have " + formate(game.atoms, 2, 2) + " atoms in your universe"
  document.getElementById("atomSpeed").innerHTML = "You are getting " + formate(game.productionDisplay == 0 ? getGeneratorSpeed(1).mul(gameSpeed()) : productionRate(game.atoms, getGeneratorSpeed(1).mul(gameSpeed()), game.productionDisplay-1), (game.productionDisplay == 0 ? 2 : game.productionDisplay+1), 2) + (game.productionDisplay == 0 ? "" : (game.productionDisplay == 1 ? "% of " : " OoM of ")) + " atoms per second"
  document.getElementById("atom").style.display = (!game.alternateMain ? "block" : "none")
  document.getElementById("atomSpeed").style.display = (!game.alternateMain ? "block" : "none")
  
  document.getElementById("atomAlternate").innerHTML = "Atoms: " + formate(game.atoms, 2, 2) + " (+" + formate(game.productionDisplay == 0 ? getGeneratorSpeed(1).mul(gameSpeed()) : productionRate(game.atoms, getGeneratorSpeed(1).mul(gameSpeed()), game.productionDisplay-1), (game.productionDisplay == 0 ? 2 : game.productionDisplay+1), 2) + (game.productionDisplay == 0 ? "" : (game.productionDisplay == 1 ? "%" : " OoM")) + "/s)"
  document.getElementById("atomAlternate").style.display = (game.alternateMain ? "block" : "none")
  // Size
  document.getElementById("size").innerHTML = "Your universe size is " + formate(game.size, 2, 2) + " meter"
  document.getElementById("sizeSpeed").innerHTML = "They are explaining universe size by " + formate(game.productionDisplay == 0 ? getSizeSpeed().mul(gameSpeed()) : productionRate(game.size, getSizeSpeed().mul(gameSpeed()), game.productionDisplay-1), (game.productionDisplay == 0 ? 2 : game.productionDisplay+1), 2) + (game.productionDisplay == 0 ? "" : (game.productionDisplay == 1 ? "% of " : " OoM of ")) + " meters per second"
  document.getElementById("sizeBoost").innerHTML = "They multiply all Generator multipliers by " + formate(getSizeBoost(), 3, 3)
  document.getElementById("sizeSpeed").style.display = (isFullSetAchieved(1) && !game.alternateMain ? "block" : "none")
  document.getElementById("size").style.display = (isFullSetAchieved(1) && !game.alternateMain ? "block" : "none")
  document.getElementById("sizeBoost").style.display = (isFullSetAchieved(1) && !game.alternateMain ? "block" : "none")
  
  document.getElementById("sizeAlternate").innerHTML = "Size: " + formate(game.size, 2, 2) + " meters (+" + formate(game.productionDisplay == 0 ? getSizeSpeed().mul(gameSpeed()) : productionRate(game.size, getSizeSpeed().mul(gameSpeed()), game.productionDisplay-1), (game.productionDisplay == 0 ? 2 : game.productionDisplay+1), 2) + (game.productionDisplay == 0 ? "" : (game.productionDisplay == 1 ? "%" : " OoM")) + "/s, based on Atoms)"
  document.getElementById("sizeAlternate2").innerHTML = "→ " + formate(getSizeBoost(), 3, 3) + "x all Generator multipliers"
  document.getElementById("sizeAlternate").style.display = (isFullSetAchieved(1) && game.alternateMain ? "block" : "none")
  document.getElementById("sizeAlternate2").style.display = (isFullSetAchieved(1) && game.alternateMain ? "block" : "none")
  // Time
  document.getElementById("time").innerHTML = "Your universe's age is " + formateTime(game.time, 3, 3)
  document.getElementById("timeBoost").innerHTML = "They're raising all Generator multipliers to the power of " + formate(getTimeBoost(), 4, 4)
  document.getElementById("time").style.display = (game.universeUpgrade[2] && !game.alternateMain ? "block" : "none")
  document.getElementById("timeBoost").style.display = (game.universeUpgrade[2] && !game.alternateMain ? "block" : "none")
  
  document.getElementById("timeAlternate").innerHTML = "Time: " + formateTime(game.time, 3, 3) + " (+" + formateTime(getTimeSpeed(), 3, 3) + "/s)"
  document.getElementById("timeAlternate2").innerHTML = "→ ^" + formate(getTimeBoost(), 4, 4) + " all Generators multiplier"
  document.getElementById("timeAlternate").style.display = (game.universeUpgrade[2] && game.alternateMain ? "block" : "none")
  document.getElementById("timeAlternate2").style.display = (game.universeUpgrade[2] && game.alternateMain ? "block" : "none")
  // Misc
  document.getElementById("title").innerHTML = formate(game.atoms, 0, 2) + " atoms, " + formate(game.size, 0, 2) + " meters"
  document.getElementById("t2").style.display = (isPrestigeAvailable(1) || game.achievement.includes(21) ? "inline-block" : "none")
  document.getElementById("t3").style.display = (isFullSetAchieved(2) ? "inline-block" : "none")
  document.getElementById("t4").style.display = (game.achievement.includes(34) ? "inline-block" : "none")
  document.getElementById("t104").style.display = (isFullSetAchieved(1) ? "inline-block" : "none")
  document.getElementById("gameSpeed").textContent = (gameSpeed().eq(1) ? "" : "Game Speed: " + formate(gameSpeed(), 2, 2) + "x")
}

function renderTab1(){
  // Generators
  for (let i=1; i<8.5; i++){
    document.getElementById("gen" + i).style.display = (i == 1 ? "block" : (game.generator[i-1].gt(0) || game.achievement.includes(31) ? "block" : "none"))
    document.getElementById("gen" + i + "Bought").innerHTML = formate(game.generatorBought[i], 0, 3)
    document.getElementById("gen" + i + "Amount").innerHTML = formate(game.generator[i], 0, (i == 8 ? 3 : 2))
    document.getElementById("gen" + i + "Speed").innerHTML = formate(game.productionDisplay == 0 ? getGeneratorSpeed(i+1).mul(gameSpeed()) : productionRate(game.generator[i],getGeneratorSpeed(i+1).mul(gameSpeed()),game.productionDisplay-1), (game.productionDisplay == 0 ? 0 : game.productionDisplay+1), 2) + (game.productionDisplay == 0 ? "" : (game.productionDisplay == 1 ? "%" : " OoM"))
    document.getElementById("gen" + i + "Multi").innerHTML = formate(getGeneratorMulti(i), 2, 2)
    document.getElementById("gen" + i + "Cost").innerHTML = formate(getGeneratorCost(i), 0, 2)
  }
  // Generator Boost
  document.getElementById("genBoostAmount").innerHTML = formate(game.generatorBoost, 0, 3) + (getFreeGenBoost().gt(0) ? "+" + formate(getFreeGenBoost(), 0, 3) : "")
  document.getElementById("genBoostCost").innerHTML = formate(getGeneratorBoostCost(), 0, 3)
  document.getElementById("genB").style.display = (game.achievement.includes(21) ? "block" : "none")
  // Generator Boost Effect
  document.getElementById("genBoostEff1").innerHTML = formate(getGeneratorBoostBaseEffect()[1].pow(getTotalGenBoost(0)), 2, 2)
  document.getElementById("genBoostEff2").innerHTML = formate(getTotalGenBoost(0).mul(getGeneratorBoostBaseEffect()[2]), 3, 2)
  document.getElementById("genBoostEff3").innerHTML = formate(getTotalGenBoost(game.achievement.includes(38)).mul(getGeneratorBoostBaseEffect()[3]), 0, 2)
}

function renderTab2(){
  // universe reset
  document.getElementById("uniReset").innerHTML = game.challenge ? "You are currently in a Challenge" : (isPrestigeAvailable(1) ? "Reset for " + formate(getPrestigeGain(1), 2, 2) + " Universe Points (" + formate(getPrestigeGain(1).div((game.tLast - game.tLastUniReset)/1000), 2, 2) + "/s)" : "Reach " + formate(new Decimal(1e80), 2, 2) + " atoms and " + formate(new Decimal(8.8e26), 2, 2) + " meters to reset")
  document.getElementById("uniPts").innerHTML = formate(game.universePoints, 2, 2)
  // universe upgrades
  for (let i=1; i<10.5; i++){
    document.getElementById("uniUpg" + i + "Cost").innerHTML = formate(universeUpgradeCost[i], 0, 2)
    document.getElementById("uniUpg" + i + "Bought").innerHTML = game.universeUpgrade[i] ? "(BOUGHT)" : ""
  }
  for (let i=1; i<2.5; i++){
    document.getElementById("repeatUniUpg" + i + "Cost").innerHTML = formate(getRepeatableUniverseUpgradeCost(1, i), 0, 2)
    document.getElementById("repeatUniUpg" + i + "Level").innerHTML = formate(game.repeatableUniverseUpgrade[i], 0, 2)
    document.getElementById("uniRep" + i + "Eff").innerHTML = formate(getRepeatableUpgradeEffect(1, i), uniUpgDps[i], 2)
  }
  document.getElementById("uniRep2EffBase").innerHTML = formate(new Decimal(1e27), 0, 2)
  document.getElementById("uniUpg1Eff").innerHTML = formate(getUpgradeEffect(1, 1), 2, 2)
  document.getElementById("uniUpg2Eff").innerHTML = formateTime(getTimeSpeed(), 3, 3)
  document.getElementById("uniUpg3Eff").innerHTML = formate(getUpgradeEffect(1, 3), 2, 2)
  document.getElementById("uniUpg6Eff1").innerHTML = formate(getUpgradeEffect(1, 6).pow(3), 2, 2)
  document.getElementById("uniUpg6Eff2").innerHTML = formate(getUpgradeEffect(1, 6).pow(1), 2, 2)
}

const uniUpgDps = [null, 0, 0]

function renderTab3(){
  document.getElementById("activeUniChal").innerHTML = game.challenge ? "in Challenge " + game.challenge : "not in a Challenge"
  for (let i=1; i<4.5; i++){
    document.getElementById("uniChal" + i).style.display = (game.totalAtoms.gte(challengeReq[i]) ? "inline-block" : "none")
    document.getElementById("uniChal" + i + "Goal").innerHTML = formate(challengeGoal[i], 0, 2)
    document.getElementById("uniChal" + i + "Comp").innerHTML = game.challengeCompletion[i] ? "(COMPLETED)" : ""
  }
  document.getElementById("uniChalUnl").innerHTML = unlockedChallenges().toLocaleString()
  document.getElementById("uniChalReq").innerHTML = formate(challengeReq[unlockedChallenges() + 1], 2, 2, 1)
  document.getElementById("uniChal1Eff1").innerHTML = formate(new Decimal(1e16), 0, 2)
  document.getElementById("uniChal1Eff2").innerHTML = formate(new Decimal(1e4), 0, 2)
  document.getElementById("uniChal1Reward").innerHTML = formate(new Decimal(5e3), 0, 2)
  document.getElementById("uniChal3Reward").innerHTML = formate(getUniChal3Rew(), 2, 2)
  document.getElementById("uniChal3Req").innerHTML = formate(new Decimal(1e143), 0, 2)
  document.getElementById("exitChallenge").innerHTML = game.atoms.gte(challengeGoal[game.challenge]) && game.challenge !== 0 ? "Complete Challenge" : "Exit Challenge"
  document.getElementById("totalChallengeComp").innerHTML = getTotalChallengeCompletion(1).toLocaleString()
  document.getElementById("metaChallengeReward").innerHTML = formate(getTotalChallengeCompletion(1) * 50, 0, 2)
}

function getUniChal3Rew(){
  let base = getGeneratorMulti(8).add(10).log10().pow(0.75)
  return base
}

function renderTab4(){
  document.getElementById("toggleAutomation1").style.display = (game.achievement.includes(34) ? "inline-block" : "none")
  document.getElementById("toggleAutomation2").style.display = (game.achievement.includes(38) ? "inline-block" : "none")
  document.getElementById("auto1").innerHTML = (game.autoGen ? "ON" : "OFF")
  document.getElementById("auto2").innerHTML = (game.autoGenBoost ? "ON" : "OFF")
}

function toggleAutomation(id){
  if (id == 1){
    if (game.autoGen == true) game.autoGen = false
    else game.autoGen = true
  }
  if (id == 2){
    if (game.autoGenBoost == true) game.autoGenBoost = false
    else game.autoGenBoost = true
  }
}

function renderTab101(){
  document.getElementById("notation").innerHTML = "Notation: " + getNotation()
  document.getElementById("timedisplay").innerHTML = "Time Display: " + getTimeDisplay()
  document.getElementById("productiondisplay").innerHTML = "Production Display: " + getProductionDisplay()
  document.getElementById("alternatedisplay").innerHTML = "Alternate Display: " + (game.alternateMain ? "ON" : "OFF")
}

function renderTab102(){
  document.getElementById("statistic1").textContent = "You have played for " + formateTime((game.tLast - game.tStart)/1000, 3, 3)
  document.getElementById("statistic2").textContent = "You have made a total of " + formate(game.totalAtoms, 2, 2) + " atoms"
  document.getElementById("statistic3").textContent = (isFullSetAchieved(1) ? "Your best Universe Size was " + formate(game.bestSize, 2, 2) + " meters" : "")
  document.getElementById("statistic4").textContent = (game.achievement.includes(21) ? "You have spent " + formateTime((game.tLast - game.tLastUniReset)/1000, 3, 3) + " in this " + (game.challenge ? "Challenge" : "Universe Reset") : "")
  document.getElementById("statistic5").textContent = (game.achievement.includes(21) ? "Your best Universe Points gained in one reset was " + formate(game.bestUniPtsInOneReset, 2, 2) : "")
  
  document.getElementById("resourcestat1").textContent = 
    "Your atoms are enough to fill " + (game.atoms.gte(1e80) ? formate(game.atoms.log(1e80).floor(), 0, 2) + " Universes" + (game.atoms.lt("e8e7") ? " and " + formate(game.atoms.div(new Decimal(1e80).pow(game.atoms.max(1).log(1e80).floor())).log(1e80).mul(100), 3, 3) + "% of another" : "") :
                                       formate(game.atoms.max(1).div(new Decimal(1e80).pow(game.atoms.max(1).log(1e80).floor())).log(1e80).mul(100), 3, 3) + "% of a universe") + " (" + formate(game.atoms.max(1).log(1e80).ceil().max(1), 0, 2) + " Universe" + (game.atoms.gte(1e80) ? "s" : "") + " = " + formate(new Decimal(1e80).pow(game.atoms.max(1).log(1e80).ceil().max(1)), 2, 2) + " atoms)"
  document.getElementById("resourcestat2").textContent = 
    "Your universe size is enough to explain " + (game.size.gte(8.8e26) ? formate(game.size.log(8.8e26).floor(), 0, 2) + " Universes" + (game.size.lt(new Decimal(8.8e26).pow(1e6)) ? " and " + formate(game.size.div(new Decimal(8.8e26).pow(game.size.max(1).log(8.8e26).floor())).log(8.8e26).mul(100), 3, 3) + "% of another" : "") :
                                         formate(game.size.max(1).div(new Decimal(8.8e26).pow(game.size.max(1).log(8.8e26).floor())).log(8.8e26).mul(100), 3, 3) + "% of universe") + " (" + formate(game.size.max(1).log(8.8e26).ceil().max(1), 0, 2) + " Universe" + (game.size.gte(8.8e26) ? "s" : "") + " = " + formate(new Decimal(8.8e26).pow(game.size.max(1).log(8.8e26).ceil().max(1)), 2, 2) + " meters)"
  document.getElementById("resourcestat3").textContent = 
    "Your universe age is enough to last " + (game.time.gte(31.536e6*13.799e9) ? formate(game.time.log(31.536e6*13.799e9).floor(), 0, 2) + " Universes" + (game.time.lt(new Decimal(31.536e6*13.799e9).pow(1e6)) ? " and " + formate(game.time.max(1).div(new Decimal(31.536e6*13.799e9).pow(game.time.max(1).log(31.536e6*13.799e9).floor())).log(31.536e6*13.799e9).mul(100), 3, 3) + "% of another" : "") :
                                     formate(game.time.max(1).div(new Decimal(31.536e6*13.799e9).pow(game.time.max(1).log(31.536e6*13.799e9).floor())).log(31.536e6*13.799e9).mul(100), 3, 3) + "% of a universe") + " (" + formate(game.time.max(1).log(31.536e6*13.799e9).ceil().max(1), 0, 2) + " Universe = " + (game.time.gte(31.536e6*13.799e9) ? "s" : "") + formate(new Decimal(31.536e6*13.799e9).pow(game.time.max(1).log(31.536e6*13.799e9).ceil().max(1)), 3, 3) + " seconds)"
  // Mantissa Part is hidden after ^1 M because it no longer accelerate
  
  document.getElementById("resourcestat2").style.display = (isFullSetAchieved(1) ? "inline-block" : "none")
  document.getElementById("resourcestat3").style.display = (game.universeUpgrade[2] ? "inline-block" : "none")
}

function renderTab103(){
  document.getElementById("achieveTotal").textContent = game.achievement.length.toLocaleString()
  updateAchievement()
}

function renderTab104(){
  document.getElementById("softcaps_size").innerHTML = (getBaseSizeSpeed().gte(new Decimal(10).pow(getResourceSoftcapStart(0))) ? "Universe Explain Speed: Start at " + formate(new Decimal(10).pow(getResourceSoftcapStart(0)), 2, 2) + "/s, Exponent ^" + formate(getResourceSoftcapEff(0), 3, 3) : "")
  document.getElementById("softcaps_generator_bought").innerHTML = (isAnyGenReachPostSoftCap() ? "Generator Bought Boost: Start at " + formate(getUpgradeSoftcapStart(), 0, 2) + ", Brought ^" + formate(getUpgradeSoftcapEff(), 3, 3) : "")
  document.getElementById("softcaps_generator_multi").innerHTML = (isAnyGenMultiReachPostSoftCap() ? "Generator Multi: Start at " + formate(new Decimal(10).pow(getGenMultiSoftcapStart(1)), 2, 2) + "x, Exponent ^" + formate(getGenMultiSoftcapEff(1), 3, 3) : "")
  document.getElementById("softcaps_universe_upgrade_6").innerHTML = (game.universeUpgrade[6] && game.time.add(1).gte(3600) ? "Universe Upgrade 6: Start at " + formate(new Decimal(3600), 0, 2) + "x of Size Speed and " + formate(new Decimal(3600).pow(3), 2, 2) + "x of Atoms gain, ^" + formate(new Decimal(0.5), 3, 3) : "")
  document.getElementById("softcaps_universe_points_gain").innerHTML = (game.universePoints.gte(new Decimal(10).pow(getResourceSoftcapStart(1))) || getBasePrestigeGain(1).gte(new Decimal(10).pow(getResourceSoftcapStart(1))) ? "Universe Points gain: Start at " + formate(new Decimal(10).pow(getResourceSoftcapStart(1)), 2, 2) + ", Exponent ^" + formate(getResourceSoftcapEff(1), 3, 3) : "")
  document.getElementById("softcaps_universe_upgrade_r1").innerHTML = (game.repeatableUniverseUpgrade[1].gte(getUniUpgradeSoftcapStart(1)) ? "Universe Upgrade 1: Start at " + formate(getUniUpgradeSoftcapStart(1), 0, 2) + ", Brought ^" + formate(getUniUpgradeSoftcapEff(1), 3, 3) : "")
  document.getElementById("softcaps_universe_upgrade_r2").innerHTML = (game.repeatableUniverseUpgrade[2].gte(getUniUpgradeSoftcapStart(2)) ? "Universe Upgrade 2: Start at " + formate(getUniUpgradeSoftcapStart(2), 0, 2) + ", Brought ^" + formate(getUniUpgradeSoftcapEff(2), 3, 3) : "")
  
}

function isAnyGenReachPostSoftCap(){
  let output = false
  for (let i = 1; i < 8.5; i++){
    if (game.generatorBought[i].gte(getUpgradeSoftcapStart())) output = true
  }
  return output
}

function isAnyGenMultiReachPostSoftCap(){
  let output = false
  for (let i = 1; i < 8.5; i++){
    if (getGeneratorMulti(i).gte(new Decimal(10).pow(getGenMultiSoftcapStart(1)))) output = true
  }
  return output
}
