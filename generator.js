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
  base = base.pow(getGeneratorExp(gen))
  return base
}

function getGeneratorExp(gen){
  let base = new Decimal(1)
  if (game.atoms.gte(1e80)) base = base.div(game.atoms.log10().div(80).pow(0.5))
  return base
}

function getSizeSpeed(){
  let base = (game.atoms.gte(1024) && game.generator[2].gt(0) ? game.atoms.pow(0.3).div(8) : new Decimal(0))
  if (game.size.gte(4.4e26)) base = base.pow(game.size.log10().div(new Decimal(4.4).log10()).add(26)).pow(0.5)
  return base
}

function getSizeBoost(){
  let base = game.size.log(10).add(1)
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
    game.generatorBought[gen] = game.generatorBought[gen].add(1)
    game.generator[gen] = game.generator[gen].add(1)
  }
}

function buyMaxGenerator(gen){
  let maxBulk = game.atoms.max(1).log10().sub(getGeneratorCost(gen).log10()).div(generatorCostScaling[gen].log10()).add(1).floor().max(0)
  if (game.atoms.gte(getGeneratorCost[gen]) && maxBulk.gt(0)){
    game.atoms = game.atoms.sub(getGeneratorCost(gen).mul(generatorCostScaling[gen].pow(maxBulk.sub(1))))
    game.generatorBought[gen] = game.generatorBought[gen].add(maxBulk)
    game.generator[gen] = game.generator[gen].add(maxBulk)
  }
}

function buyMaxAllGenerator(){
  for (let i=8; i>0.5; i--){
    buyMaxGenerator(i)
  }
  return
}