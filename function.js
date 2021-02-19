function atomsOnReset(){
  let base = new Decimal(10)
  if (game.challenge == 3) base = new Decimal(1000)
  return base
}

function gameSpeed(){
  let base = new Decimal(1)
  if (game.achievement.includes(32)) base = base.mul(new Decimal(game.achievement.length+10).log10().pow(game.universeUpgrade[8] ? 2 : 1))
  if (isFullSetAchieved(3)) base = base.mul(getUpgradeEffect(1, 3).add(10).log10())
  return base
}

function buyUpgrade(layer, id){
  if (layer == 1){
    if (game.universePoints.gte(universeUpgradeCost[id]) && !game.universeUpgrade[id]){
      game.universeUpgrade[id] = true
      game.universePoints = game.universePoints.sub(universeUpgradeCost[id])
    }
  }
}

function buyRepeatableUpgrade(layer, id){
  if (layer == 1){
    if (game.universePoints.gte(repeatableUniverseUpgradeCost[id].mul(repeatableUniverseUpgradeCostScaling[id].pow(game.repeatableUniverseUpgrade[id])))){
      game.universePoints = game.universePoints.sub(repeatableUniverseUpgradeCost[id].mul(repeatableUniverseUpgradeCostScaling[id].pow(game.repeatableUniverseUpgrade[id])))
      game.repeatableUniverseUpgrade[id] = game.repeatableUniverseUpgrade[id].add(1)
    }
  }
}

function buyMaxRepeatableUpgrade(layer, id){
  if (layer == 1){
    let maxBulk = game.universePoints.max(1).log10().sub(getRepeatableUniverseUpgradeCost(layer, id).log10()).div(repeatableUniverseUpgradeCostScaling[id].log10()).add(1).floor().max(0)
    if (game.universePoints.gte(getRepeatableUniverseUpgradeCost(layer, id)) && maxBulk.gt(0)){
      game.universePoints = game.universePoints.sub(getRepeatableUniverseUpgradeCost(layer, id).mul(repeatableUniverseUpgradeCostScaling[id].pow(maxBulk.sub(1))))
      game.repeatableUniverseUpgrade[id] = game.repeatableUniverseUpgrade[id].add(maxBulk)
    }
  }
}

function getUpgradeEffect(layer, id){ // only non-constant boost will listed here
  if (layer == 1){
    switch(id){
      case 1:
        return game.universePoints.add(1)
        break;
      case 2:
        return getTimeSpeed()
        break;
      case 3:
        return calculateTotalGenBought().add(1).pow(0.5)
        break;
      case 6:
        let base = game.time.add(1) // base effect
        if (base.gte(3600)) base = new Decimal(3600).mul(base.div(3600).pow(0.5))
        return base
        break;
      default:
        return new Decimal(0)
    }
  }
}

function getRepeatableUpgradeEffect(layer, id){ // only non-constant boost will listed here
  if (layer == 1){
    switch(id){
      case 1:
        return new Decimal(2).pow(game.repeatableUniverseUpgrade[1].gte(getUniUpgradeSoftcapStart(1)) ? game.repeatableUniverseUpgrade[1].mul(getUniUpgradeSoftcapStart(1)).pow(getUniUpgradeSoftcapEff(1)) : game.repeatableUniverseUpgrade[1])
        break;
      case 2:
        return new Decimal(10).pow((game.repeatableUniverseUpgrade[2].gte(getUniUpgradeSoftcapStart(2)) ? game.repeatableUniverseUpgrade[2].mul(getUniUpgradeSoftcapStart(2)).pow(getUniUpgradeSoftcapEff(2)) : game.repeatableUniverseUpgrade[2]).mul(27))
        break;
      default:
        return new Decimal(0)
    }
  }
}

function getUpgradeSoftcapStart(){
  let base = new Decimal(60)
  if (game.universeUpgrade[7]) base = base.add(40)
  if (game.challenge == 4) base = new Decimal(1)
  return base
}

function getUpgradeSoftcapEff(){
  let base = new Decimal(0.5)
  if (game.challengeCompletion[3]) base = base.add(0.02)
  return base
}

function getUniUpgradeSoftcapStart(id){
  let base = [null, new Decimal(60), new Decimal(50)]
  return base[id]
}

function getUniUpgradeSoftcapEff(id){
  let base = [null, new Decimal(0.5), new Decimal(0.5)]
  return base[id]
}

function getGenMultiSoftcapStart(Stage){ // logarithm
  let start = [null,new Decimal(60)]
  start[1] = start[1].add(getRepeatableUpgradeEffect(1, 2).log10())
  if (game.challenge == 4) start[1] = new Decimal(1)
  return start[Stage]
}

function getGenMultiSoftcapEff(Stage){ // exponential rate
  let effect = [null,new Decimal(0.5)]
  return effect[Stage]
}

function getResourceSoftcapStart(layer){ // 0 is size, logarithm
  let base = new Decimal(24)
  if (layer == 0) base = base.add(getRepeatableUpgradeEffect(1, 2).log10())
  return base
}

function getResourceSoftcapEff(layer){ // 0 is size
  let base = new Decimal(0.5)
  return base
}

function productionRate(current, increase, logarithm){ // logarithm = false: ((c+i)/c-1)*100%, true: log10(c+i)-log10(c)
  current = new Decimal(current)
  increase = new Decimal(increase)
  if (logarithm){
    return current.add(increase).max(1).log(10).sub(current.max(1).log(10))
  }
  return current.add(increase).div(current.max(1)).sub(1).mul(100).max(0)
}

function getFreeGenBoost(){
  let output = new Decimal(0)
  return output
}

function getTotalGenBoost(best){ // false = current gen boost, true = best gen boost
  return (best ? game.bestGenBoost : game.generatorBoost).add(getFreeGenBoost())
}