const { upperFirst } = require('lodash');
const { MessageEmbed } = require('discord.js');
const main = require('../../index');

const help = (client, message, topic, prefix) => {
    const embed = new MessageEmbed().setColor('031763');
    switch(topic) {
        case 'destiny':
        case 'd':
            embed.setTitle('**Destiny Pool Help**')
                 .addField(`${prefix}destiny`, 'View the destiny pool.')
                 .addField(`${prefix}destiny roll`, `Rolls a force die and adds result to the destiny pool.`)
                 .addField(`${prefix}destiny l/light`, `Use light side point.`)
                 .addField(`${prefix}destiny d/dark`, `Use dark side point.`)
                 .addField(`${prefix}destiny set #l #d`, `Sets destiny pool.`)
                 .addField(`${prefix}destiny set lldd`, `Sets destiny pool`)
                 .addField(`${prefix}destiny reset`, `Resets the destiny pool`);
            break;
        case 'story':
        case 's':
            embed.setTitle('**Story Pool Help**')
                 .addField(`${prefix}story`, 'View the story pool.')
                 .addField(`${prefix}story roll`, 'Rolls a white die and adds result to the story points.')
                 .addField(`${prefix}story p/player`, 'Uses player point.')
                 .addField(`${prefix}story g/gm`, 'Uses GM point.')
                 .addField(`${prefix}story set #p #g`, 'Sets story points.')
                 .addField(`${prefix}story set ppgg`, 'Sets story points.')
                 .addField(`${prefix}story reset`, 'Resets the story pool.');
            break;
        case 'character':
        case 'char':
        case 'c':
            embed.setTitle('**Character Help**')
                 .addField(`${prefix}char`, 'Simple character stat manager.')
                 .addField(`${prefix}char setup characterName maxWound maxStrain credits`, 'Setup a new character.')
                 .addField(`${prefix}char wound/w characterName +X/-X`, 'Increases/decreases wounds for characterName by x.')
                 .addField(`${prefix}char strain/s characterName +X/-X`, 'Increases/decreases strain for characterName by x.')
                 .addField(`${prefix}char credits/c characterName +X/-X`, 'Increases/decreases credit balance for characterName by x.')
                 .addField(`${prefix}char crit characterName +X/-X`, 'Adds/removes critical injuries for characterName.')
                 .addField(`${prefix}char obligation/o characterName +X/-X obligationName`, 'Adds/removes obligations for characterName.')
                 .addField(`${prefix}char duty/d characterName +X/-X dutyName`, 'Adds/removes duty for characterName.')
                 .addField(`${prefix}char inventory/i characterName +X/-X itemName`, 'Adds/removes inventory items for characterName.')
                 .addField(`${prefix}char modify characterName +X/-X maxStrain/maxWounds`, 'Increases/decreases selected stat for characterName by x.')
                 .addField(`${prefix}char status characterName`, 'Current status for characterName.')
                 .addField(`${prefix}char remove characterName`, 'Removes characterName.')
                 .addField(`${prefix}char list`, 'Displays all characters.')
                 .addField(`${prefix}char reset`, 'Resets all the characters.');
            break;
        case 'roll':
        case 'r':
            embed.setTitle('**Roll Help**')
                 .setDescription(`*${prefix}roll diceIdentifiers "text"*`)
                 .addField(
                     `diceIdentifiers`,
                     `**y/pro** = yellow/proficiency
					**g/a** = green/ability
					**b/boo** = blue/boost
					**blk/k/sb/s** = black/setback
					**r/c** = red/challenge
					**p/diff/d** = purple/difficulty
					**w/f** = white/force
					**success/suc/\***  = success
					**advantage/adv/v** = advantage
					**triumph/tri/!** = triumph
					**failure/fail/-** = failure
					**threat/thr/t** = threat
					**despair/des/$** = despair
					**light/l** = lightpip
					**dark/n** = darkpip`)
                 .addField('text', `assigns a label to the roll. (optional)`)
                 .addField('Examples',
                     `\`\`\`${prefix}roll yyyggbbd\`\`\` (must use single character identifiers)
    				\`\`\`${prefix}roll 1g 1p 1adv\`\`\` (must specify a number before each identifier)`);
            break;
        case 'initiative':
        case 'init':
        case 'i':
            embed.setTitle('**Initiative Help**')
                 .addField(`${prefix}init`, 'Shows current initiative order.')
                 .addField(`${prefix}init roll diceIdentifiers npc/pc`, 'Rolls your initiative dice and adds character to the order')
                 .addField(`${prefix}init next`, 'Moves to next initiative slot.')
                 .addField(`${prefix}init previous`, 'Moves to previous initiative slot.')
                 .addField(`${prefix}init set`, 'Manually set initiative order before any turns occur.')
                 .addField(`${prefix}init modify`, 'Manually alter initiative order mid-round.')
                 .addField(`${prefix}init reset`, 'Resets the initiative order.')
                 .addField(`${prefix}init remove #`, 'Removes slot# from initiative.');
            break;
        case 'reroll':
        case 'rr':
            embed.setTitle('**ReRoll Help**')
                 .addField(`${prefix}reroll Same`, 'Rolls the same pool again.')
                 .addField(`${prefix}reroll add diceIdentifiers`, 'Roll additional dice and adds them to the pool.')
                 .addField(`${prefix}reroll remove diceIdentifiers`, 'Remove random dice of the designated color.')
                 .addField(`${prefix}reroll select diceColor/dicePosition`, 'rerolls specified dice.')
                 .addField(`ie ${prefix}reroll select y3 p1`, 'rerolls only the 3rd yellow die and the 1st purple die in the current dice pool.')
                 .addField(`${prefix}reroll fortune show diceColor/dicePosition`,
                     `shows adjacent sides for the specified die.
					\`\`\`${prefix}reroll fortune show y1 p2\`\`\`  (shows the adjacent side for the 1st yellow and 2 purple diceFaces).`)
                 .addField(`${prefix}reroll fortune swap diceColor / dicePosition adjacentFace`, 'swaps the current face for an adjacent one.')
                 .addField(`${prefix}reroll fortune swap y3 2`, 'swaps the current die face on the 2nd yellow with option 3 of the adjacent sides.');
            break;
        case 'polyhedral':
        case 'poly':
        case 'p':
            embed.setTitle('**Polyhedral Roll Help**')
                 .addField(`${prefix}poly`, 'Rolls any combination of polyhedral dice with modifier.')
                 .addField(`Examples`, `\`\`\`${prefix}poly 1d4 2d6+1 1d100-60\`\`\``);
            break;
        case 'prefix':
            embed.setTitle('**Polyhedral Roll Help**')
                 .addField(`${prefix}Prefix`, `Changes the activation prefix for the bot.`)
                 .addField(`Examples`, `\`\`\`${prefix}prefix ^, prefix & \`\`\``)
                 .addField(`NOTE`, `User needs to have a higher role than the bot. See more [here](https://support.discordapp.com/hc/en-us/articles/214836687-Role-Management-101)`);
            break;
        case 'crit':
        case 'shipcrit':
            embed.setTitle('**Critical Help**')
                 .addField(`${prefix}crit and ${prefix}shipcrit`, 'Rolls a d100 and matches the roll to the appropriate critical injury table then prints the result.')
                 .addField(`${prefix}crit +10`, 'Automatically add 10 to the roll (any number can be used).')
                 .addField(`${prefix}crit -10`, 'Automatically subtract 10 to the roll (any number can be used).')
                 .addField(`${prefix}crit 54?`, 'Look up critical by number (any number can be used).');
            break;
        case 'duty':
        case 'obligation':
            embed.setTitle(`**${upperFirst(topic)} Help**`)
                 .addField(`${prefix}${upperFirst(topic)}`, `Gathers all ${topic} from ${prefix}Char and rolls a d100 to trigger ${topic}.`);
            break;
        default:
            embed.setTitle('**Help Contents**')
                 .setDescription(`'${prefix}Help [topic]' for further information.`)
                 .addField(`${prefix}swrpg`, 'uses swrpg dice for this channel.')
                 .addField(`${prefix}genesys`, 'uses genesys dice for this channel.')
                 .addField(`${prefix}l5r`, 'uses l5r dice in this channel.')
                 .addField(`${prefix}poly`, 'rolls any combination of polyhedral dice.')
                 .addField(`${prefix}ver`, 'displays bot version.')
                 .addField(`${prefix}prefix`, 'changes the prefix to activate the bot (role needs to be higher than the bot).')
                 .addField(`${prefix}help`, 'displays help for topics.')
                 .addField(`${prefix}roll`, 'rolls any combination of SWRPG/GENESYS dice.')
                 .addField(`${prefix}reroll`, 'modifies the previous roll.')
                 .addField(`${prefix}destiny`, 'manages the destiny balance.')
                 .addField(`${prefix}crit`, 'rolls and displays the critical hit.')
                 .addField(`${prefix}shipcrit`, 'rolls and displays the ship critical hit.')
                 .addField(`${prefix}char`, 'simple character stat manager.')
                 .addField(`${prefix}init`, 'initiative tracker and roller.')
                 .addField(`${prefix}obligation`, `gathers all the obligations entered with ${prefix}char and rolls to trigger.`)
                 .addField(`${prefix}duty`, `gathers all the duty entered with ${prefix}char and rolls to trigger.`)
                 .addField(`${prefix}species/${prefix}gleepglop`, 'picks a random species.')
                 .addField('Bot Information', 'For more information or help join the [SkyJedi\'s Bot Emporium](https://discord.gg/G8au6FH)')
                 .addField('Role playing games by Fantasy Flight Games', `[Edge of the Empire](https://www.fantasyflightgames.com/en/products/star-wars-edge-of-the-empire), [Force and Destiny](https://www.fantasyflightgames.com/en/products/star-wars-force-and-destiny), [Age of Rebellion](https://www.fantasyflightgames.com/en/products/star-wars-age-ofrebellion),[Genesys](https://www.fantasyflightgames.com/en/products/genesys), [Legends of the Five Rings](https://www.fantasyflightgames.com/en/legend-of-the-five-rings-roleplaying-game)`);
            break;
    }
    main.sendMessage(message, { embed });

};

exports.help = help;
