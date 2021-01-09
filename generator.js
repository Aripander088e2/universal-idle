function updateGenerator(ms){
  game.atoms = game.atoms.add(game.generator[1].mul(getGeneratorMulti(1)).mul(ms).div(1000))
  for (let i=1; i<7.5; i++){
    game.generator[i] = game.generator[i].add(game.generator[i+1].mul(getGeneratorMulti(i+1)).mul(ms).div(1000))
  }
}

function updateSize(ms){
  game.size = game.size.add(getSizeSpeed().mul(ms).div(1000))
}

function getGeneratorMulti(gen){
  let base = new Decimal(2).pow(game.generatorBought[gen])
  base = base.mul(getSizeBoost())
  return base
}

function getGeneratorCost(gen){
  let base = generatorCost[gen].mul(generatorCostScaling[gen].pow(game.generatorBought[gen]))
  return base
}

function buyGenerator(gen){
  if (game.atoms.gte(getGeneratorCost(gen))){
    game.atoms = game.atoms.sub(getGeneratorCost(gen))
    game.generator = game.generator[gen].add(1)
    game.generatorBought = game.generatorBought[gen].add(1)
  }
}