function updateGenerator(ms){
  game.atoms = game.atoms.add(getGeneratorSpeed(1).mul(ms).div(10000))
  game.totalAtoms = game.totalAtoms.add(getGeneratorSpeed(1).mul(ms).div(10000))
  for (let i=1; i<7.5; i++){
    game.generator[i] = game.generator[i].add(getGeneratorSpeed(i+1).mul(ms).div(10000))
  }
}

function updateSize(ms){
  game.size = game.size.add(getSizeSpeed().mul(ms).div(10000))
  if (game.size.gte(game.bestSize)) game.bestSize = game.size
}

function updateTime(ms){
  game.time = game.time.add(getTimeSpeed().mul(ms).div(10000))
}

function getGeneratorMulti(gen){
  let base = getBoughtBoostMulti().pow(game.generatorBought[gen].gte(getUpgradeSoftcapStart()) ? game.generatorBought[gen].mul(getUpgradeSoftcapStart()).pow(getUpgradeSoftcapEff()) : game.generatorBought[gen])
  base = base.mul(getSizeBoost())
  base = base.mul(getGeneratorBoostBaseEffect()[1].pow(getTotalGenBoost(0)))
  if (game.universeUpgrade[1]) base = base.mul(getUpgradeEffect(1, 1))
  if (game.universeUpgrade[3]) base = base.mul(getUpgradeEffect(1, 3))
  if (game.achievement.includes(21) && gen == 1) base = base.mul(10)
  if (game.achievement.includes(22) && gen == 8) base = base.mul(new Decimal(1).add(game.generator[8].div(10)))
  if (game.achievement.includes(24) && gen == 8) base = base.mul(new Decimal(1).add(game.generatorBoost))
  if (game.universeUpgrade[6] && gen == 1) base = base.mul(getUpgradeEffect(1, 6).pow(3))
  if (game.challengeCompletion[1] && gen !== 1) base = base.mul(5e3)
  base = base.pow(getTimeBoost())
  if (game.achievement.includes(28)) base = base.pow(new Decimal(1).add(game.atoms.max(1).log10().div(30000)).min(1.01))
  if (base.gte(new Decimal(10).pow(getGenMultiSoftcapStart(1)))) base = new Decimal(10).pow(base.log10().mul(getGenMultiSoftcapStart(1)).pow(getGenMultiSoftcapEff(1)))
  if (game.challenge == 1 && gen == 1) base = base.div(1e16)
  if (game.challenge == 1 && gen !== 1) base = base.pow(0.425)
  if (game.challenge == 3 && gen % 2 == 1) base = base.pow(0.01)
  if (game.universeUpgrade[8] && base.gte(1)) base = base.pow(1.09)
  return base
}

function getBoughtBoostMulti(){
  if (game.challenge == 2) return new Decimal(1)
  let base = new Decimal(2)
  if (game.challengeCompletion[2]) base = base.add(0.35)
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

function getBaseSizeSpeed(){
  if (game.challenge == 2) return new Decimal(0)
  let base = (isFullSetAchieved(1) && game.generator[1].gte(1) ? game.atoms.pow(getSizeSpeedExp()).div(1e18) : new Decimal(0))
  if (base.gte(new Decimal(10).pow(getResourceSoftcapStart(0)))) base = new Decimal(10).pow(base.log10().mul(getResourceSoftcapStart(0)).pow(getResourceSoftcapEff(0)))
  return base
}

function getSizeSpeed(){
  let base = getBaseSizeSpeed()
  if (isFullSetAchieved(2)) base = base.mul(1e10)
  if (game.universeUpgrade[6]) base = base.mul(getUpgradeEffect(1, 6))
  if (game.challenge == 1) base = base.mul(1e4)
  return base
}

function getSizeSpeedExp(){
  let base = new Decimal(0.7)
  base = base.add(getTotalGenBoost(0).mul(getGeneratorBoostBaseEffect()[2]))
  return base
}

function getSizeBoost(){
  let base = game.size.max(1).log(10).add(1)
  if (game.universeUpgrade[4]) base = base.pow(2)
  return base
}

function getTimeSpeed(){
  let base = game.universeUpgrade[2] ? game.universePoints.max(1).log(1000) : new Decimal(0)
  base = base.mul(4 + getTotalChallengeCompletion(1) / 2)
  return base
}

function getTimeBoost(){
  if (game.challenge !== 0) return new Decimal(1)
  let base = game.time.max(1).log(13.799e3*31.536e2).div(2).add(1)
  return base
}

function getGeneratorBoostBaseEffect(){
  let output = [null, new Decimal(2), new Decimal(0.005), new Decimal(10)] // first one is multiply value, second one is add value, third one is add percentage
  if (game.universeUpgrade[5]) {
    output[1] = output[1].mul(1.5)
    output[2] = output[2].mul(1.5)
    output[3] = output[3].mul(1.5)
  }
  if (game.challenge == 4) output[1] = output[1].pow(new Decimal(15).mul(game.generatorBoost.max(1).pow(1.25)))
  if (game.challengeCompletion[4] && game.challenge !== 4) {
    output[1] = output[1].mul(20).pow(1.65)
    output[2] = output[2].mul(20)
  }
  return output
}

const generatorCost = [null, new Decimal(10), new Decimal(1e3), new Decimal(1e6), new Decimal(1e10), new Decimal(1e15), new Decimal(1e21), new Decimal(1e28), new Decimal(1e36)]
const generatorCostScaling = [null, new Decimal(10), new Decimal(100), new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e7), new Decimal(1e8)]

