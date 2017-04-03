var chalk = require("chalk");

exports.roll = function roll(params, diceResult, message, print, config, desc) {
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
      if ((params[0]).match(/\d+/g) != null) {
        for (var i = 0; i < params.length; i++) {
          //extracts the number of dice to roll
          var diceQty = (params[i]).replace(/\D/g, "");
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

    roll = Math.floor(Math.random() * 6) + 1;
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

    roll = Math.floor(Math.random() * 8) + 1;


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

    roll = Math.floor(Math.random() * 12) + 1;


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

    roll = Math.floor(Math.random() * 6) + 1;

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

    roll = Math.floor(Math.random() * 8) + 1;


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

    roll = Math.floor(Math.random() * 12) + 1;


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
}
}
