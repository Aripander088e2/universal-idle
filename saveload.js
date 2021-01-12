function save() {
  localStorage.setItem("universal-idle", JSON.stringify(game))
}

var autoSave = window.setInterval(function() {
  save();
}, 10000);

function load() {
  const loadgame = JSON.parse(localStorage.getItem("universal-idle"));
  if (loadgame !== null) {
    loadGame(loadgame);
  }
}

function loadGame(loadgame) {
  for (const i in loadgame) {
    game[i] = loadgame[i];
  }
  game.atoms = new Decimal(game.atoms)
  game.size = new Decimal(game.size)
  for (let i = 1; i < 8.5; i++) {
    game.generator[i] = new Decimal(game.generator[i])
    game.generatorBought[i] = new Decimal(game.generatorBought[i])
  }
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
    window.setTimeout(() => {
    save()
    window.location.reload()
    },200)
  }
}

function reset(){
game = {
  tLast: Date.now(),
  atoms: new Decimal(10),
  size: new Decimal(1),
  generator: [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
  generatorBought: [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
  notation: 0,
  achievement: [],
}
  save()
}

function resetConf() {
  if (!confirm("Are you sure you want to delete all of your progress? You can't undo this process! Remaining confirmation: 4")) return
  if (!confirm("Are you sure you want to delete all of your progress? You can't undo this process! Remaining confirmation: 3")) return
  if (!confirm("Are you sure you want to delete all of your progress? You can't undo this process! Remaining confirmation: 2")) return
  if (!confirm("Are you sure you want to delete all of your progress? You can't undo this process! Remaining confirmation: 1")) return
  if (!confirm("Are you sure you want to delete all of your progress? You can't undo this process! Remaining confirmation: 0")) return
  reset()
}