function getGeneratorCost(gen){
  if (getGenCostDivider(gen).eq(0)) return new Decimal(Infinity)
  let base = generatorCost[gen].mul(generatorCostScaling[gen].pow(game.generatorBought[gen].mul(getGenCostScalingExp(gen)))).div(getGenCostDivider(gen))
  return base
}

function getGeneratorBoostCost(){
  let base = game.generatorBoost.add(1).pow(getGenBoostCostExp())
  if (getGenBoostCostDivider().eq(0)) return new Decimal(Infinity)
  base = base.div(getGenBoostCostDivider())
  base = base.round()
  return base
}

function buyGenerator(gen){
  if (game.atoms.gte(getGeneratorCost(gen))){
    if (game.atoms.lt(new Decimal("ee12"))) game.atoms = game.atoms.sub(getGeneratorCost(gen))
    game.generatorBought[gen] = game.generatorBought[gen].add(1)
    game.generator[gen] = game.generator[gen].add(1)
  }
}

function buyMaxGenerator(gen){
  let maxBulk = game.atoms.max(1).log10().sub(getGeneratorCost(gen).log10()).div(generatorCostScaling[gen].pow(getGenCostScalingExp(gen)).log10()).add(1).floor().max(0)
  if (game.atoms.gte(getGeneratorCost[gen]) && (maxBulk.gt(0) || game.atoms.gte(new Decimal("ee12")))){
    if (game.atoms.lt(new Decimal("ee12"))) game.atoms = game.atoms.sub(getGeneratorCost(gen).mul(generatorCostScaling[gen].pow(getGenCostScalingExp(gen).mul(maxBulk.sub(1)))))
    game.generatorBought[gen] = game.generatorBought[gen].add(maxBulk)
    game.generator[gen] = game.generator[gen].add(maxBulk)
  }
}

// note: game.atoms.lt(new Decimal("ee12")) or game.atoms.gte(new Decimal("ee12")) current is a placeholder, it will be changed at someday

function buyMaxAllGenerator(){
  for (let i=8; i>0.5; i--){
    buyMaxGenerator(i)
  }
}

function getGenCostDivider(gen){
  if (game.challenge == 3 && gen % 2 == 1) return new Decimal(0)
  let base = new Decimal(1)
  return base
}

function getGenCostScalingExp(gen){
  let base = new Decimal(1)
  return base
}

function buyGeneratorBoost(){
  if (game.generator[8].gte(getGeneratorBoostCost())){
    game.atoms = atomsOnReset()
    game.generator = [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
    game.generatorBought =  [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
    game.generatorBoost = game.generatorBoost.add(3)
  }
}

function buyMaxGeneratorBoost(){
  let max = game.generator[8].mul(getGenBoostCostDivider()).round().pow(new Decimal(1).div(getGenBoostCostExp())).floor()
  if (game.generator[8].gte(getGeneratorBoostCost())){
    game.atoms = atomsOnReset()
    game.generator = [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
    game.generatorBought =  [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
    game.generatorBoost = max
  }
}


function getGenBoostCostDivider(){
  if (!game.achievement.includes(21)) return new Decimal(0)
  let base = new Decimal(1)
  return base
}

function getGenBoostCostExp(){
  let base = new Decimal(2)
  return base
}

function calculateTotalGenBought(){
  let output = new Decimal(0)
    for (let i=1; i<8.5; i++){
    output = output.add(game.generatorBought[i])
  }
  return output
}
