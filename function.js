function getSizeSpeed(){
  let base = (game.atoms.gte(1000) ? game.atoms.pow(0.3).div(10) : new Decimal(0))
  return base
}

function getSizeBoost(){
  let base = game.size.log(10).add(1)
  return base
}