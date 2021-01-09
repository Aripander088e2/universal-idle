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

const generatorCost = [null, new Decimal(10), new Decimal(1e3), new Decimal(1e6), new Decimal(1e10), new Decimal(1e15), new Decimal(1e21), new Decimal(1e28), new Decimal(1e36)]
const generatorCostScaling = [null, new Decimal(10), new Decimal(100), new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e7), new Decimal(1e8)]

function getGeneratorCost(gen){
  let base = generatorCost[gen].mul(generatorCostScaling[gen].pow(game.generatorBought[gen]))
  return base
}

function buyGenerator(gen){
  if (game.atoms.gte(getGeneratorCost(gen))){
    game.atoms = game.atoms.sub(getGeneratorCost(gen))
    game.generator[gen] = game.generator[gen].add(1)
    game.generatorBought[gen] = game.generatorBought[gen].add(1)
  }
}

function buyMaxGenerator(gen){
  let logten = game.atoms.log10()
}