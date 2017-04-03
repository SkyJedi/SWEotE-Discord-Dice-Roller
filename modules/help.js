exports.help = function help(params, message) {
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
