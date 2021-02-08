let news = {}

function randomTime(maxYear){
  let year = Math.floor(2021 + Math.random() * (maxYear - 2020))
  let month = Math.floor(1 + Math.random() * 12)
  let daysInMonth = [null, 31, 28 + isLeapYear(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let day = Math.floor(1 + Math.random() * daysInMonth[month])
  let hour = Math.floor(Math.random() * 24)
  let minute = Math.floor(Math.random() * 60)
  if (hour < 10) hour = "0" + hour
  if (minute < 10) minute = "0" + minute
  return hour + ":" + minute + ", " + monthName[month] + " " + day + ", " + year
}

const monthName = [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function isLeapYear(year){
  let output = false
  if (year % 4 == 0) output = true
  if (year % 100 == 0) output = false
  if (year % 400 == 0) output = true
  return output
}

function numToOrd(num){
  let numMod100 = num % 100
  let ord = ""
  if (Math.floor(numMod100 / 10) == 1) ord = "th"
  else {
    switch(numMod100 % 10) {
    case 1:
      ord = "st"
      break;
    case 2:
      ord = "nd"
      break;
    case 3:
      ord = "rd"
      break;
    default:
      ord = "th"
    }
  }
  return num.toLocaleString() + ord
}

function randomDimensions(){
  if (Math.random() < 0.01){
    let random1 = Math.random()
    let random2 = Math.random()
    if (random1 > 0.5){
      if (random2 > 0.5){
        return "Infinity"
      } else return "Meta"
    } else {
      if (random2 > 0.5){
        return "Time"
      } else return "Emperor"
    }
  }
  else return "Normal"
}

function number2digits(num){
  if (num > 100) num = num % 100
  let output = num
  if (num < 10) output = "0" + output
  return output.toString()
}

function classifiedredactedcomingsoonquestionmarkrandomgenerate(){
  if (Math.random() < 0.01) return "Milestones of this wiki"
  let random1 = Math.random()
  let random2 = Math.random()
  if (random1 > 0.5){
    if (random2 > 0.5){
      return "Redacted"
    } else return "Coming Soon"
  } else {
    if (random2 > 0.5){
      return "Classified"
    } else return "???"
  }
}

function fakeupdatepagerandomgenerate(){
  if (Math.random() < 0.01) return "Extensions of Updates on the switch"
  let random = Math.random()
  if (random < 1/3) return "Updates on the switch"
  else return "Extensions of Updates" // this appear 2x more common than presious one because it has 2 versions
}

function fullNumberDisplay(num){ // only up to 1e15
  num = Math.round(num)
  let trillions = Math.floor(num/1e12) % 1000
  let billions = Math.floor(num/1e9) % 1000
  let millions = Math.floor(num/1e6) % 1000
  let thousands = Math.floor(num/1e3) % 1000
  let ones = Math.floor(num/1e0) % 1000
  let output = ""
  if (trillions !== 0) {
    output = output + (trillions > 99 ? numberName[Math.floor(trillions/100)] + "Hundred " : "") + (trillions%100 > 19 ? numberNameTens[Math.floor(trillions/10)%10] + numberName[Math.floor(trillions)%10] : (trillions%100 !== 0 ? numberName[trillions%100] : "")) + "Trillion "
  }
  if (billions !== 0) {
    output = output + (billions > 99 ? numberName[Math.floor(billions/100)] + "Hundred " : "") + (billions%100 > 19 ? numberNameTens[Math.floor(billions/10)%10] + numberName[Math.floor(billions)%10] : (billions%100 !== 0 ? numberName[billions%100] : "")) + "Billion "
  }
  if (millions !== 0) {
    output = output + (millions > 99 ? numberName[Math.floor(millions/100)] + "Hundred " : "") + (millions%100 > 19 ? numberNameTens[Math.floor(millions/10)%10] + numberName[Math.floor(millions)%10] : (millions%100 !== 0 ? numberName[millions%100] : "")) + "Million "
  }
  if (thousands !== 0) {
    output = output + (thousands > 99 ? numberName[Math.floor(thousands/100)] + "Hundred " : "") + (thousands%100 > 19 ? numberNameTens[Math.floor(thousands/10)%10] + numberName[Math.floor(thousands)%10] : (thousands%100 !== 0 ? numberName[thousands%100] : "")) + "Thousand "
  }
  if (ones !== 0) {
    output = output + (ones > 99 ? numberName[Math.floor(ones/100)] + "Hundred " : "") + (ones%100 > 19 ? numberNameTens[Math.floor(ones/10)%10] + numberName[Math.floor(ones)%10] : (ones%100 !== 0 ? numberName[ones%100] : ""))
  }
  return (num == 0 ? "Zero " : output)
}

const numberName = ["", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ", "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "]
const numberNameTens = ["", "", "Twenty ", "Thirty ", "Forty ", "Fifty ", "Sixty ", "Seventy ", "Eighty ", "Ninety "]

function randomIPAdress(){
  let random1 = Math.floor(Math.random()*256)
  let random2 = Math.floor(Math.random()*256)
  let random3 = Math.floor(Math.random()*256)
  let random4 = Math.floor(Math.random()*256)
  return random1 + "." + random2 + "." + random3 + "." + random4
}

function randomRickroll(id){
  if (Math.random() < 0.025) {
    if (id % 2 == 1) return "Rickroll"
    else return "https://youtu.be/dQw4w9WgXcQ"
  }
  let random = Math.random()
  if (id == 1){
    if (random < 1/6) return "We're no strangers to love"
    else if (random < 2/6) return "You know the rules and so do I"
    else if (random < 3/6) return "A full commitment's what I'm thinking of"
    else if (random < 4/6) return "You wouldn't get this from any other guy"
    else if (random < 5/6) return "I just want to tell you how I'm feeling"
    else return "Gotta make you understand"
  } else if (id == 2){
    if (random < 1/6) return "We're known each other for so long"
    else if (random < 2/6) return "Your heart's been aching but you're too shy to say it"
    else if (random < 3/6) return "Inside we both known what's been going on"
    else if (random < 4/6) return "We know the game and we're gonna play it"
    else if (random < 5/6) return "And if you ask me how I'm feeling"
    else return "Don't tell me you're too blind to see"
  } else if (id == 3){
    if (random < 1/6) return "We're known each other for so long"
    else if (random < 2/6) return "Your heart's been aching but you're too shy to say it"
    else if (random < 3/6) return "Inside we both known what's been going on"
    else if (random < 4/6) return "We know the game and we're gonna play it"
    else if (random < 5/6) return "I just want to tell you how I'm feeling"
    else return "Gotta make you understand"
  } else {
    if (random < 0.5) return "Never Gonna Give You Up"
    else if (random < 0.6) return "Never Gonna Let You Down"
    else if (random < 0.7) return "Never Gonna Run Around and Desert You"
    else if (random < 0.8) return "Never Gonna Make You Cry"
    else if (random < 0.9) return "Never Gonna Say Goodbye"
    else return "Never Gonna Tell a Lie and Hurt You"
  } 
}

function generateTextFromB36(number, capitial, space){
  number = Math.abs(number)
  number = number.toString(36)
  if (capitial) number = number.toLocaleUpperCase()
  return number + (space ? " " : "")
}

function getRandomUsername(id){
  let random = Math.random()
  if (id == 1) {
    if (random < 1/3) return "meme08"
    else if (random < 2/3) return "unsoftcapped"
    else return "MEME"
  }
  else return ""
}

// functions end

news.begin = function () {
	news.message();
};

news.message = function () {
	let rand = Math.floor(Math.random() * news.news.length);
	let msg = news.news[rand]();
	let e = document.getElementById("news");
	e.innerHTML = msg;
    let textWidth = e.clientWidth;
	let parentWidth = e.parentElement.clientWidth;
	e.style.transition = "";
	e.style.transform = "translateX(" + (parentWidth + 10) + "px)";
	let dist = parentWidth + e.clientWidth;
	let rate = 150;
	let transformDuration = dist / rate;

	e.style.transition = "transform " + transformDuration + "s linear";
	e.style.transform = "translateX(-" + (textWidth) + "px)";

	setTimeout(news.message, Math.ceil(transformDuration + 0) * 1000);
};

news.news = [ 
  // All not this game related will have 1% ticker
  // Note: Some of them is not actually 1%, it probably slightly higher/lower 1%
  
  // Atoms Related
  () => "Still " + formate(new Decimal(10).pow(game.atoms.max(10).log10().pow(1)), 2, 2, 1) + " Atoms, huh? - Atom Man with " + formate(new Decimal(10).pow(game.atoms.max(10).log10().pow(2 ** Math.random())), 2, 2, 1) + " Atoms",
  () => "How do you get " + formate(new Decimal(10).pow(game.atoms.max(10).log10().pow(1)), 2, 2, 1) + " Atoms? - Atom Man with " + formate(new Decimal(10).pow(game.atoms.max(10).log10().pow(0.5 ** Math.random())), 2, 2, 1) + " Atoms",
  () => "Dilate All Atoms into " + formate(game.atoms.max(1).log10().pow(1 / Math.random()), 2, 2, 1) + " Dilated Atoms",
  () => "I can't believe you can have " + formate(game.atoms.tetrate(1 + Math.random()), 2, 2, 1) + " Atoms",
  
  // Generators Related
  () => "Generator IX: " + formate(game.generator[Math.floor(1 + Math.random() * 7)].add(1e10).slog(10).sub(2), 12, 2, 1),
  () => "Generator IX: " + formate(game.generator[Math.floor(1 + Math.random() * 7)].add(1e10).slog(10).sub(2), 12, 2, 1),
  () => "Generator X: " + formate(game.generator[8].add(1).log10().div(new Decimal(10).tetrate(1 + Math.random())), 12, 2, 1),
  
  // Size Related
  () => "Dilate Your Universe to reduce the size to " + formate(game.size.pow(Math.random()), 2, 2, 1) + " Meters",
  
  // Universe Related
  () => "Your Universe Points on Universes is enough to reach " + formate(new Decimal(1e80).pow(game.universePoints.max(1).pow(Math.random())), 2, 2, 1) + " Atoms",
  () => "Your Universe Points on Universes is enough to reach " + formate(new Decimal(8.8e26).pow(game.universePoints.max(1).pow(Math.random())), 2, 2, 1) + " Meters",
  
  // Time Related
  () => "Dilate Your Time for " + formate(game.time.mul(Math.random()), 2, 2, 1) + " Dilated Time",
  
  // Antimatter Dimensions Related
  () => numToOrd(Math.floor(10 ** (Math.random() ** 0.5 * 15))) + " " + randomDimensions() + " Dimensions: " + formate(new Decimal(1 / Math.random()).tetrate(3), 2, 2, 1), // 1% ticker possible if generate not "Normal Dimensions"
  () => "You have " + (Math.random() < 0.01 ? "Infinite" : formate(game.atoms.pow(Math.random() * 2), 2, 2, 1)) + " antimatter", // 1% ticker possible if generate "Infinite"
  
  // Ordinal Markup Related
  () => (Math.random() < 0.25 ? "Enter" : "Exit") + " the " + Number(Math.floor(10 + Math.random() * 26)).toString(36).toLocaleUpperCase(), // 1% ticker possible if generate "Enter the E"
  () => "We are not adding an exit the incrementyverse update - TheMKeyHolder#" + (Math.random() < 1/11 ? "66" : number2digits(Math.floor(Math.random() * 100))) + (Math.random() < 1/11 ? "74" : number2digits(Math.floor(Math.random() * 100))), // 1% ticker possible if generate 66 and 74 respectively
  () => "Removed " + (Math.random() < 0.5 ? "Facebook " : "Messenger ") + (Math.random() < 0.01 ? "Cardinals" : "Ordinals") + " since it will be never exist in the game", // 1% ticker possible if generate "Facebook Cardinals" or "Messenger Cardinals"
  () => "When I can reach ε" + (Math.random() < 0.01 ? "ω" : Math.floor(1 / Math.random() - 1).toLocaleString()), // 1% ticker possible if generate Epsilon Omega
  () => "Ordinal Markup will be released in skype on " + (Math.random < 0.01 ? "Never" : randomTime(1e308)), // 1% ticker possible if generate "Never"
  
  // Synergism Related
  () => "Shouldn't e" + formate(new Decimal(2).pow(20 + Math.floor(Math.random() * 100)).div(1.048576), 3, 3, 1, 1) + " is better than 1.00e" + formate(new Decimal(2).pow(20 + Math.floor(Math.random() * 100)).div(1.048576), 3, 3, 1, 1) + "?", // 1% ticker possible if both Number are same
  () => "Never use Level 12 on Extinction Corruption, as it will impossible to " + (Math.random() < 0.01 ? "produce Crumb" : "Ant sacrifice") + ", therefore you can't earn a lot of Offering and Obtainium when you ant sacrifice", // 1% ticker possible if generate "produce Crumb"
  
  // Discord Related
  () => formate(new Decimal(2).pow(4 + Math.floor(Math.random() * 1030)), 0, 2, -1) + " Strikes to " + getRandomUsername(1) + " for leaking the test link", // 1% ticker possible if strikes = Infinity
  () => "Can you " + (Math.random < 0.01 ? "delete" : "unpin") + " this message, it seem SUPER ANNOYING - User_2.005e220#3012", // 1% ticker possible if generate "delete this message"
  
  // Youtube Related
  
  
  // Fandom Related
  () => "E308.25 blocked JakeCampbell19 with an expiration time of " + randomTime(Math.random() < 0.01 ? 2999 : 2099), // 1% ticker possible if years > 2100
  () => "E" + (Math.random() < 0.1 ? 308.25 : Math.floor((100 + Math.random() * 900) * 100) / 100).toFixed(2) + " blocked JakeCampbell" + (Math.random() < 0.1 ? 19 : number2digits(Math.floor(Math.random() * 100))) + " with an expiration time of indefinite", // 1% ticker possible if all 308.25, 19, indefinite are generated
  
  () => "IdleSquadron deleted page " + numToOrd(Math.floor(1 + Math.random() * 99)) + " page", // 1% ticker possible if page = 33
  () => "IdleSquadron deleted page " + classifiedredactedcomingsoonquestionmarkrandomgenerate(), // 1% ticker possible if generate "RP"
  () => "IdleSquadron deleted page " + fakeupdatepagerandomgenerate(), // 1% ticker possible if generate "Extensions of Updates on the switch"
  () => "IdleSquadron blocked JakeCampbell19 with an expiration time of " + Math.ceil(Math.floor(1 + Math.random() * 100) * 3.65) + " days", // 1% ticker possible if days = 92
  () => "IdleSquadron blocked " + (Math.random() < 0.01 ? "72.185.158.165" : randomIPAdress()) + " with an expiration time of 00:00, January 1, 2021", // 1% ticker possible if generate "72.185.158.165"
  () => "IdleSquadron blocked 203.54.223.134 with an expiration time of " + (Math.floor(1 + Math.random() * 10) * 10 ** Math.floor(Math.random() * 10)).toLocaleString() + " days", // 1% ticker possible if generate 7 days
  
  () => "Patcail deleted page Post " + (Math.random() < 0.01 ? "Collapse" : "Factor Boost"), // 1% ticker possible if generate "Collapse"
  
  () => (Math.random() < 0.01 ? "Cardinal " : "Ordinal ") + "is UselessThis page is bad IP ban me", // 1% ticker possible if generate "Cardinal"
  () => (Math.random() < 0.01 ? "!style=background:#cfcfcf; font-size: 12px; border:1px solid #323341; width:75%; text-align:left; padding-left:5px|[[Ordinal|(SPOILERS)]] • [[Base]] • [[Guide]] • [[Abbreviations]]" : "(SPOILERS)"), // 1% ticker possible if generate a long message with "(SPOILERS)"
  
  // Covonavirus Related
  () => "Coronavirus has infected " + (Math.random() < 0.01 ? fullNumberDisplay(10**(Math.log10(7.8e9)*Math.random())) : Math.floor(10**(Math.log10(7.8e9)*Math.random())).toLocaleString() + " ") + "People", // 1% ticker possible if number using full written
  () => Number(21315973).toString(36) + "-" + number2digits(Math.floor(Math.random() * 100)), // 1% ticker possible if number = 19
  
  // Rickroll Related
  () => randomRickroll(1), // 1% ticker possible if generate "Rickroll"
  () => randomRickroll(4), // 1% ticker possible if generate Rickroll Link
  () => randomRickroll(2), // 1% ticker possible if generate Rickroll Link
  () => randomRickroll(5), // 1% ticker possible if generate "Rickroll"
  () => randomRickroll(6), // 1% ticker possible if generate Rickroll Link
  () => randomRickroll(3), // 1% ticker possible if generate "Rickroll"
  () => randomRickroll(7), // 1% ticker possible if generate "Rickroll"
  () => randomRickroll(8), // 1% ticker possible if generate Rickroll Link
  
  // Random Number Generator
  () => "Random Number with Tetrational rate is Generated: " + formate(new Decimal(10).tetrate(-1 * Math.log10(Math.random())), 3, 3, 1), // 1% ticker possible if number > 1e10
  () => "Random Number with Exponential rate is Generated: " + formate(new Decimal(10).pow(1 / Math.random() - 1), 3, 3, 1), // 1% ticker possible if number > 1e99
  () => "Random Number with Linear rate is Generated: " + Number(1 / Math.random()).toLocaleString(), // 1% ticker possible if number > 100
  () => "Random Base 36 Character is Generated: " + Math.floor((36**9)*100*Math.random()).toString(36).toLocaleUpperCase(), // 1% ticker possible if character length < 10
  () => "Random Base 10 Number is Generated: " + number2digits(Math.floor(Math.random() * 100)) + number2digits(Math.floor(Math.random() * 100)) + number2digits(Math.floor(Math.random() * 100)) + number2digits(Math.floor(Math.random() * 100)) + number2digits(Math.floor(Math.random() * 100)), // 1% ticker possible if first 2 characters are 00
  () => "Random Time at 2021 is Generated: " + (Math.random < 0.01 ? Math.floor(1609430400 + 31536000 * Math.random()).toLocaleString() : randomTime(2021)), // 1% ticker possible if generate any Unix
  
  // Other
  
  
  // Credit (no random ticker/1% ticker)
  () => "Credit to Patashu, for break_eternity.js",
  () => "Credit to Reinhardt, for News Tickers",
  () => "Credit to Yhvr, for Text Font (Inter)",
  () => "Credit to Patcail, for Saving system",
  () => "Credit to Mgol, for jquery.js",
  
  // Meta
  () => "News Ticker #" + (Math.random() < 0.01 ? formate(new Decimal(10).pow(news.news.length), 0, 0, 1, 0) : formate(news.news.length, 0, 0)) + " is created", // 1% ticker possible if generate 10^(Unique News Tickers)
];

// total: 55 (11,44)

news.begin();
