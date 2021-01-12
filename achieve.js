const achdesc = 
      [null, 
       [null, 
        "You gotta start somewhere: Buy a Generator I", 
        "1000 atoms is a lot: Buy a Generator II", 
        "Half life 3 CONFIRMED: Buy a Generator III", 
        "L4G: Left 4 Generators: Buy a Generator IV", 
        "5 Generators Atom Punch: Buy a Generator V", 
        "We couldn't afford 9: Buy a Generator VI", 
        "Not a luck related achievement: Buy a Generator VII", 
        "90 degrees to infinity: Buy a Generator VIII"
       ],
       [null, 
        "Perform a Universe reset", 
        "???", 
        "???", 
        "???", 
        "???", 
        "???", 
        "???", 
        "???"
       ],
      ]

const achreward =
      [null,
       [null, 
        "", 
        "", 
        "", 
        "", 
        "", 
        "", 
        "", 
        ", Reward: Your atoms explain your universe size"
       ],
       [null, 
        "", 
        "", 
        "", 
        "", 
        "", 
        "", 
        "", 
        ""
       ],
      ]

function updateAchievement(){
  for (let i = 1; i < 1.5; i++){
    for (let j = 1; j < 8.5; j++){
      document.getElementById("ach" + i + j).innerHTML = achdesc[i][j] + achreward[i][j] + (game.achievement.includes(10*i+j) ? " (Achieved)" : "")
    }
  }
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
}