/*
  Developed by Astrydax, aka Royalcrown28 for vampwood
  For Custom Discord Bots please email me at Astrydax@gmail.com
*/

const Discord = require("discord.js");
const config = require("./config.json");
var chalk = require("chalk");
const bot = new Discord.Client();
var print = require("./printValues.js");


bot.login(config.token);

var version = "1.4.2";

//init destinyBalance
var destinyBalance = {
  blankchannel: {
    light: 0,
    dark: 0,
    face: "",
  },
};

//Init the dice results to zero
var diceResult = {
  success: 0,
  failure: 0,
  advantage: 0,
  threat: 0,
  triumph: 0,
  despair: 0,
  light: 0,
  dark: 0,
  face: "",
};

var characterStatus = {
  blankChannel: {
    blankCharacter: {
      maxWound: 0,
      maxStrain: 0,
      currentWound: 0,
      currentStrain:  0,
      credits: 0
    }
  }
};

//Called When bot becomes functional.
bot.on("ready", () => {
  console.log(`Bot version ${version}`);
  console.log(`Logged in as ${bot.user.username}!`);

  if (config.maxRollsPerDie >= 100) {
    console.warn(chalk.white.bgRed("!!!WARNING!!! maxRollsPerDie in config.json must be set between 1-99 otherwise errors may occur in rolls"));
  }

  //Point print out to print or text
  if (config.emoji == true) {
    console.log("emoji set to true");
    print = print.emoji;
  }

  if (config.emoji == false) {
    console.log("emoji set to false");
    print = print.text;
  }

});

