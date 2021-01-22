function prestige(layer){
  if (layer == 1){
    if (isPrestigeAvailable(layer)){
      if(!game.achievement.includes(25) && game.generator[5].eq(0) && game.generator[6].eq(0) && game.generator[7].eq(0) && game.generator[8].eq(0)) game.achievement.push(25)
      game.universePoints = game.universePoints.add(getPrestigeGain(1))
      game.atoms = new Decimal(10)
      game.size = new Decimal(1)
      game.generator = [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
      game.generatorBought =  [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
      game.generatorBoost = new Decimal(0)
      if(!game.achievement.includes(21)) game.achievement.push(21)
    }
  }
}

function isPrestigeAvailable(layer){
  if (layer == 1) return game.atoms.gte(1e80) && game.size.gte(8.8e26)
}

function getPrestigeGain(layer){
  if (layer == 1){
    if (!isPrestigeAvailable(1)) return new Decimal(0)
    let base = new Decimal(2).pow(game.atoms.log10().div(80).sub(1))
    if (base.gte(1e24)) base = new Decimal(10).pow(new Decimal(24).mul(base.log10()).pow(0.5))
    base = base.mul(new Decimal(1).add(game.generatorBoost.mul(getGeneratorBoostBaseEffect()[3]).div(100)))
    base = base.mul(new Decimal(2).pow(game.repeatableUniverseUpgrade[1].gte(60) ? game.repeatableUniverseUpgrade[1].mul(60).pow(0.5) : game.repeatableUniverseUpgrade[1]))
    return base
  }
}
