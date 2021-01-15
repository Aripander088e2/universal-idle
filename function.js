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