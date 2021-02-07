function formate(num, dp, dp2, postinf, fixed) { 
  // num: number that you need to formate
  // dp: decimal points below 1e6
  // dp2: decimal points between 1e6 and e1e6, 1 more decimal point than dp2 after e1e6
  // postinf: 
  // -1: always show Infinity if you reach the limit
  // 1: never show Infinity even if you reach the limit
  if (fixed == undefined) fixed = -1 // use -1 to prevent it used for scientific
  let usedNotations = (fixed == -1 ? game.notation : fixed)
  num = new Decimal(num)
  let output = ""
  let ret = num.abs()
  if (ret.lt(new Decimal(10).pow(-dp)) && ret.gt(0)) return new Decimal(0).toFixed(dp)
  if ((ret.gte(new Decimal(2).pow(1024)) && postinf !== 1 && (!game.achievement.includes(31) || postinf == -1)) || ret.eq(Infinity)) return "Infinity"
  if (isNaN(ret) && !ret.gte(new Decimal("e9e15"))) return "NaN" // Fix unexpected NaN
  if (ret.lt(1e6)) {
    output = ret.toFixed(dp)
  } else if (ret.lt("e1e6") || usedNotations == 4) {
    output = formateNum(ret, dp2, usedNotations)
  } else if (ret.lt("ee1e6")) {
    ret = ret.log10()
    output = "e" + formateNum(ret, dp2 + 1, usedNotations)
  } else if (ret.lt("eee1e6")) {
    ret = ret.log10().log10()
    output = "ee" + formateNum(ret, dp2 + 1, usedNotations)
  } else if (ret.lt("eeee1e6")) {
    ret = ret.log10().log10().log10()
    output = "eee" + formateNum(ret, dp2 + 1, usedNotations)
  } else if (ret.lt("eeeee1e6")) {
    ret = ret.log10().log10().log10().log10()
    output = "eeee" + formateNum(ret, dp2 + 1, usedNotations)
  } else output = formateNum(ret, dp2, 4)
  return (num.lt(0) ? "-" : "") + output
}

function getMaximum(x){
  switch(x){
    case 0:
      return 0
      break;
    case 1:
      return 3
      break;
    case 2:
      return 1
      break;
    default:
      return 0
  }
}

function formateNum(num, dp, used) {
  let exponent = num.log10().floor().toNumber();
  let mantissa = num.div(new Decimal(10).pow(exponent)).toNumber();
  if (used <= 2){
    if (num.gte(new Decimal(10).pow(3 * 10 ** (getMaximum(used)) + 3))) {
      if (mantissa >= 10 - 10 ** (-1 * dp) / 2){
        mantissa /= 10
        exponent += 1
      }
      return mantissa.toFixed(dp) + "e" + exponent.toLocaleString()
    } else {
      let mod = exponent % 3
      exponent = (exponent - mod) / 3 - 1
      mantissa = mantissa * 10 ** mod
      if (mantissa >= 1000 - 10 ** (-1 * dp) / 2){
        mantissa /= 1000
        exponent += 1
      }
      if (num.lt(new Decimal(1e33))) {
        return mantissa.toFixed(dp) + " " + standardPreE33[exponent]
      } else {
        return mantissa.toFixed(dp) + " " + standardUnits[exponent % 10] + standardTens[Math.floor(exponent / 10) % 10] + standardHundreds[Math.floor(exponent / 100)]
      }
    }
  } else {
    switch(used) {
    case 3:
      return "e" + num.log10().toNumber().toFixed(dp)
      break;
    case 4:
      let superlog = num.slog(10)
      return "10^^" + (superlog >= 1e6 ? formateNum(superlog, dp + 2, 0) : superlog.toFixed(dp + 2))
      break;
    default:
      return ""
    }
  }
}


