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
  } else if (ret.lt("e1e6") || usedNotations == 4 || (usedNotations == 1 && ret.lt(new Decimal("e3e3000").mul(1e3)))) {
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
      return 3000
      break;
    case 2:
      return 1
      break;
    default:
      return 0
  }
}

function formateNum(num, dp, used) {
  let exponent = num.log10().floor();
  let mantissa = num.div(new Decimal(10).pow(exponent));
  if (used <= 2){
    if (num.gte(new Decimal(10).pow(new Decimal(3).mul(new Decimal(10).pow(getMaximum(used))).add(3)))) {
      if (mantissa.gte(10 - 10 ** (-1 * dp) / 2)){
        mantissa = mantissa.div(10)
        exponent = exponent.add(1)
      }
      return mantissa.toFixed(dp) + "e" + exponent.toNumber().toLocaleString()
    } else {
      let exponent = num.log10().div(3).floor();
      let mantissa = num.div(new Decimal(1000).pow(exponent))
      let maxT1 = num.log10().sub(3).div(3).floor()
      let maxT2 = maxT1.log10().div(3).floor().toNumber()
      if (maxT1.lt(1e15)) maxT1 = maxT1.toNumber()
      else maxT1 = maxT1.div(new Decimal(1000).pow(maxT2 - 4)).floor().toNumber()
      let tril = Math.floor(maxT1/1e12)
      let bill = Math.floor(maxT1/1e9) % 1000
      let mill = Math.floor(maxT1/1e6) % 1000
      let kill = Math.floor(maxT1/1e3) % 1000
      let ones = maxT1 % 1000
      if (mantissa.gte(1000 - 10 ** (-1 * dp) / 2)){
        mantissa = mantissa.div(1000)
        exponent = exponent.add(1)
      }
      if (num.lt(new Decimal(1e33))) {
        return mantissa.toFixed(dp) + " " + standardPreE33[maxT1]
      } else if (num.lt(new Decimal(10).pow(3e15).mul(1000))) {
        return mantissa.toFixed(dp) + " " + standard(tril, 4, 1) + standard(bill, 3, 1) + standard(mill, 2, 1) + standard(kill, 1, 1) + standard(ones, 0, 0)
      } else {
        return standard(tril, maxT2, (ones + kill + mill + bill !== 0 ? 1 : 0)) + standard(bill, maxT2 - 1, (ones + kill + mill !== 0 ? 1 : 0)) + standard(mill, maxT2 - 2, (ones + kill !== 0 ? 1 : 0)) + standard(kill, maxT2 - 3, (ones !== 0 ? 1 : 0)) + standard(ones, maxT2 - 4, 0) + "s"
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

function comma(num){
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const standardPreE33 = ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"]
const standardUnits = ["", "U", "D", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"]
const standardTens = ["", "Dc", "Vg", "Tg", "Qag", "Qig", "Sxg", "Spg", "Ocg", "Nog"]
const standardHundreds = ["", "Ct", "Dct", "Tct", "Qact", "Qict", "Sxct", "Spct", "Occt", "Noct"]
const standardMilestonePreEE33 = ["", "Mi", "Mc", "Na", "Pc", "Fm", "At", "Zp", "Yc", "Xn", "Ve"]
const standardMilestoneUnits = ["", "M", "Du", "Tr", "Te", "P", "Hx", "He", "O", "E", "Ve"]
const standardMilestoneTens = ["", "e", "Is", "Trn", "Ten", "Pn", "Hxn", "Hen", "On", "En"]
const standardMilestoneHundreds = ["", "Ht", "Dt", "Trt", "Tet", "Pt", "Hxt", "Het", "Ot", "Et"]

function standard(t1, t2, more){
  t1 = t1 % 1000
  t2 = t2 % 1000
  if (t1 == 0) return ""
  let output1 = ""
  let output2 = ""
  if (t1 !== 1 || (t1 == 1 && t2 == 0)){
    let ones1 = t1 % 10
    let tens1 = Math.floor(t1 / 10) % 10
    let hundreds1 = Math.floor(t1 / 100)
    output1 = standardUnits[ones1] + standardTens[tens1] + standardHundreds[hundreds1]
  }
  if (t2 < 10.5) output2 = standardMilestonePreEE33[t2]
  else{
    let mod100 = t2 % 100
    let ones2 = t2 % 10
    let tens2 = Math.floor(t2 / 10) % 10
    let hundreds2 = Math.floor(t2 / 100)
    if (mod100 < 10.5) output2 = standardMilestoneUnits[mod100] + standardMilestoneHundreds[hundreds2]
    else output2 = standardMilestoneUnits[ones2] + standardMilestoneTens[tens2] + standardMilestoneHundreds[hundreds2]
  }
  return output1 + output2 + (more && t2 !== 0 ? "-" : "")
}

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