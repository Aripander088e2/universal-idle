function enterChallenge(layer, id){
  if (game.challenge == 0 && (getChallengeReq(layer, id) || game.challengeCompletion[id]) && game.totalAtoms.gte(challengeReq[id])){
    game.challenge = id
    game.atoms = atomsOnReset()
    game.size = new Decimal(1)
    game.generator = [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
    game.generatorBought =  [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
    game.generatorBoost = new Decimal(0)
    game.tLastUniReset = Date.now()
  }
}

function exitChallenge(layer){
  if (game.challenge !== 0){
    if (game.atoms.gte(challengeGoal[game.challenge])) game.challengeCompletion[game.challenge] = true
    game.challenge = 0
    game.atoms = atomsOnReset()
    game.size = new Decimal(1)
    game.generator = [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
    game.generatorBought =  [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)]
    game.generatorBoost = new Decimal(0)
    game.tLastUniReset = Date.now()
  }
}

function getTotalChallengeCompletion(layer){
  let output = 0
  if (layer == 1){
    for (let i = 1; i < 4.5; i++){
      if (game.challengeCompletion[i]) output += 1
    }
  }
  return output
}

function getChallengeReq(layer, id){
  if (layer == 1){
    switch(id){
    case 1:
      return game.universePoints.gte(1000)
      break;
    case 2:
      return gameSpeed().gte(1.44)
      break;
    case 3:
      return game.bestSize.gte(1e143)
      break;
    case 4:
      return game.generator[8].gte(101)
      break;
    default:
      return false
    }
  }
}

function unlockedChallenges(){
  let x = 0
  for (let i = 1; i < 4.5; i++){
    if (game.totalAtoms.gte(challengeReq[i])) x++
  }
  return x
}

const challengeReq = [null, new Decimal(2).pow(1024), new Decimal("1e430"), new Decimal("1e600"), new Decimal("1e850"), new Decimal(Infinity), new Decimal(Infinity), new Decimal(Infinity), new Decimal(Infinity), new Decimal(Infinity), new Decimal(Infinity)]
const challengeGoal = [null, new Decimal(1e80), new Decimal(1e108), new Decimal(1e120), new Decimal(1e80), new Decimal(Infinity), new Decimal(Infinity), new Decimal(Infinity), new Decimal(Infinity), new Decimal(Infinity), new Decimal(Infinity)]