function enterChallenge(layer, id){
  if (game.challenge == 0) prestige(layer, id)
  game.challenge = id
}

function exitChallenge(layer){
  if (game.challenge !== 0){
    if (game.atoms.gte(challengeGoal[game.challenge])) game.challengeCompletion[game.challenge] = true
    game.challenge = 0
    prestige(layer, 0)
  }
}

function getTotalChallengeCompletion(layer){
  let output = 0
  if (layer == 1){
    for (let i = 1; i < 1.5; i++){
      if (game.challengeCompletion[i]) output += 1
    }
  }
  return output
}