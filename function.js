function gameSpeed(){
  let base = new Decimal(1)
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
      game.repeatableUniverseUpgrade[id] = game.repeatableUniverseUpgrade[id].add(1)
      game.universePoints = game.universePoints.sub(repeatableUniverseUpgradeCostScaling[id].pow(game.repeatableUniverseUpgrade[id]))
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

function getUpgradeSoftcapStart(layer){ // 0 is generators
  let base = new Decimal(60)
  return base
}

function getUpgradeSoftcapEff(layer){ // 0 is generators
  let base = new Decimal(0.5)
  return base
}

function getResourceSoftcapStart(layer){ // 0 is size, logarithm
  let base = new Decimal(24)
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

function enterChallenge(layer, id){
  if (game.challenge == 0) prestige(layer, id)
  game.challenge = id
}

function exitChallenge(layer){
  if (game.challenge !== 0){
    if (game.atoms.gte(challengeGoal[game.challenge])) game.challengeCompletion[game.challenge] = true
    game.challenge = 0
    prestige(layer, 0)
  }
}