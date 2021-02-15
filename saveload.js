function save() {
  localStorage.setItem("universal-idle", JSON.stringify(game))
}

function save2(){
  save()
  $.notify("Game Saved","success")
}

var autoSave = window.setInterval(function() {
  save2();
}, 30000);

function load() {
  const loadgame = JSON.parse(localStorage.getItem("universal-idle"));
  if (loadgame !== null) {
    loadGame(loadgame);
  }
}

function loadGame(loadgame) {
  reset()
  for (const i in loadgame) {
    game[i] = loadgame[i];
  }
  game.tPlayedWTimeSpeed = new Decimal(game.tPlayedWTimeSpeed)
  game.atoms = new Decimal(game.atoms)
  game.size = new Decimal(game.size)
  game.time = new Decimal(game.time)
  game.totalAtoms = new Decimal(game.totalAtoms)
  game.bestSize = new Decimal(game.bestSize)
  game.bestGenBoost = new Decimal(game.bestGenBoost)
  game.generatorBoost = new Decimal(game.generatorBoost)
  game.universePoints = new Decimal(game.universePoints)
  game.bestUniPtsInOneReset = new Decimal(game.bestUniPtsInOneReset)
  for (let i = 1; i < 8.5; i++) {
    game.generator[i] = new Decimal(game.generator[i])
    game.generatorBought[i] = new Decimal(game.generatorBought[i])
  }
  for (let i = 1; i < 1.5; i++) {
    game.repeatableUniverseUpgrade[i] = new Decimal(game.repeatableUniverseUpgrade[i])
  }
  game.version = 20210215
}

function exporty() {
    save();
    copyStringToClipboard(btoa(JSON.stringify(game)));
}

function copyStringToClipboard(str) {
  var el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style = {
    position: "absolute",
    left: "-9999px"
  };
  document.body.appendChild(el);
  copyToClipboard(el);
  $.notify("Exported to Clipboard!","success")
  document.body.removeChild(el);
}

function copyToClipboard(el) {
  el = typeof el === "string" ? document.querySelector(el) : el;
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    var editable = el.contentEditable;
    var readOnly = el.readOnly;
    el.contentEditable = true;
    el.readOnly = true;
    var range = document.createRange();
    range.selectNodeContents(el);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    el.setSelectionRange(0, 999999);
    el.contentEditable = editable;
    el.readOnly = readOnly;
  } else {
    el.select();
  }
  document.execCommand("copy");
}

function importy() {
  let loadgame = "";
  loadgame = JSON.parse(atob(prompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE")));
  if (loadgame !== "") {
    loadGame(loadgame);
    save()
  }
}

function reset(){
game = {
  tLast: Date.now(),
  tPlayedWTimeSpeed: new Decimal(0),
  tStart: Date.now(),
  atoms: new Decimal(10),
  size: new Decimal(1),
  time: new Decimal(0),
  generator: [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
  generatorBought: [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
  generatorBoost: new Decimal(0),
  universePoints: new Decimal(0),
  bestUniPtsInOneReset: new Decimal(0),
  universeUpgrade: [null, false, false, false, false, false, false, false, false, false, false],
  repeatableUniverseUpgrade: [null, new Decimal(0)],
  totalAtoms: new Decimal(0),
  bestSize: new Decimal(0),
  bestGenBoost: new Decimal(0),
  challenge: 0,
  challengeCompletion: [null, false],
  tab: 1,
  notation: 0,
  timeDisplay: 0,
  productionDisplay: 0,
  version: 20210200,
  achievement: [],
}
  //save()
}

function resetConf() {
  if (!confirm("Are you sure you want to delete all of your progress? You can't undo this process! Remaining confirmation: 4")) return
  if (!confirm("Are you sure you want to delete all of your progress? You can't undo this process! Remaining confirmation: 3")) return
  if (!confirm("Are you sure you want to delete all of your progress? You can't undo this process! Remaining confirmation: 2")) return
  if (!confirm("Are you sure you want to delete all of your progress? You can't undo this process! Remaining confirmation: 1")) return
  if (!confirm("Are you sure you want to delete all of your progress? You can't undo this process! Remaining confirmation: 0")) return
  reset()
  save()
}