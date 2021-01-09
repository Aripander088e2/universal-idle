function updateGen(ms){
  for (let i=1; i<7.5; i++){
    game.generator[i] = game.generator[i].add(game.generator[i+1].mul(genGenMulti(i+1)))
  }
}

function getGenMulti(gen){
  let base = new Decimal(1)
  return base
}