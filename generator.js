function updateGen(ms){
  game.atoms = game.atoms.add(game.generator[1].mul(genGenMulti(1)).mul(ms))
  for (let i=1; i<7.5; i++){
    game.generator[i] = game.generator[i].add(game.generator[i+1].mul(genGenMulti(i+1)).mul(ms))
  }
}

function getGenMulti(gen){
  let base = new Decimal(2).pow(generatorBought[gen])
  base = base.mul(getSizeBoost())
  return base
}