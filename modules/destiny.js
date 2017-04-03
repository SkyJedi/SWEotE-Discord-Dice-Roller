var chalk = require("chalk");

exports.destiny = function destiny(params, destinyBalance, message, print) {
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
      if ((params[1].match(/\d+/g)) != null) {
        for (var i = 0; i < params.length; i++) {
          var color = params[i].replace(/\d/g, "");
          switch(color) {
            case "l":
              destinyBalance[channel].light = (params[i]).replace(/\D/g, "");
              break;
            case "d":
              destinyBalance[channel].dark = (params[i]).replace(/\D/g, "");
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
return destinyBalance;
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

    roll = Math.floor(Math.random() * 12) + 1;


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

}
