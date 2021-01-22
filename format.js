function formate(num, dp, dp2) { 
  // num: number that you need to formate
  // dp: decimal points below 1e6
  // dp2: decimal points between 1e6 and e1e6, 1 more decimal point than dp2 after e1e6
  num = new Decimal(num)
  let output = ""
  let ret = num.abs()
  let dec = false
  if (ret.lt(new Decimal(10).pow(-dp)) && ret.gt(0)){
    ret = ret.pow(-1)
    dec = true
  }
  if (ret.gte(new Decimal(2).pow(1024))) return "Infinity"
  if (ret.lt(1e6)) {
    output = ret.toFixed(dp)
  } else if (ret.lt("e1e6")) {
    output = formateNum(ret, dp2)
  } else if (ret.lt("ee1e6")) {
    ret = ret.log10()
    output = "e" + formateNum(ret, dp2 + 1)
  } else if (ret.lt("eee1e6")) {
    ret = ret.log10().log10()
    output = "ee" + formateNum(ret, dp2 + 1)
  } else if (ret.lt("eeee1e6")) {
    ret = ret.log10().log10().log10()
    output = "eee" + formateNum(ret, dp2 + 1)
  } else if (ret.lt("eeeee1e6")) {
    ret = ret.log10().log10().log10().log10()
    output = "eeee" + formateNum(ret, dp2 + 1)
  } else output = ret.toString()
  return (num.lt(0) ? "-" : "") + (dec ? "1/" : "") + output
}

function formateNum(num, dp) {
  let exponent = num.log10().floor().toNumber();
  let mantissa = num.div(new Decimal(10).pow(exponent)).toNumber();
  if (game.notation <= 3){
    if (num.gte(new Decimal(10).pow(3 * 10 ** game.notation + 3))) {
      if (mantissa >= 10 - 10 ** (-1 * dp) / 2){
        mantissa /= 10
        exponent += 1
      }
      return mantissa.toFixed(dp) + "e" + exponent
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
    switch(game.notation) {
    case 4:
    return "e" + num.log10().toNumber().toFixed(dp)
    break;
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
    output = "Standard I"
    break;
  case 2:
    output = "Standard II"
    break;
  case 3:
    output = "Standard III"
    break;
  case 4:
    output = "Logarithm"
    break;
  default:
    output = ""
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
}
