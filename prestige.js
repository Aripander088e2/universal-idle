function prestige(layer){ // -1 is from Universe Reset button
  if (layer == 1){
    if (isPrestigeAvailable(layer)){ 
      if(!game.achievement.includes(25) && game.generator[5].eq(0) && game.generator[6].eq(0) && game.generator[7].eq(0) && game.generator[8].eq(0) && isPrestigeAvailable(layer)) {
        game.achievement.push(25)
        achNotify(2, 5)
      }
      if(!game.achievement.includes(21) && isPrestigeAvailable(layer)) {
        game.achievement.push(21)
        achNotify(2, 1)
      }
      game.universePoints = game.universePoints.add(getPrestigeGain(1))
      if (getPrestigeGain(1).gte(game.bestUniPtsInOneReset)) game.bestUniPtsInOneReset = getPrestigeGain(1)
      game.atoms = atomsOnReset()
      game.size = new Decimal(1)
      game.generator = [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
      game.generatorBought =  [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
      game.generatorBoost = new Decimal(0)
      game.tLastUniReset = Date.now()
    }
  }
}

function isPrestigeAvailable(layer){
  if (layer == 1) return game.atoms.gte(1e80) && game.size.gte(8.8e26)
}

function getBasePrestigeGain(layer){
  if (layer == 1){
    if (!isPrestigeAvailable(1)) return new Decimal(0)
    let base = new Decimal(2).pow(game.atoms.log10().div(80).sub(1))
    if (base.gte(new Decimal(10).pow(getResourceSoftcapStart(1)))) base = new Decimal(10).pow(new Decimal(getResourceSoftcapStart(1)).mul(base.log10()).pow(getResourceSoftcapEff(1)))
    return base
  }
}

function getPrestigeGain(layer){
  if (layer == 1){
    let base = getBasePrestigeGain(1)
    base = base.mul(new Decimal(1).add(getTotalGenBoost(game.achievement.includes(38)).mul(getGeneratorBoostBaseEffect()[3]).div(100)))
    base = base.mul(getRepeatableUpgradeEffect(1, 1))
    if (game.challengeCompletion[3]) base = base.mul(getUniChal3Rew())
    return base
  }
}

function getRepeatableUniverseUpgradeCost(layer, id){
  if (layer == 1){
    return repeatableUniverseUpgradeCost[id].mul(repeatableUniverseUpgradeCostScaling[id].pow(game.repeatableUniverseUpgrade[id]))
  }
}