var d100 = require("./d100.js");

exports.crit = function crit(params, message, print) {
  var total = d100.d100(params, message);
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

exports.shipcrit = function shipcrit(params, message, print) {

    var total = d100.d100(params, message);
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
