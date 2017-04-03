exports.char = function char(params, characterStatus, message, print) {
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
              var modifier = (params[params.length - 1]).replace(/\D/g, "");
              characterStatus[channel][characterName].currentWound = +characterStatus[channel][characterName].currentWound + +modifier;
              if (+characterStatus[channel][characterName].currentWound > 2 * +characterStatus[channel][characterName].maxWound) {
                characterStatus[channel][characterName].currentWound = 2 * +characterStatus[channel][characterName].maxWound;
              }
              message.channel.sendMessage(characterName + " takes " + modifier + " wounds.");
              message.channel.sendMessage("\nWound: " + characterStatus[channel][characterName].currentWound + "/" + characterStatus[channel][characterName].maxWound);
          //subtraction modifier
          } else if (params.includes("-") || params[params.length - 1][0] == "-") {
              var modifier = (params[params.length - 1]).replace(/\D/g, "");
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
            var modifier = (params[params.length - 1]).replace(/\D/g, "");
            characterStatus[channel][characterName].currentStrain = +characterStatus[channel][characterName].currentStrain + +modifier;
            message.channel.sendMessage(characterName + " takes " + modifier + " strain.");
            if (+characterStatus[channel][characterName].currentStrain > +characterStatus[channel][characterName].maxStrain) {
              characterStatus[channel][characterName].currentStrain = characterStatus[channel][characterName].maxStrain;
            }
            message.channel.sendMessage("\nStrain: " + characterStatus[channel][characterName].currentStrain + "/" + characterStatus[channel][characterName].maxStrain);

          } else if (params.includes("-") || params[params.length - 1][0] == "-") {
            var modifier = (params[params.length - 1]).replace(/\D/g, "");
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
              var modifier = (params[params.length - 1]).replace(/\D/g, "");
              characterStatus[channel][characterName].credits = +characterStatus[channel][characterName].credits + +modifier;
              message.channel.sendMessage(characterName + " gets " + modifier + " credits for a total of " + +characterStatus[channel][characterName].credits + ".");
          //subtraction modifier
          } else if (params.includes("-") || params[params.length - 1][0] == "-") {
              var modifier = (params[params.length - 1]).replace(/\D/g, "");
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
      return characterStatus;
    }
