function updateAchievement(){
  for (let i = 1; i < 2.5; i++){
    for (let j = 1; j < 8.5; j++){
      document.getElementById("ach" + i + j).innerHTML = (game.achievement.includes(10*i+j) ? " (Achieved)" : "")
    }
    document.getElementById("achP" + i).innerHTML = "(" + getAchievementSetCompleted(i) + "/8)"
    document.getElementById("achS" + i).innerHTML = (isFullSetAchieved(i) ? " (Achieved)" : "")
  }
  document.getElementById("ach24Goal").innerHTML = formate(new Decimal(1e100), 0, 0)
  document.getElementById("achS2Reward").innerHTML = formate(new Decimal(1e10), 0, 0)
}

function getAchievement(){
  if (game.generatorBought[1].gt(0) && !game.achievement.includes(11)) game.achievement.push(11)
  if (game.generatorBought[2].gt(0) && !game.achievement.includes(12)) game.achievement.push(12)
  if (game.generatorBought[3].gt(0) && !game.achievement.includes(13)) game.achievement.push(13)
  if (game.generatorBought[4].gt(0) && !game.achievement.includes(14)) game.achievement.push(14)
  if (game.generatorBought[5].gt(0) && !game.achievement.includes(15)) game.achievement.push(15)
  if (game.generatorBought[6].gt(0) && !game.achievement.includes(16)) game.achievement.push(16)
  if (game.generatorBought[7].gt(0) && !game.achievement.includes(17)) game.achievement.push(17)
  if (game.generatorBought[8].gt(0) && !game.achievement.includes(18)) game.achievement.push(18)
  
  // see prestige.js
  if (game.generatorBought[8].eq(9) && !game.achievement.includes(22)) game.achievement.push(22)
  if (checkAch23() && !game.achievement.includes(23)) game.achievement.push(23)
  if (game.generator[8].eq(0) && game.generatorBoost.eq(0) && game.atoms.gte(1e100) && !game.achievement.includes(24)) game.achievement.push(24)
  if (false && !game.achievement.includes(25)) game.achievement.push(25) // see prestige.js
  if (false && !game.achievement.includes(26)) game.achievement.push(26)
  if (false && !game.achievement.includes(27)) game.achievement.push(27)
  if (false && !game.achievement.includes(28)) game.achievement.push(28)
}

function isFullSetAchieved(set){
  let output = true
  for (let i=1; i<8.5; i++){
    if (!game.achievement.includes(set*10+i)) output = false
  }
  return output
}

function getAchievementSetCompleted(set){
  let output = 0
  for (let i=1; i<8.5; i++){
    if (game.achievement.includes(set*10+i)) output += 1
  }
  return output
}

function checkAch23(){
  let output = false
  if (game.generatorBought[1].eq(game.generatorBought[2]) &&
    game.generatorBought[2].eq(game.generatorBought[3]) &&
    game.generatorBought[3].eq(game.generatorBought[4]) &&
    game.generatorBought[4].eq(game.generatorBought[5]) &&
    game.generatorBought[5].eq(game.generatorBought[6]) &&
    game.generatorBought[6].eq(game.generatorBought[7]) &&
    game.generatorBought[7].eq(game.generatorBought[8]) &&
    game.generatorBought[8].eq(game.generatorBoost) &&
    game.generatorBoost.gt(0)) output = true
  return output
}