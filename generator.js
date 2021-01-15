function updateGenerator(ms){
  game.atoms = game.atoms.add(getGeneratorSpeed(1).mul(ms).div(1000))
  game.totalAtoms = game.totalAtoms.add(getGeneratorSpeed(1).mul(ms).div(1000))
  for (let i=1; i<7.5; i++){
    game.generator[i] = game.generator[i].add(getGeneratorSpeed(i+1).mul(ms).div(1000))
  }
}

function updateSize(ms){
  game.size = game.size.add(getSizeSpeed().mul(ms).div(1000))
  if (game.size.gte(game.bestSize)) game.bestSize = game.size
}

function updateTime(ms){
  game.time = game.time.add(getTimeSpeed().mul(ms).div(1000))
}

function getGeneratorMulti(gen){
  let base = getBoughtBoostMulti().pow(game.generatorBought[gen].gte(60) ? game.generatorBought[gen].mul(60).pow(0.5) : game.generatorBought[gen])
  base = base.mul(getSizeBoost())
  base = base.mul(new Decimal(2).pow(game.generatorBoost))
  if (game.universeUpgrade[1]) base = base.mul(game.universePoints.add(1))
  if (game.achievement.includes(21) && gen == 1) base = base.mul(10)
  if (game.achievement.includes(22) && gen == 8) base = base.mul(new Decimal(1).add(game.generator[8].div(100)))
  if (game.achievement.includes(24) && gen == 8) base = base.mul(new Decimal(1).add(game.generatorBoost))
  base = base.pow(getTimeBoost())
  return base
}

function getBoughtBoostMulti(){
  let base = new Decimal(2)
  return base
}

function getGeneratorSpeed(gen){
  gen = Math.floor(gen)
  if (gen > 8.5 || gen < 0.5) return new Decimal(0)
  let base = game.generator[gen].mul(getGeneratorMulti(gen))
  if (base.gte(1)) base = base.pow(getGeneratorSpeedExp(gen))
  return base
}

function getGeneratorSpeedExp(gen){
  let base = new Decimal(1)
  return base
}

function getSizeSpeed(){
  let base = (isFullSetAchieved(1) ? game.atoms.pow(getSizeSpeedExp()).div(1e18) : new Decimal(0))
  if (base.gte(1e24)) base = new Decimal(10).pow(base.log10().mul(24).pow(0.5))
  if (isFullSetAchieved(2)) base = base.mul(1e10)
  return base
}

function getSizeSpeedExp(){
  let base = new Decimal(0.5)
  base = base.add(game.generatorBoost.div(200))
  return base
}

function getSizeBoost(){
  let base = game.size.max(1).log(10).add(1)
  return base
}

function getTimeSpeed(){
  let base = game.universeUpgrade[2] ? game.universePoints.max(1).log(1000) : new Decimal(0)
  return base
}

function getTimeBoost(){
  let base = game.time.max(1).log(13.799e9*31.536e6).div(2).add(1)
  return base
}


const generatorCost = [null, new Decimal(10), new Decimal(1e3), new Decimal(1e6), new Decimal(1e10), new Decimal(1e15), new Decimal(1e21), new Decimal(1e28), new Decimal(1e36)]
const generatorCostScaling = [null, new Decimal(10), new Decimal(100), new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e7), new Decimal(1e8)]

function getGeneratorCost(gen){
  let base = generatorCost[gen].mul(generatorCostScaling[gen].pow(game.generatorBought[gen]))
  return base
}

function getGeneratorBoostCost(){
  let base = game.generatorBoost.add(1).pow(2)
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
}

function buyGeneratorBoost(){
  if (game.generator[8].gte(getGeneratorBoostCost())){
    game.atoms = new Decimal(10)
    game.generator = [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
    game.generatorBought =  [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
    game.generatorBoost = game.generatorBoost.add(1)
  }
}

function buyMaxGeneratorBoost(){
  let max = game.generator[8].pow(0.5).floor()
  if (game.generator[8].gte(getGeneratorBoostCost())){
    game.atoms = new Decimal(10)
    game.generator = [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
    game.generatorBought =  [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
    game.generatorBoost = max
  }
}