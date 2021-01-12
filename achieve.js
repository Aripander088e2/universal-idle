const achdesc = 
      [null, 
       [null, 
        "You gotta start somewhere: Buy a Generator I", 
        "1000 atoms is a lot: Buy a Generator II", 
        "Half life 3 CONFIRMED: Buy a Generator III", 
        "L4G: Left 4 Generators: Buy a Generator IV", 
        "	5 Generators Atom Punch", 
        "", 
        "", 
        ""
       ]
      ]

function updateAchievement(){
  for (let i = 1; i < 1.5; i++){
    for (let j = 1; j < 8.5; j++){
      document.getElementById("ach" + i + j).innerHTML = achdesc[i][j]
    }
  }
}

function getAchievement(){
  
}