//Called whenever a users send a message to the server
bot.on("message", message => {
  //Ignore messages sent by the bot
  if (message.author.bot) return;

  //Ignore messages that dont start with the command symbol
  if (!message.content.startsWith(config.prefix)) return;

  //Seperate and create a list of parameters. A space in the message denotes a new parameter
  const params = message.content.split(" ").slice(1);

  //init the descriptor string to an empty string
  var desc = "";
  //var descArr = [];
  console.log(params);
  var beg, end = 0;
  var begF, endF = false;
  for (var i = 0; i < params.length; i++) {
    if (params[i].includes('"')) {
      if (!begF) {
        beg = i;
        begF = true;
      } else if (begF && !endF) {
        end = i;
        endF = true;
      }
    }
  }
  //remove the text field arguments from the list of parameters before checking for dice.
  console.log("Beg: " + beg + " End: " + end);
  for (i = beg; i <= end + 1; i++) {
    console.log("params: " + params[i]);
    desc += " " + params[i];
  }
  var spliceAmnt = end + 1 - beg;
  params.splice(beg, spliceAmnt);
  //remove Quotes from descriptor
  desc = desc.replace(/['"]+/g, '');
  //set the rest of params to lowercase
  if (params != undefined) {
    for (var i = 0; i < params.length; i++) {
    params[i] = params[i].toLowerCase();
  }

//************************COMMANDS START HERE************************

//test command
if (message.content.toLowerCase().startsWith(config.prefix + "test")) {
  var emoji = print("adv", message);
  message.channel.sendMessage(emoji);
}
//Ver command
if (message.content.toLowerCase().startsWith(config.prefix + "ver")) {
  message.channel.sendMessage(bot.user.username + ": version: " + version);
}
// D100 command
if (message.content.toLowerCase().startsWith(config.prefix + "d100")) {
  d100(params, message);
}

//!crit command
if (message.content.toLowerCase().startsWith(config.prefix + "crit")) {
  var total = d100(params, message);
	var crit  = {
  	option1: print("pb", message) + "Minor Nick: The target suffers 1 strain.",
  	option2: print("pb", message) + "Slowed Down: The target can only act during the last allied Initiative slot on his next turn.",
  	option3: print("pb", message) + "Sudden Jolt: The target drops whatever is in hand.",
  	option4: print("pb", message) + "Distracted: The target cannot perform a free maneuver during his next turn.",
  	option5: print("pb", message) + "Off-Balance. Add " + print("blkb", message) + " to his next skill check.",
  	option6: print("pb", message) + "Discouraging Wound: Flip one light side Destiny point to a dark side Destiny Point (reverse if NPC).",
  	option7: print("pb", message) + "Stunned: The target is staggered until the end of his next turn.",
  	option8: print("pb", message) + "Stinger: Increase difficulty of next check by one.",
  	option9: print("pb", message) + print("pb", message) + "Bowled Over: The target is knocked prone and suffers 1 strain.",
  	option10: print("pb", message) + print("pb", message) + "Head Ringer: The target increases the difficulty of all Intellect and Cunning Checks by one until the end of the encounter.",
  	option11: print("pb", message) + print("pb", message) + "Fearsome Wound: The target increases the difficulty of all Presence and Willpower checks by one until the end of the encounter.",
  	option12: print("pb", message) + print("pb", message) + "Agonizing Wound: The target increases the difficulty of all Brawn and Agility checks by one until the end of the encounter.",
  	option13: print("pb", message) + print("pb", message) + "Slightly Dazed: The target is disoriented until the end of the encounter.",
  	option14: print("pb", message) + print("pb", message) + "Scattered Senses: The target removes all " + print("bb", message) + " from skill checks until end of encounter.",
  	option15: print("pb", message) + print("pb", message) + "Hamstrung: The target loses his free maneuver until the end of the encounter.",
  	option16: print("pb", message) + print("pb", message) + "Overpowered: The target leaves himself open, and the attacker may immediately attempt another free attack against him, using the exact same pool as the original attack.",
  	option17: print("pb", message) + print("pb", message) + "Winded: Until the end of the encounter, the target cannot voluntarily suffer strain to activate any abilities or gain additional maneuvers.",
  	option18: print("pb", message) + print("pb", message) + "Compromised: Increase difficulty of all skill checks by one until the end of the encounter.",
  	option19: print("pb", message) + print("pb", message) + print("pb", message) + "At the Brink: The target suffers 1 strain each time he performs an action.",
  	option20: print("pb", message) + print("pb", message) + print("pb", message) + "Crippled: One of the target’s limbs (selected by the GM) is crippled until healed or replaced. Increase difficulty of all checks that require use of that limb by one.",
  	option21: print("pb", message) + print("pb", message) + print("pb", message) + "Maimed: One of the target’s limbs (selected by the GM) is permanently lost. Unless the target has a cybernetic replacement, the target cannot perform actions that would require the use of that limb. All other actions gain " + print("blkb", message) + ".",
  	option22: print("pb", message) + print("pb", message) + print("pb", message) + "Horrific Injury. Randomly roll 1d100 to determine one of the target's characteristics—1-30 for Brawn, 31-60 for Agility, 61-70 for Intellect, 71-80 for Cunning, 81-90 for Presence, 91-100 for Willpower. Until this Critical Injury is healed, treat that characteristic as one point lower.",
  	option23: print("pb", message) + print("pb", message) + print("pb", message) + "Temporarily Lame: Until this Critical Injury is healed, the target cannot perform more than one maneuver during his turn.",
  	option24: print("pb", message) + print("pb", message) + print("pb", message) + "Blinded: The target can no longer see. Upgrade the difficulty of all checks twice. Upgrade the difficulty of Perception and Vigilance checks three times.",
  	option25: print("pb", message) + print("pb", message) + print("pb", message) + "Knocked Senseless: The target is staggered for the remainder of the encounter.",
  	option26: print("pb", message) + print("pb", message) + print("pb", message) + print("pb", message) + "Gruesome Injury. Randomly roll 1d100 to determine one of the target's characteristics—1-30 for Brawn, 31-60 for Agility, 61-70 for Intellect, 71-80 for Cunning, 81-90 for Presence, 91-100 for Willpower. That characteristic is permanently reduced by one, to a minimum of one.",
  	option27: print("pb", message) + print("pb", message) + print("pb", message) + print("pb", message) + "Bleeding Out: Every round, the target suffers 1 wound and 1 strain at the beginning of his turn. For every five wounds he suffers beyond his wound threshold, he suffers one additional Critical Injury. Roll on the chart, suffering the injury (if he suffers this result a second time due to this, roll again).",
  	option28: print("pb", message) + print("pb", message) + print("pb", message) + print("pb", message) + "The End is Nigh: The target will die after the last Initiative slot during the next round.",
  	option29: "Dead: Complete, obliterated death."
  };

  //build textCrit
	var textCrit = "";
	switch (true) {
    	case (total < 5):
      textCrit = crit.option1;
      break;
		case (total >= 6 && total <= 10):
			textCrit = crit.option2;
			break;
		case (total >= 11 && total <= 15):
			textCrit = crit.option3;
			break;
		case (total >= 16 && total <= 20):
			textCrit = crit.option4;
			break;
		case (total >= 21 && total <= 25):
			textCrit = crit.option5;
			break;
		case (total >= 26 && total <= 30):
			textCrit = crit.option6;
			break;
		case (total >= 31 && total <= 35):
			textCrit = crit.option7;
			break;
		case (total >= 36 && total <= 40):
			textCrit = crit.option8;
			break;
		case (total >= 41 && total <= 45):
			textCrit = crit.option9;
			break;
		case (total >= 46 && total <= 50):
			textCrit = crit.option10;
			break;
		case (total >= 51 && total <= 55):
			textCrit = crit.option11;
			break;
		case (total >= 56 && total <= 60):
			textCrit = crit.option12;
			break;
		case (total >= 61 && total <= 65):
			textCrit = crit.option13;
			break;
		case (total >= 66 && total <= 70):
			textCrit = crit.option14;
			break;
		case (total >= 71 && total <= 75):
			textCrit = crit.option15;
			break;
		case (total >= 76 && total <= 80):
			textCrit = crit.option16;
			break;
		case (total >= 81 && total <= 85):
			textCrit = crit.option17;
			break;
		case (total >= 86 && total <= 90):
			textCrit = crit.option18;
			break;
		case (total >= 91 && total <= 95):
			textCrit = crit.option19;
			break;
		case (total >= 96 && total <= 100):
			textCrit = crit.option20;
			break;
		case (total >= 101 && total <= 105):
			textCrit = crit.option21;
			break;
		case (total >= 106 && total <= 110):
			textCrit = crit.option22;
			break;
		case (total >= 111 && total <= 115):
			textCrit = crit.option23;
			break;
		case (total >= 116 && total <= 120):
			textCrit = crit.option24;
			break;
		case (total >= 121 && total <= 125):
			textCrit = crit.option25;
			break;
		case (total >= 126 && total <= 130):
			textCrit = crit.option26;
			break;
		case (total >= 131 && total <= 140):
			textCrit = crit.option27;
			break;
		case (total >= 141 && total <= 150):
			textCrit = crit.option28;
			break;
		case (total >= 151):
			textCrit = crit.option29;
			break;
		default:
			console.log ("Something has gone horribly wrong. total is " + total);
			break;
	}
	message.channel.sendMessage("Crit " + total + ": " + textCrit);
}
//!shipcrit command
if (message.content.toLowerCase().startsWith(config.prefix + "shipcrit")) {
  var total = d100(params, message);
	var crit  = {
      option1: print("pb", message) + "Mechanical Stress: The ship or vehicle suffers one point of system strain.",
      option2: print("pb", message) + "Jostled: A small explosion or impact rocks the vehicle. All crew members suffer one strain and are disoriented for one round.",
      option3: print("pb", message) + "Losing Power to Shields: Decrease defense in affected defense zone by one until the Critical Hit is repaired. If the ship or vehicle has no defense, suffer one point of system strain.",
      option4: print("pb", message) + "Knocked Off Course: A particularly strong blast or impact sends the ship or vehicle careening off in a new direction. On his next turn, the pilot cannot execute any maneuvers and must make a Piloting check to regain control. The difficulty of this check depends on his current speed.",
      option5: print("pb", message) + "Tailspin: All firing from the ship or vehicle suffers " + print("blkb", message) + print("blkb", message) + " dice until the end of the pilot’s next turn. All crewmembers are immobilized until the end of the pilot’s next turn.",
      option6: print("pb", message) + "Component Hit: One component of the attacker’s choice is knocked offline, and is rendered inoperable until the end of the following round. For a list of ship components, see EotE Core Rulebook Table 7-10: Small Ship or Vehicle Components or Table 7-11: Large Ship or Vehicle Components depending on target ship silhouette.",
      option7: print("pb", message) + print("pb", message) + "Shields Failing: Reduce defense in all defense zones by one point until the Critical Hit is repaired. If the ship or vehicle has no defense, suffer two points of system strain.",
      option8: print("pb", message) + print("pb", message) + "Navicomputer Failure: The navicomputer (or in the case of a ship without a navicomputer, its R2 unit) fails and the ship cannot make the jump to hyperspace until the Critical Hit is repaired. If the ship or vehicle is without a hyperdrive, the vehicle or ship’s navigation systems fail, leaving it flying or driving blind, unable to tell where it is or where it’s going.",
      option9: print("pb", message) + print("pb", message) + "Power Fluctuations: The ship or vehicle is beset by random power surges and outages. The pilot cannot voluntarily inflict system strain on the ship (to gain an extra starship maneuver, for example), until this Critical Hit is repaired.",
      option10: print("pb", message) + print("pb", message) + print("pb", message) + "Shields Down: Decrease defense in affected defense zone to zero, and decrease defense in all other defense zones by one until this Critical Hit is repaired. While the defense of the affected defense zone cannot be restored until the Critical Hit is repaired, defense can be assigned to protect that defense zone from other zones as usual. If the ship or vehicle is without defense, suffer four points of system strain.",
      option11: print("pb", message) + print("pb", message) + print("pb", message) + "Engine Damaged: The ship or vehicle’s maximum speed is reduced by one point, to a minimum of one, until the Critical Hit is repaired.",
      option12: print("pb", message) + print("pb", message) + print("pb", message) + "Shield Overload: The ship’s shields completely fail. Decrease the defense of all defense zones to zero. This Critical Hit cannot be repaired until the end of the encounter, and the ship suffers two points of system strain. If the ship or vehicle is without defense, reduce armor by 1 until the Critical Hit is repaired.",
      option13: print("pb", message) + print("pb", message) + print("pb", message) + "Engines Down: The ship or vehicle’s maximum speed is reduced to zero until the Critical Hit is repaired, although it continues on its present course thanks to momentum. In addition, the ship cannot execute any maneuvers until the Critical Hit is repaired.",
      option14: print("pb", message) + print("pb", message) + print("pb", message) + "Major System Failure: One component of the attacker’s choice is heavily damaged, and is inoperable until the Critical Hit is repaired. For a list of ship components, see EotE Core Rulebook Table 7-10: Small Ship or Vehicle Components or Table 7-11: Large Ship or Vehicle Components depending on target ship silhouette.",
      option15: print("pb", message) + print("pb", message) + print("pb", message) + print("pb", message) + "Major Hull Breach: A huge, gaping tear is torn in the ship’s hull and it depressurizes. For ships and vehicles of silhouette 4 and smaller, the entire ship depressurizes in a number of rounds equal to the ship’s silhouette. Ships and vehicles of silhouette 5 and larger tend to be highly compartmentalized and have many safeguards against depressurization. These ships don’t completely depressurize, but parts do (the specifics of which parts depressurize is up to the GM; however each section of the ship or vehicle that does lose air does so in a number of rounds equal to the vehicle’s silhouette). Vehicles and ships operating in an atmosphere can better handle this Critical Hit. However, the huge tear still inflicts penalties, causing the vehicle to suffer the Destabilized Critical Hit instead.",
      option16: print("pb", message) + print("pb", message) + print("pb", message) + print("pb", message) + "Destabilized: The ship or vehicle’s structural integrity is seriously damaged. Reduce the ship or vehicle’s hull trauma threshold and system strain threshold to half their original values until repaired.",
      option17: print("pb", message) + print("pb", message) + print("pb", message) + print("pb", message) + "Fire!: Fire rages through the ship. The ship or vehicle immediately takes two points of system strain, and anyone caught in the fire takes damage as discussed on page 214 of the EotE Core Rulebook. A fire can be put out with some quick thinking and appropriate skill, Vigilance and/or Cool checks at the Game Master’s discretion. Once going, a fire takes one round per two of the ship’s silhouette points to put out.",
      option18: print("pb", message) + print("pb", message) + print("pb", message) + print("pb", message) + "Breaking Up: The vehicle or ship has suffered so much damage that it begins to come apart at its seams, breaking up and disintegrating around the crew. At the end of the following round, the ship is completely destroyed and the surrounding environment is littered with debris. Anyone aboard the ship or vehicle has one round to get to an escape pod, bail out, or dive for the nearest hatch before they are lost.",
      option19: "Vaporized: The ship or vehicle is completely destroyed, consumed in a particularly large and dramatic fireball. Nothing survives."
    };

  //build textCrit
	var textCrit = "";
	switch (true) {
    case (total <= 9):
      textCrit = crit.option1;
      break;
		case (total >= 10 && total <= 18):
			textCrit = crit.option2;
			break;
		case (total >= 19 && total <= 27):
			textCrit = crit.option3;
			break;
		case (total >= 28 && total <= 36):
			textCrit = crit.option4;
			break;
		case (total >= 37 && total <= 45):
			textCrit = crit.option5;
			break;
		case (total >= 46 && total <= 54):
			textCrit = crit.option6;
			break;
		case (total >= 55 && total <= 63):
			textCrit = crit.option7;
			break;
		case (total >= 64 && total <= 72):
			textCrit = crit.option8;
			break;
		case (total >= 73 && total <= 81):
			textCrit = crit.option9;
			break;
		case (total >= 82 && total <= 90):
			textCrit = crit.option10;
			break;
		case (total >= 91 && total <= 99):
			textCrit = crit.option11;
			break;
		case (total >= 100 && total <= 108):
			textCrit = crit.option12;
			break;
		case (total >= 109 && total <= 117):
			textCrit = crit.option13;
			break;
		case (total >= 118 && total <= 126):
			textCrit = crit.option14;
			break;
		case (total >= 127 && total <= 133):
			textCrit = crit.option15;
			break;
		case (total >= 134 && total <= 138):
			textCrit = crit.option16;
			break;
		case (total >= 139 && total <= 144):
			textCrit = crit.option17;
			break;
		case (total >= 145 && total <= 153):
			textCrit = crit.option18;
			break;
		case (total >= 154):
			textCrit = crit.option19;
			break;
		default:
			console.log ("Something has gone horribly wrong. total is " + total);
			break;
	}
	message.channel.sendMessage("Ship Crit " + total + ": " + textCrit);
}

//Destiny Point Module
if (message.content.toLowerCase().startsWith(config.prefix + "destiny")) {
  //setting the channel specific variable
  var channel = message.channel.name;
  if (destinyBalance[channel] == undefined) {
    destinyBalance[channel] = {
        light: 0,
        dark: 0,
        face: "",
        };
  }

  //!destiny commands
  var command = params[0];
  switch(command) {
    //Sets Denstiny balance per color
    case "set":
      destinyBalance[channel] = {
        light: 0,
        dark: 0,
        face: "",
        };
      console.log("Setting current Destiny Balance for " + message.author.username);
      //check if numbers are used
      if (params.length > 1) {
        if (checkNumbers(params[1]) != null) {
          for (var i = 0; i < params.length; i++) {
            var color = params[i].replace(/\d/g, "");
            switch(color) {
              case "l":
                destinyBalance[channel].light = extractNumbers(params[i]);
                break;
              case "d":
                destinyBalance[channel].dark = extractNumbers(params[i]);
                break;
              default:
                break;
              }
          }
          printdestinyBalance();
          break;
        } else {
          for(var i = 0; i < params[1].length; i++) {
            var color = params[1][i];
            switch(color) {
              case "l":
                destinyBalance[channel].light = destinyBalance[channel].light + 1;
                break;
              case "d":
                destinyBalance[channel].dark = destinyBalance[channel].dark + 1;
                break;
              default:
                break;
            }
          }
          printdestinyBalance();
          break;
          }
        }
        printdestinyBalance();
        break;

    //Reset the Destiny pool
    case "reset":
      console.log(message.author.username + " resets the Destiny Pool");
      destinyBalance[channel] = {
            light: 0,
            dark: 0,
            face: " ",
          };
      message.channel.sendMessage(message.author.username + " resets the Destiny Pool");
      printdestinyBalance();
      break;

    //Use a lightside from the Destiny pool
    case "light":
    case "l":
      if (destinyBalance[channel].light <= 0){
      message.channel.sendMessage("No lightside points available, request will be ignored");
      printdestinyBalance();
      break;
      } else {
      console.log(message.author.username + " uses a Lightside point");
      destinyBalance[channel].light--;
      destinyBalance[channel].dark++;
      message.channel.sendMessage(message.author.username + " uses a Lightside point");
      printdestinyBalance();
      break;
      }

    //Use a darkside from the Destiny pool
    case "dark":
    case "d":
      if (destinyBalance[channel].dark <= 0){
      message.channel.sendMessage("No Darkside points available, request will be ignored");
      printdestinyBalance();
      break;
      } else {
      console.log(message.author.username + " uses a Darkside point");
      destinyBalance[channel].dark--;
      destinyBalance[channel].light++;
      message.channel.sendMessage(message.author.username + " uses a Darkside point");
      printdestinyBalance();
      break;
      }

    case "roll":
      var destinyRoll = {
        light: 0,
        dark: 0,
        face: "",
      };
      destinyRoll = rollWhite(1, message);
      destinyBalance[channel].light = +destinyBalance[channel].light + +destinyRoll.light;
      destinyBalance[channel].dark = +destinyBalance[channel].dark + +destinyRoll.dark;
      message.channel.sendMessage(message.author.username + " rolls");
      message.channel.sendMessage(destinyRoll.face);
      destinyRoll.face = "";
      for (var i = 1; i <= destinyRoll.light; i++) {
        	destinyRoll.face += print("ls", message);
        	}
    	for (var i = 1; i <= destinyRoll.dark; i++) {
        	destinyRoll.face += print("ds", message);
      		}

      message.channel.sendMessage("Adding " + destinyRoll.face + " to the Destiny Pool");
      printdestinyBalance();
      break;

    default:
      console.log("Just printing destinyBalance");
      printdestinyBalance();
      break;
  }

  //Prints out destiny pool to channel
	function printdestinyBalance() {
      destinyBalance[channel].face = "";
  	for (var i = 1; i <= destinyBalance[channel].light; i++) {
      	destinyBalance[channel].face += print("ls", message);
      	}
  	for (var i = 1; i <= destinyBalance[channel].dark; i++) {
      	destinyBalance[channel].face += print("ds", message);
    		}
  	message.channel.sendMessage("Destiny Pool: ")
    if (destinyBalance[channel].face != "") {
    message.channel.sendMessage(destinyBalance[channel].face);
    }
  }
}
}

//Character Tracker
if (message.content.toLowerCase().startsWith(config.prefix + "char")) {
  //setting the channel specific variables
  var channel = message.channel.name;
  var characterName = "";
  var command = params[0];
  if (params[1] != undefined) {
    characterName = params[1].toUpperCase();
  }

  if (characterStatus[channel] == undefined) {
    characterStatus[channel] = {
      blankCharacter: {
        maxWound: 0,
        maxStrain: 0,
        currentWound: 0,
        currentStrain: 0,
        credits: 0
      },
    };
  }

  if (command == undefined) {
    message.channel.sendMessage("Bad Command, !help char for more information");
  } else if (characterName == "") {
    message.channel.sendMessage("No characterName, !help char for more information");
  } else if (characterStatus[channel][characterName] == undefined && command != "setup") {
    message.channel.sendMessage(characterName + " has not been set up.  Please use !char setup characterName [maxWound] [maxStrain] [credits] to complete setup.");
  } else {
      switch(command) {
        case "setup":
          //init the new characters stats
          console.log("Setting up " + characterName);
          characterStatus[channel][characterName] = {
            maxWound: 0,
            maxStrain: 0,
            currentWound: 0,
            currentStrain: 0,
            credits: 0
          };
          if (params[2] != undefined) {
            characterStatus[channel][characterName].maxWound = params[2];
          }
          if (params[3] != undefined) {
            characterStatus[channel][characterName].maxStrain = params[3];
          }
          if (params[4] != undefined) {
            characterStatus[channel][characterName].credits = params[4];
          }
          message.channel.sendMessage(characterName + "\nWounds: " + characterStatus[channel][characterName].currentWound + "/" + characterStatus[channel][characterName].maxWound + "\nStrain: " + characterStatus[channel][characterName].currentStrain + "/" + characterStatus[channel][characterName].maxStrain + "\nCredits: " + characterStatus[channel][characterName].credits);
          break;

        case "wound":
        case "w":
          if (params.length < 3) {
            message.channel.sendMessage("\nWound: " + characterStatus[channel][characterName].currentWound + "/" + characterStatus[channel][characterName].maxWound);
          //addition modifier
          } else if (params.includes("+") || params[params.length - 1][0] == "+") {
              var modifier = extractNumbers(params[params.length - 1]);
              characterStatus[channel][characterName].currentWound = +characterStatus[channel][characterName].currentWound + +modifier;
              if (+characterStatus[channel][characterName].currentWound > 2 * +characterStatus[channel][characterName].maxWound) {
                characterStatus[channel][characterName].currentWound = 2 * +characterStatus[channel][characterName].maxWound;
              }
              message.channel.sendMessage(characterName + " takes " + modifier + " wounds.");
              message.channel.sendMessage("\nWound: " + characterStatus[channel][characterName].currentWound + "/" + characterStatus[channel][characterName].maxWound);
          //subtraction modifier
          } else if (params.includes("-") || params[params.length - 1][0] == "-") {
              var modifier = extractNumbers(params[params.length - 1]);
              characterStatus[channel][characterName].currentWound = +characterStatus[channel][characterName].currentWound - +modifier;
              message.channel.sendMessage(characterName + " recovers from " + modifier + " wounds.");
              if (+characterStatus[channel][characterName].currentWound < 0) {
                characterStatus[channel][characterName].currentWound = 0;
              }
              message.channel.sendMessage("\nWound: " + characterStatus[channel][characterName].currentWound + "/" + characterStatus[channel][characterName].maxWound);
          }
          if (+characterStatus[channel][characterName].currentWound >= +characterStatus[channel][characterName].maxWound) {
            message.channel.sendMessage(characterName + " is incapacitated.");
          }
          break;

        case "strain":
        case "s":
          if (params.length < 3) {
            message.channel.sendMessage("\nStrain: " + characterStatus[channel][characterName].currentStrain + "/" + characterStatus[channel][characterName].maxStrain);
          } else if (params.includes("+") || params[params.length - 1][0] == "+") {
            var modifier = extractNumbers(params[params.length - 1]);
            characterStatus[channel][characterName].currentStrain = +characterStatus[channel][characterName].currentStrain + +modifier;
            message.channel.sendMessage(characterName + " takes " + modifier + " strain.");
            if (+characterStatus[channel][characterName].currentStrain > +characterStatus[channel][characterName].maxStrain) {
              characterStatus[channel][characterName].currentStrain = characterStatus[channel][characterName].maxStrain;
            }
            message.channel.sendMessage("\nStrain: " + characterStatus[channel][characterName].currentStrain + "/" + characterStatus[channel][characterName].maxStrain);

          } else if (params.includes("-") || params[params.length - 1][0] == "-") {
            var modifier = extractNumbers(params[params.length - 1]);
            characterStatus[channel][characterName].currentStrain = +characterStatus[channel][characterName].currentStrain - +modifier;
            message.channel.sendMessage(characterName + " recovers " + modifier + " strain.");
            if (+characterStatus[channel][characterName].currentStrain < 0) {
              characterStatus[channel][characterName].currentStrain = 0;
            }
            message.channel.sendMessage("\nStrain: " + characterStatus[channel][characterName].currentStrain + "/" + characterStatus[channel][characterName].maxStrain);
          }
          if (+characterStatus[channel][characterName].currentStrain >= +characterStatus[channel][characterName].maxStrain) {
            message.channel.sendMessage(characterName + " is incapacitated.");
          }
          break;

        case "credit":
        case "credits":
        case "c":
          if (params.length < 3) {
            message.channel.sendMessage(characterName + " has " + characterStatus[channel][characterName].credits + " credits.");
          //addition modifier
          } else if (params.includes("+") || params[params.length - 1][0] == "+") {
              var modifier = extractNumbers(params[params.length - 1]);
              characterStatus[channel][characterName].credits = +characterStatus[channel][characterName].credits + +modifier;
              message.channel.sendMessage(characterName + " gets " + modifier + " credits for a total of " + +characterStatus[channel][characterName].credits + ".");
          //subtraction modifier
          } else if (params.includes("-") || params[params.length - 1][0] == "-") {
              var modifier = extractNumbers(params[params.length - 1]);
              if (modifier > +characterStatus[channel][characterName].credits) {
                message.channel.sendMessage(characterName + " does not have " + modifier + " credits! " + characterName + " only has " + characterStatus[channel][characterName].credits + " credits.");
              } else {
              characterStatus[channel][characterName].credits = +characterStatus[channel][characterName].credits - +modifier;
              message.channel.sendMessage(characterName + " pays " + modifier + " credits for a total of " + +characterStatus[channel][characterName].credits + ".");
            }
          }
          break;

        case "status":
          message.channel.sendMessage(characterName + "\nWounds: " + characterStatus[channel][characterName].currentWound + "/" + characterStatus[channel][characterName].maxWound + "\nStrain: " + characterStatus[channel][characterName].currentStrain + "/" + characterStatus[channel][characterName].maxStrain + "\nCredits: " + characterStatus[channel][characterName].credits);
          break;

        default:
          message.channel.sendMessage("Bad Command, !help char for more information");
          break;

        }
      }
}

if (message.content.toLowerCase().startsWith(config.prefix + "help")) {
  console.log(params);
  if (params == "") {
    message.channel.sendMessage("```Type '!help [topic] for futher information'\n\n\t!roll\t\trolls any combination of SWRPG dice and returns the cancelled results.\n\t!d100\t\trolls a d100 with optional modifier and displays result.\n\t!destiny\t sets and manages the Destiny Balance for the group.\n\t!crit\t\trolls a d100 with optional modifier and displays result of the critical hit.\n\t!shipcrit\trolls a d100 with optional modifier and displays result of the ship critical hit.\n\t!char\t\tsimple character stat manager.\n\t!ver\t\t displays bot version\n\t!help\t\tdisplays help for topics.\n```");
  } else {
    var topic = params[0];
    switch (topic) {
      case "destiny":
        message.channel.sendMessage("```\n\t!destiny\t\t\tview the destiny pool\n\t!destiny roll\t   rolls a Force Die and adds it to the destiny pool\n\t!destiny l/light\tuses light side point\n\t!destiny d/dark\t uses dark side point\n\t!destiny set #l #d  sets destiny pool\n\t!destiny set lldd   sets destiny pool\n\t!destiny reset\t  resets the destiny pool\n```");
        break;
      case "char":
        message.channel.sendMessage("```\n\t!char\t\t\t\t\t\t\t\t\t\t\t\t\t\t  simple character stat manager\n\t!char setup characterName [maxWound] [maxStrain] [credits]\t setup a new character\n\t!char wound/w characterName +X/-X\t\t\t\t\t\t\t  increases/decreases wounds for characterName by X\n\t!char strain/s characterName +X/-X\t\t\t\t\t\t\t increases/decreases strain for characterName by X\n\t!char credits/c characterName +X/-X\t\t\t\t\t\t\tincreases/decreases credit balance for characterName by X\n\t!char status characterName\t\t\t\t\t\t\t\t\t current status for characterName  ```");
        break;
      case "roll":
        message.channel.sendMessage("```\t!roll\trolls any combination of SWRPG dice and returns the canceled results\n\n\t\tYou may add \" \" in the line to give the roll a name like Initiative\n\t\tDice results and cancellations are computed by the bot so you don't have to! Only the remaining symbols will be displayed.\n\n\tDICE IDENTIFIERS\n\n\t\ty/pro = Yellow/Proficiency\n\t\tg/a = Green/Ability\n\t\tb/boo = Blue/Boost\n\t\tblk/k/sb/s = Black/Setback\n\t\tr/c = Red/ Challenge\n\t\tp/diff = Purple/Difficulty\n\t\tw/f = White/Force\n\n\t\t\tnote: if you use the !roll yyyggbbd method you must use the single character dice identifiers\n\n\t\t!roll yyyggbbd \"Blast Him!\" \n\t\t!roll 3pro 2a 2boo 2dif 2sb \"Delusions of Grandeur\"\n\t\t!roll \"Get to the ship\" 2y 1g 1r 1p\n```");
        break;
      default:
        break;
      }
    }
}


// Roll the dice command
if (message.content.toLowerCase().startsWith(config.prefix + "roll")) {
  console.log("Rolling dice for " + message.author.username);
  /*Sorting the dice types by suffix
  7 unique dice in total
  y/pro = Yellow
  g/a = Green
  b/boo = Blue
  blk/sb/k = Black
  r/c = red
  p/diff = Purple
  d/w/f = destiny/white
  */

  //Switch to abort command if ever turns true
  var abandonShip = false;

  //init diceResult
  diceResult = {
    success: 0,
    failure: 0,
    advantage: 0,
    threat: 0,
    triumph: 0,
    despair: 0,
    light: 0,
    dark: 0,
    face: "",
  };

  //Iterate over the parameters and call the dice roll functions respective to color
  // this allows users to list dice colors in any order

  if (params.length > 0) {
    if (checkNumbers(params[0]) != null) {
      for (var i = 0; i < params.length; i++) {
        //extracts the number of dice to roll
        var diceQty = extractNumbers(params[i]);
        if (diceQty > config.maxRollsPerDie) {
          abandonShip = true;
          break;
        }
        rollDice(params[i], diceQty, message);
      }
    } else {
      for(var i = 0; i < params[0].length; i++) {
        var diceQty = 1;
        rollDice(params[0][i], diceQty, message);
      }
    }
}

  console.log("\nThe Standing Count is");
  console.log(diceResult);

  //BEGIN PREPARING THE MESSAGE TO SEND
  var cancelledDiceResult = {
    success: 0,
    failure: 0,
    advantage: 0,
    threat: 0,
    triumph: 0,
    despair: 0,
    light: 0,
    dark: 0
  };

  //Do the cancellations
  if (!abandonShip) {

    var response = "";

    //cancel success/failures
    if (diceResult.success > diceResult.failure) {
      var successRemaining = diceResult.success - diceResult.failure;
      cancelledDiceResult.success = successRemaining;
      response += "   " + print("suc", message) + successRemaining;
    } else if (diceResult.success < diceResult.failure) {
      var failureRemaining = diceResult.failure - diceResult.success;
      cancelledDiceResult.failure = failureRemaining;
      response += "   " + print("fail", message) + failureRemaining;
    }

    //cancel Advantage/Threat
    if (diceResult.advantage > diceResult.threat) {
      var advantageRemaining = diceResult.advantage - diceResult.threat;
      cancelledDiceResult.advantage = advantageRemaining;
      response += "   " + print("adv", message) + advantageRemaining;
    } else if (diceResult.advantage < diceResult.threat) {
      var threatRemaining = diceResult.threat - diceResult.advantage;
      cancelledDiceResult.threat = threatRemaining;
      response += "   " + print("thr", message) + threatRemaining;
    }
    //Check for any Triumphs
    if (diceResult.triumph != 0) {
      cancelledDiceResult.triumph = diceResult.triumph;
      response += "   " + print("tri", message) + diceResult.triumph;
    }
    //Check for any Despair
    if (diceResult.despair != 0) {
      cancelledDiceResult.despair = diceResult.despair;
      response += "   " + print("des", message) + diceResult.despair;
    }

    //check for force
    if (diceResult.light != 0) {
      response += "   " + print("ls", message) + diceResult.light;
    }

    if (diceResult.dark != 0) {
      response += "   " + print("ds", message) + diceResult.dark;
    }

    message.channel.sendMessage(message.author.username + " roll results: " + config.descriptorPrepend + " " + desc);
    if (diceResult.face != "") {
    message.channel.sendMessage(diceResult.face);
    }
    message.channel.sendMessage("Final results: " + response);

  } else if (abandonShip) {
    message.reply("Roll exceeds max roll per die limit of " + config.maxRollsPerDie + " . Please try again.");
  }
}
});

//Function for extracting the number of times to roll a dice from the command string
function extractNumbers(str) {
  var num = str.replace(/\D/g, "");
  return num;
}

function checkNumbers(str) {
  var num = str.match(/\d+/g);
  return num;
}

//Function that generates random numbers based on varying dice sizes
function randomInteger(num) {
  var result = Math.floor(Math.random() * num) + 1;
  return result;
}

//function for rolling a d100 and using a modifier
function d100(str, message) {
  var total = 0;
  //no modifier
  if (str.length < 1) {
    console.log("No modifier, straight d100 roll");
      let r = Math.floor(Math.random() * 100) + 1;
      total = +r;
      message.channel.sendMessage(message.author.username + " rolled: " + total);
  //addition modifier
  } else if (str.includes("+") || str[0][0] == "+") {
		console.log("+ modifier detected");
        var modifier = extractNumbers(str[str.length - 1]);
        let r = Math.floor(Math.random() * 100) + 1;
        total = +r + +modifier;
        message.channel.sendMessage(message.author.username + " rolled: " + r + " + " + modifier + " " + "for a total of " + total);
	//subtraction modifier
} else if (str.includes("-") ||str[0][0] == "-") {
    	console.log("- modifier detected");
        var modifier = extractNumbers(str[str.length - 1]);
        let r = Math.floor(Math.random() * 100) + 1;
        total = +r - +modifier;
        message.channel.sendMessage(message.author.username + " rolled: " + r + " - " + modifier + " " + "for a total of " + total);
    }
    return (total);
}
//uses the current params to roll dice and adds result to diceResult
function rollDice(color, diceQty, message) {
    color = color.replace(/\d/g, "");
    switch(color) {
      case "y":
      case "pro":
      //case "p":
        console.log("Rolling " + diceQty + " Proficiency Dice.");
        //Call the function that rolls the yellow dice
        var yellowResult = rollYellow(diceQty, message);
        //Add the result of all the yellow dice rolls to the standing count
        for (var k in yellowResult) {
          diceResult[k] += yellowResult[k];
        }
        break;
      case "g":
      case "a":
        console.log("Rolling " + diceQty + " Ability Dice.");
        //Call the function that rolls the green dice
        var greenResult = rollGreen(diceQty, message);
        //Add the result of all the green dice rolls to the standing count
        for (var k in greenResult) {
          diceResult[k] += greenResult[k];
        }
        break;

      case "b":
      case "boo":
        console.log("Rolling " + diceQty + " Boost Dice.");
        //Call the function that rolls the blue dice
        var blueResult = rollBlue(diceQty, message);
        //Add the result of all the blue dice rolls to the standing count
        for (var k in blueResult) {
          diceResult[k] += blueResult[k];
        }
        break;

      case "blk":
      case "sb":
      case "s":
      case "k":
        console.log("Rolling " + diceQty + " Setback Dice.");
        //Call the function that rolls the black dice
        var blackResult = rollBlack(diceQty, message);
        //Add the result of all the black dice rolls to the standing count
        for (var k in blackResult) {
          diceResult[k] += blackResult[k];
        }
        break;

      case "r":
      case "c":
        console.log("Rolling " + diceQty + " Challenge Dice.");
        //Call the function that rolls the red dice
        var redResult = rollRed(diceQty, message);
        //Add the result of all the red dice rolls to the standing count
        for (var k in redResult) {
          diceResult[k] += redResult[k];
        }
        break;

      case "p":
      case "diff":
      case "d":
        console.log("Rolling " + diceQty + " Difficulty Dice.");
        //Call the function that rolls the purple dice
        var purpleResult = rollPurple(diceQty, message);
        //Add the result of all the purple dice rolls to the standing count
        for (var k in purpleResult) {
          diceResult[k] += purpleResult[k];
        }
        break;

      case "w":
      case "f":
        console.log("Rolling " + diceQty + " Destiny Dice.");
        //Call the function that rolls the white dice
        var whiteResult = rollWhite(diceQty,message);
        //Add the result of all the white dice rolls to the standing count
        for (var k in whiteResult) {
          diceResult[k] += whiteResult[k];
        }
      default:
      break;
    }
  return diceResult;
}

function rollBlue(diceQty, message) {
  //Blue "Boost" die (d6)
  //1 Blank
  //2 Blank
  //3 Success
  //4 Advantage
  //5 Advantage + Advantage
  //6 Success + Advantage
  var roll = 0;
  var diceResult = {
    success: 0,
    failure: 0,
    advantage: 0,
    threat: 0,
    triumph: 0,
    despair: 0,
    light: 0,
    dark: 0,
    face: ""
  };

  for (var i = 1; i <= diceQty; i++) {

    roll = randomInteger(6);
    //console.log(chalk.white.bgBlue("Dice landed on side " + roll));

    switch (roll) {
      case 1:
        console.log(chalk.white.bgBlue("Blank"));
        diceResult.face += print("bb", message);
        break;
      case 2:
        console.log(chalk.white.bgBlue("Blank"));
        diceResult.face += print("bb", message);
        break;
      case 3:
        console.log(chalk.white.bgBlue("Success"));
        diceResult.success = diceResult.success + 1;
        diceResult.face += print("bs", message);
        break;
      case 4:
        console.log(chalk.white.bgBlue("Advantage"));
        diceResult.advantage = diceResult.advantage + 1;
        diceResult.face += print("ba", message);
        break;
      case 5:
        console.log(chalk.white.bgBlue("Advantage x2"));
        diceResult.advantage = diceResult.advantage + 2;
        diceResult.face += print("baa", message);
        break;
      case 6:
        console.log(chalk.white.bgBlue("Success + Advantage"));
        diceResult.success = diceResult.success + 1;
        diceResult.advantage = diceResult.advantage + 1;
        diceResult.face += print("bsa", message);
        break;
    }
  }
  return diceResult;
}

function rollGreen(diceQty, message) {
  //Green "Ability" die (d8)
  //1 Blank
  //2 Success
  //3 Success
  //4 Advantage
  //5 Advantage
  //6 Success + Advantage
  //7 Advantage + Advantage
  //8 Success + Success
  var roll = 0;
  var diceResult = {
    success: 0,
    failure: 0,
    advantage: 0,
    threat: 0,
    triumph: 0,
    despair: 0,
    light: 0,
    dark: 0,
    face: ""
  };

  for (var i = 1; i <= diceQty; i++) {

    roll = randomInteger(8);


    switch (roll) {
      case 1:
        console.log(chalk.white.bgGreen("Blank"));
        diceResult.face += print("gb", message);
        break;
      case 2:
        console.log(chalk.white.bgGreen("Success"));
        diceResult.face += print("gs", message);
        diceResult.success = diceResult.success + 1;
        break;
      case 3:
        console.log(chalk.white.bgGreen("Success"));
        diceResult.face += print("gs", message);
        diceResult.success = diceResult.success + 1;
        break;
      case 4:
        console.log(chalk.white.bgGreen("Advantage"));
        diceResult.face += print("ga", message);
        diceResult.advantage = diceResult.advantage + 1;
        break;
      case 5:
        console.log(chalk.white.bgGreen("Advantage"));
        diceResult.face += print("ga", message);
        diceResult.advantage = diceResult.advantage + 1;
        break;
      case 6:
        console.log(chalk.white.bgGreen("Success + Advantage"));
        diceResult.face += print("gsa", message);
        diceResult.success = diceResult.success + 1;
        diceResult.advantage = diceResult.advantage + 1;
        break;
      case 7:
        console.log(chalk.white.bgGreen("Advantage x2"));
        diceResult.face += print("gaa", message);
        diceResult.advantage = diceResult.advantage + 2;
        break;
      case 8:
        console.log(chalk.white.bgGreen("Success x2"));
        diceResult.face += print("gss", message);
        diceResult.success = diceResult.success + 2;
        break;
    }
  }
  return diceResult;
}
//
function rollYellow(diceQty, message) {
  //Yellow "Proficiency" die (d12)
  //1 Blank
  //2 success
  //3 success
  //4 success x2
  //5 success x2
  //6 advantage
  //7 success + advantage
  //8 success + advantage
  //9 success + advantage
  //10 advantage + advantage
  //11 advantage + advantage
  //12 triumph
  var roll = 0;
  var diceResult = {
    success: 0,
    failure: 0,
    advantage: 0,
    threat: 0,
    triumph: 0,
    despair: 0,
    light: 0,
    dark: 0,
    face: ""
  };

  for (var i = 1; i <= diceQty; i++) {

    roll = randomInteger(12);


    switch (roll) {
      case 1:
        console.log(chalk.black.bgYellow("blank"));
        diceResult.face += print("yb", message);
        break;
      case 2:
        console.log(chalk.black.bgYellow("Success"));
        diceResult.success = diceResult.success + 1;
        diceResult.face += print("ys", message);
        break;
      case 3:
        console.log(chalk.black.bgYellow("Success"));
        diceResult.success = diceResult.success + 1;
        diceResult.face += print("ys", message);
        break;
      case 4:
        console.log(chalk.black.bgYellow("Success x2"));
        diceResult.success = diceResult.success + 2;
        diceResult.face += print("yss", message);
        break;
      case 5:
        console.log(chalk.black.bgYellow("Success x2"));
        diceResult.success = diceResult.success + 2;
        diceResult.face += print("yss", message);
        break;
      case 6:
        console.log(chalk.black.bgYellow("Advantage"));
        diceResult.advantage = diceResult.advantage + 1;
        diceResult.face += print("ya", message);
        break;
      case 7:
        console.log(chalk.black.bgYellow("Success + Advantage"));
        diceResult.success = diceResult.success + 1;
        diceResult.advantage = diceResult.advantage + 1;
        diceResult.face += print("ysa", message);
        break;
      case 8:
        console.log(chalk.black.bgYellow("Success + Advantage"));
        diceResult.success = diceResult.success + 1;
        diceResult.advantage = diceResult.advantage + 1;
        diceResult.face += print("ysa", message);
        break;
      case 9:
        console.log(chalk.black.bgYellow("Success + Advantage"));
        diceResult.success = diceResult.success + 1;
        diceResult.advantage = diceResult.advantage + 1;
        diceResult.face += print("ysa", message);
        break;
      case 10:
        console.log(chalk.black.bgYellow("Advantage x2"));
        diceResult.advantage = diceResult.advantage + 2;
        diceResult.face += print("yaa", message);
        break;
      case 11:
        console.log(chalk.black.bgYellow("Advantage x2"));
        diceResult.advantage = diceResult.advantage + 2;
        diceResult.face += print("yaa", message);
        break;
      case 12:
        console.log(chalk.black.bgYellow("Triumph"));
        diceResult.triumph = diceResult.triumph + 1;
        diceResult.success = diceResult.success + 1;
        diceResult.face += print("yt", message);
        break;
    }
  }
  return diceResult;
}
//
function rollBlack(diceQty, message) {
  //Black "Setback" die (d6)
  //1 Blank
  //2 Blank
  //3 Failure
  //4 Failure
  //5 Threat
  //6 Threat
  var roll = 0;
  var diceResult = {
    success: 0,
    failure: 0,
    advantage: 0,
    threat: 0,
    triumph: 0,
    despair: 0,
    light: 0,
    dark: 0,
    face: ""
  };

  for (var i = 1; i <= diceQty; i++) {

    roll = randomInteger(6);

    switch (roll) {
      case 1:
        console.log(chalk.white.bgBlack("Blank"));
        diceResult.face += print("blkb", message);
        break;
      case 2:
        console.log(chalk.white.bgBlack("Blank"));
        diceResult.face += print("blkb", message);
        break;
      case 3:
        console.log(chalk.white.bgBlack("Failure"));
        diceResult.failure = diceResult.failure + 1;
        diceResult.face += print("blkf", message);
        break;
      case 4:
        console.log(chalk.white.bgBlack("Failure"));
        diceResult.failure = diceResult.failure + 1;
        diceResult.face += print("blkf", message);
        break;
      case 5:
        console.log(chalk.white.bgBlack("Threat"));
        diceResult.threat = diceResult.threat + 1;
        diceResult.face += print("blkt", message);
        break;
      case 6:
        console.log(chalk.white.bgBlack("Threat"));
        diceResult.threat = diceResult.threat + 1;
        diceResult.face += print("blkt", message);
        break;
    }
  }
  return diceResult;
}
//
function rollPurple(diceQty, message) {
  //Purple "Difficulty" die (d8)
  //1 Blank
  //2 Failure
  //3 Failure x2
  //4 Threat
  //5 Threat
  //6 Threat
  //7 Threat + Threat
  //8 Failure + Threat
  var roll = 0;
  var diceResult = {
    success: 0,
    failure: 0,
    advantage: 0,
    threat: 0,
    triumph: 0,
    despair: 0,
    light: 0,
    dark: 0,
    face: ""
  };

  for (var i = 1; i <= diceQty; i++) {

    roll = randomInteger(8);


    switch (roll) {
      case 1:
        console.log(chalk.white.bgMagenta("Blank"));
        diceResult.face += print("pb", message);
        break;
      case 2:
        console.log(chalk.white.bgMagenta("Failure"));
        diceResult.failure = diceResult.failure + 1;
        diceResult.face += print("pf", message);
        break;
      case 3:
        console.log(chalk.white.bgMagenta("Failure x2"));
        diceResult.failure = diceResult.failure + 2;
        diceResult.face += print("pff", message);
        break;
      case 4:
        console.log(chalk.white.bgMagenta("Threat"));
        diceResult.threat = diceResult.threat + 1;
        diceResult.face += print("pt", message);
        break;
      case 5:
        console.log(chalk.white.bgMagenta("Threat"));
        diceResult.threat = diceResult.threat + 1;
        diceResult.face += print("pt", message);
        break;
      case 6:
        console.log(chalk.white.bgMagenta("Threat"));
        diceResult.threat = diceResult.threat + 1;
        diceResult.face += print("pt", message);
        break;
      case 7:
        console.log(chalk.white.bgMagenta("Threat x2"));
        diceResult.threat = diceResult.threat + 2;
        diceResult.face += print("ptt", message);
        break;
      case 8:
        console.log(chalk.white.bgMagenta("Failure + Threat"));
        diceResult.failure = diceResult.failure + 1;
        diceResult.threat = diceResult.threat + 1;
        diceResult.face += print("pft", message);
        break;
    }
  }
  return diceResult;
}
//
function rollRed(diceQty, message) {
  //Red "Challenge" die (d12)
  //1 Blank
  //2 Despair
  //3 Failure
  //4 Failure
  //5 Threat
  //6 Threat
  //7 Failure + Failure
  //8 Failure + Failure
  //9 Threat + Threat
  //10 Threat + Threat
  //11 Failure + Threat
  //12 Failure + Threat
  var roll = 0;
  var diceResult = {
    success: 0,
    failure: 0,
    advantage: 0,
    threat: 0,
    triumph: 0,
    despair: 0,
    light: 0,
    dark: 0,
    face: ""
  };


  for (var i = 1; i <= diceQty; i++) {

    roll = randomInteger(12);


    switch (roll) {
      case 1:
        console.log(chalk.black.bgRed("Blank"));
        diceResult.face += print("rb", message);
        break;
      case 2:
        console.log(chalk.black.bgRed("Despair"));
        diceResult.despair = diceResult.despair + 1;
        diceResult.failure = diceResult.failure + 1;
        diceResult.face += print("rd", message);
        break;
      case 3:
        console.log(chalk.black.bgRed("Failure"));
        diceResult.failure = diceResult.failure + 1;
        diceResult.face += print("rf", message);
        break;
      case 4:
        console.log(chalk.black.bgRed("Failure"));
        diceResult.failure = diceResult.failure + 1;
        diceResult.face += print("rf", message);
        break;
      case 5:
        console.log(chalk.black.bgRed("Threat"));
        diceResult.threat = diceResult.threat + 1;
        diceResult.face += print("rt", message);
        break;
      case 6:
        console.log(chalk.black.bgRed("Threat"));
        diceResult.threat = diceResult.threat + 1;
        diceResult.face += print("rt", message);
        break;
      case 7:
        console.log(chalk.black.bgRed("Failure x2"));
        diceResult.failure = diceResult.failure + 2;
        diceResult.face += print("rff", message);
        break;
      case 8:
        console.log(chalk.black.bgRed("Failure x2"));
        diceResult.failure = diceResult.failure + 2;
        diceResult.face += print("rff", message);
        break;
      case 9:
        console.log(chalk.black.bgRed("Threat x2"));
        diceResult.threat = diceResult.threat + 2;
        diceResult.face += print("rtt", message);
        break;
      case 10:
        console.log(chalk.black.bgRed("Threat x2"));
        diceResult.threat = diceResult.threat + 2;
        diceResult.face += print("rtt", message);
        break;
      case 11:
        console.log(chalk.black.bgRed("Failure + Threat"));
        diceResult.failure = diceResult.failure + 1;
        diceResult.threat = diceResult.threat + 1;
        diceResult.face += print("rft", message);
        break;
      case 12:
        console.log(chalk.black.bgRed("Failure + Threat"));
        diceResult.failure = diceResult.failure + 1;
        diceResult.threat = diceResult.threat + 1;
        diceResult.face += print("rft", message);
        break;
    }
  }
  return diceResult;
}
//
function rollWhite(diceQty, message) {
  //White "Force" die (d12)
  //1 Light
  //2 Light
  //3 Light + Light
  //4 Light + Light
  //5 Light + Light
  //6 Dark
  //7 Dark
  //8 Dark
  //9 Dark
  //10 Dark
  //11 Dark
  //12 Dark + Dark
  var roll = 0;
  var diceResult = {
    success: 0,
    failure: 0,
    advantage: 0,
    threat: 0,
    triumph: 0,
    despair: 0,
    light: 0,
    dark: 0,
    face: ""
  };


  for (var i = 1; i <= diceQty; i++) {

    roll = randomInteger(12);


    switch (roll) {
      case 1:
        console.log(chalk.black.bgWhite("Light"));
        diceResult.light = diceResult.light + 1;
        diceResult.face += print("wl", message);
        break;
      case 2:
        console.log(chalk.black.bgWhite("Light"));
        diceResult.light = diceResult.light + 1;
        diceResult.face += print("wl", message);
        break;
      case 3:
        console.log(chalk.black.bgWhite("Light x2"));
        diceResult.light = diceResult.light + 2;
        diceResult.face += print("wll", message);
        break;
      case 4:
        console.log(chalk.black.bgWhite("Light x2"));
        diceResult.light = diceResult.light + 2;
        diceResult.face += print("wll", message);
        break;
      case 5:
        console.log(chalk.black.bgWhite("Light x2"));
        diceResult.light = diceResult.light + 2;
        diceResult.face += print("wll", message);
        break;
      case 6:
        console.log(chalk.black.bgWhite("Dark"));
        diceResult.dark = diceResult.dark + 1;
        diceResult.face += print("wd", message);
        break;
      case 7:
        console.log(chalk.black.bgWhite("Dark"));
        diceResult.dark = diceResult.dark + 1;
        diceResult.face += print("wd", message);
        break;
      case 8:
        console.log(chalk.black.bgWhite("Dark"));
        diceResult.dark = diceResult.dark + 1;
        diceResult.face += print("wd", message);
        break;
      case 9:
        console.log(chalk.black.bgWhite("Dark"));
        diceResult.dark = diceResult.dark + 1;
        diceResult.face += print("wd", message);
        break;
      case 10:
        console.log(chalk.black.bgWhite("Dark"));
        diceResult.dark = diceResult.dark + 1;
        diceResult.face += print("wd", message);
        break;
      case 11:
        console.log(chalk.black.bgWhite("Dark"));
        diceResult.dark = diceResult.dark + 1;
        diceResult.face += print("wd", message);
        break;
      case 12:
        console.log(chalk.black.bgWhite("Dark x2"));
        diceResult.dark = diceResult.dark + 2;
        diceResult.face += print("wdd", message);
        break;
    }
  }
  return diceResult;
}