const standardPreE33 = ["K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"]
const standardUnits = ["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "O", "N"]
const standardTens = ["", "Dc", "Vg", "Tg", "Qd", "Qi", "Se", "St", "Og", "Nn"]
const standardHundreds = ["", "Ce", "Dn", "Tc", "Qe", "Qu", "Sc", "Si", "Oe", "Ne"]

function toggleNotation() {
  game.notation = (game.notation + 1) % 5
}

function getNotation(){
  let output
  switch(game.notation) {
  case 0:
    output = "Scientific"
    break;
  case 1:
    output = "Standard"
    break;
  case 2:
    output = "Mixed Scientific"
    break;
  case 3:
    output = "Logarithm"
    break;
  case 4:
    output = "Tetration"
    break;
  default:
    output = "Unknown Notation"
  }
  return output
}

function formateTime(ret, dp, dp2) {
  let y = new Decimal(86400*365)
  let d = new Decimal(86400)
  let h = new Decimal(3600)
  let m = new Decimal(60)
  let s = new Decimal(1)
  ret = new Decimal(ret)
  if (game.timeDisplay == 0){
    if (ret.lt(m)) {
      return formate(ret, dp, dp2) + " seconds"
    } else if (ret.lt(h)) {
      let modS = ret.sub(ret.div(m).floor().mul(m)) // seconds
      return formate(ret.div(m).floor()) + " minutes, " + formate(modS, dp, dp2) + " seconds"
    } else if (ret.lt(d)) {
      let modS = ret.sub(ret.div(m).floor().mul(m)) // seconds
      let modM = ret.sub(ret.div(h).floor().mul(h)) // minutes
      return formate(ret.div(h).floor()) + " hours, " + formate(modM.div(m).floor()) + " minutes, " + formate(modS, dp, dp2) + " seconds"
    } else if (ret.lt(y)) {
      let modS = ret.sub(ret.div(m).floor().mul(m)) // seconds
      let modM = ret.sub(ret.div(h).floor().mul(h)) // minutes
      let modH = ret.sub(ret.div(d).floor().mul(d)) // hours
      return formate(ret.div(d).floor()) + " days, " + formate(modH.div(h).floor()) + " hours, " + formate(modM.div(m).floor()) + " minutes, " + formate(modS, dp, dp2) + " seconds"
    } else if (ret.lt(y.mul(1e6))){
      let modS = ret.sub(ret.div(m).floor().mul(m)) // seconds
      let modM = ret.sub(ret.div(h).floor().mul(h)) // minutes
      let modH = ret.sub(ret.div(d).floor().mul(d)) // hours
      let modD = ret.sub(ret.div(y).floor().mul(y)) // days
      return formate(ret.div(y).floor()) + " years, " + formate(modD.div(d).floor()) + " days, " + formate(modH.div(h).floor()) + " hours, " + formate(modM.div(m).floor()) + " minutes, " + formate(modS, dp, dp2) + " seconds"
    } else return formate(ret.div(y), dp, dp2) + " years"
  } else if (game.timeDisplay == 1){
    if (ret.lt(m)) {
      return formate(ret, dp, dp2) + " seconds"
    } else if (ret.lt(h)) {
      return formate(ret.div(m), dp, dp2) + " minutes"
    } else if (ret.lt(d)) {
      return formate(ret.div(h), dp, dp2) + " hours"
    } else if (ret.lt(y)) {
      return formate(ret.div(d), dp, dp2) + " days"
    } else return formate(ret.div(y), dp, dp2) + " years"
  } else if (game.timeDisplay == 2){
    return formate(ret, dp, dp2) + " seconds"
  } else return ""
}

function toggleTimeDisplay() {
  game.timeDisplay = (game.timeDisplay + 1) % 3
}

function getTimeDisplay(){
  let output
  switch(game.timeDisplay) {
  case 0:
    output = "Long Display"
    break;
  case 1:
    output = "Largest Unit"
    break;
  case 2:
    output = "Fixed Seconds"
    break;
  default:
    output = ""
  }
  return output
}

function toggleProductionDisplay() {
  game.productionDisplay = (game.productionDisplay + 1) % 3
}

function getProductionDisplay(){
  let output
  switch(game.productionDisplay) {
  case 0:
    output = "Addition"
    break;
  case 1:
    output = "Multiplication (Linear)"
    break;
  case 2:
    output = "Multiplication (Logarithm)"
    break;
  default:
    output = ""
  }
  return output
}