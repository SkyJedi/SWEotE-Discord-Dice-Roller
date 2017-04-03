/*
  Developed by Astrydax, aka Royalcrown28 for vampwood
  For Custom Discord Bots please email me at Astrydax@gmail.com
*/

const Discord = require("discord.js");
const config = require("./config.json");
var chalk = require("chalk");
const bot = new Discord.Client();
var print = require("./modules/printValues.js");
var destiny = require("./modules/destiny.js");
var crit = require("./modules/crit.js");
var help = require("./modules/help.js");
var char = require("./modules/char.js");
var roll = require("./modules/roll.js");
var d100 = require("./modules/d100.js");

bot.login(config.token);

var version = "1.4.4";

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

//Ver command
if (message.content.toLowerCase().startsWith(config.prefix + "ver")) {
  message.channel.sendMessage(bot.user.username + ": version: " + version);
}
// D100 command
if (message.content.toLowerCase().startsWith(config.prefix + "d100")) {
  d100.d100(params, message);
}

//!crit command
if (message.content.toLowerCase().startsWith(config.prefix + "crit")) {
  crit.crit(params, message, print);
}
//!shipcrit command
if (message.content.toLowerCase().startsWith(config.prefix + "shipcrit")) {
  crit.shipcrit(params, message, print);
}

//Destiny Point Module
if (message.content.toLowerCase().startsWith(config.prefix + "destiny")) {
  destiny.destiny(params, destinyBalance, message, print);
}

//Character Tracker
if (message.content.toLowerCase().startsWith(config.prefix + "char")) {
  char.char(params, characterStatus, message, print);
}

if (message.content.toLowerCase().startsWith(config.prefix + "help")) {
  help.help(params, message);
}
// Roll the dice command
if (message.content.toLowerCase().startsWith(config.prefix + "roll")) {
  roll.roll(params, diceResult, message, print, config, desc);
}
}
});
