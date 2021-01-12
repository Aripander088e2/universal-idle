const achieveData = [
  {
    unlockReq: () => true,
    achieve: [
      () => true,
      () => false,
      () => false,
      () => false,
      () => false,
      () => false,
      () => false,
      () => false,
    ],
    name: [
      "???",
      "???",
      "???",
      "???",
      "???",
      "???",
      "???",
      "???",
    ],
    tooltip: [
      "???",
      "???",
      "???",
      "???",
      "???",
      "???",
      "???",
      "???",
    ]
  },
]

function setAchieveText() {
for (let row in achieveData) {
  let rowData = achieveData[row]
  for (let col in rowData.achieve) {
    let elem = document.getElementById("achievementTable").children[0].children[row].children[col]
    elem.textContent=rowData.name[col]
    elem.attributes.tooltip.value=rowData.tooltip[col]
  }
}
  updateAchieveColor()
}

function checkAchieve() {
  let achieveGain = false
  for (let row in achieveData) {
    let rowData = achieveData[row]
    let numberrow = Number(row)
      achieveGain = true
    
      for (let col in rowData.achieve) {
        let numbercol = Number(col)
        let achieveId=numberrow*10+numbercol+1
        if ((!game.achievement.includes(achieveId))&&(rowData.achieve[col]())) {
          game.achievement.push(achieveId)
          $.notify("New Achievement Unlocked: " + rowData.name[col],"achieve")
          achieveGain = true
        }
      
    }
  }
  if (achieveGain) {
    updateAchieveColor()
  }
  document.getElementById("achieveTotal").textContent=game.achievement.length
}

function updateAchieveColor() {
  for (let row=0;row<10;row++) {
    document.getElementById("achievementTable").children[0].children[row].style.display=""
    for (let col=0;col<10;col++) {
      document.getElementById("achievementTable").children[0].children[row].children[col].style.background=(game.achievement.includes(row*10+col+1)?"green":"grey")
    }
  }
}