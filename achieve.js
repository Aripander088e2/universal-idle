const achName = [null, 
                 [null, "You gotta start somewhere", "1000 atoms is a lot", "Half life 3 CONFIRMED", "L4G: Left 4 Generators", "5 Generators Atom Punch", "We couldn't afford 9", "Not a luck related achievement", "90 degrees to infinity"], 
                 [null, "Universal Collapser", "The Ninth Generator is a lie", "Equality", "Where is the Generator 8", "This is Hard", "Overpowered", "Squared Universe", "To Infinity"]
                ]

function updateAchievement(){
  for (let i = 1; i < 2.5; i++){
    for (let j = 1; j < 8.5; j++){
      document.getElementById("ach" + i + j).innerHTML = (game.achievement.includes(10*i+j) ? " (Achieved)" : "")
    }
    document.getElementById("achP" + i).innerHTML = "(" + getAchievementSetCompleted(i) + "/8)"
    document.getElementById("achS" + i).innerHTML = (isFullSetAchieved(i) ? " (Achieved)" : "")
  }
  document.getElementById("ach24Goal").innerHTML = formate(new Decimal(1e100), 2, 2)
  document.getElementById("ach26Goal").innerHTML = formate(new Decimal(1e50), 2, 2)
  document.getElementById("ach27Goal").innerHTML = formate(new Decimal(7.744e53), 2, 2)
  document.getElementById("ach28Goal").innerHTML = formate(new Decimal(2).pow(1024), 2, 2, 1)
  document.getElementById("achS2Reward").innerHTML = formate(new Decimal(1e10), 2, 2)
}

function getAchievement(){
  if (game.generatorBought[1].gt(0) && !game.achievement.includes(11)) {
    game.achievement.push(11)
    achNotify(1, 1)
  }
  if (game.generatorBought[2].gt(0) && !game.achievement.includes(12)) {
    game.achievement.push(12)
    achNotify(1, 2)
  }
  if (game.generatorBought[3].gt(0) && !game.achievement.includes(13)) {
    game.achievement.push(13)
    achNotify(1, 3)
  }
  if (game.generatorBought[4].gt(0) && !game.achievement.includes(14)) {
    game.achievement.push(14)
    achNotify(1, 4)
  }
  if (game.generatorBought[5].gt(0) && !game.achievement.includes(15)) {
    game.achievement.push(15)
    achNotify(1, 5)
  }
  if (game.generatorBought[6].gt(0) && !game.achievement.includes(16)) {
    game.achievement.push(16)
    achNotify(1, 6)
  }
  if (game.generatorBought[7].gt(0) && !game.achievement.includes(17)) {
    game.achievement.push(17)
    achNotify(1, 7)
  }
  if (game.generatorBought[8].gt(0) && !game.achievement.includes(18)) {
    game.achievement.push(18)
    achNotify(1, 8)
  }
  
  // ach21, see prestige.js
  
  
  if (game.generatorBought[8].eq(9) && !game.achievement.includes(22)) {
    game.achievement.push(22)
    achNotify(2, 2)
  }
  if (checkAch23() && !game.achievement.includes(23)) {
    game.achievement.push(23)
    achNotify(2, 3)
  }
  if (game.generator[8].eq(0) && game.generatorBoost.eq(0) && game.atoms.gte(1e100) && !game.achievement.includes(24)) {
    game.achievement.push(24)
    achNotify(2, 4)
  }
  // ach25, see prestige.js
  
  
  if (checkAch26() && !game.achievement.includes(26)) {
    game.achievement.push(26)
    achNotify(2, 6)
  }
  if (game.size.gte(7.744e53) && !game.achievement.includes(27)) {
    game.achievement.push(27)
    achNotify(2, 7)
  }
  if (game.atoms.gte(new Decimal(2).pow(1024)) && !game.achievement.includes(28)) {
    game.achievement.push(28)
    achNotify(2, 8)
  }
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

function checkAch26(){
  let output = false
  for (let i = 1; i < 8.5; i++){
    if (getGeneratorMulti(i).gte(1e50)) output = true
  }
  return output
}

function achNotify(r, c){
  $.notify(achName[r][c] + " (" + getAchievementSetCompleted(r) + "/8 of set " + r + " achievements completed)","achieve")
  if (isFullSetAchieved(r)) $.notify("Full Set " + r + " achievement completed!","achieve")
}