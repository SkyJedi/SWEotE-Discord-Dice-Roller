# FFGNDS-Discord-Dice-Roller
CREDIT: Vampwood for conceiving the client, and SkyJedi for substantial contributions to the project.

A Discord Bot Companion for the Star Wars : Edge of the Empire (SW:EotE), Age of Rebellion (AoR) and Force and Destiny (FnD) RPGs as well as Genesys, and Legend of the Five Rings (L5R) RPGs

## Usage

- `!swrpg`, `!genesys`, `!l5r`  switches dice and functionality between games.

## Star Wars (SW)/Genesys commands

- `!roll` rolls any combination of SWRPG/Genesys dice and returns the cancelled results
  - You may add " " at the end of the line to give the roll a name like `Initiative`
  - Dice results and cancellations are computed by the bot so you don't have to!  
  - Only the remaining symbols will be displayed.

### Dice Identifiers

- `y`/`pro` = Yellow/Proficiency
- `g`/`a` = Green/Ability
- `b`/`boo` = Blue/Boost
- `blk`/`k`/`sb`/`s` = Black/Setback
- `r`/`c` = Red/ Challenge
- `p`/`diff` = Purple/ Difficulty
- `w`/`f` = White/Force

Note: if you use the `!roll yyyggbbd` method you must use the single character dice identifiers

### Examples

- `!roll yyyggbbd "Blast Him!"`
- `!roll 3pro 2a 2boo 2dif 2sb "Delusions of Grandeur"`
- `!roll "Get to the ship" 2y 1g 1r 1p`
- `!Poly` rolls any combination of polyhedral dice with modifier
  - `!poly 1d4 2d6+1 1d100-60`
- `!destiny`  sets and manages the Destiny Balance for the group
  - `!destiny` : view the destiny pool
  - `!destiny roll` : rolls one Force Die and adds it to current destiny pool
  - `!destiny l/light` : uses light side point
  - `!destiny d/dark` : uses dark side point
  - `!destiny set #l #d` : sets destiny pool
  - `!destiny set lldd` : sets destiny pool
  - `!destiny reset` : resets the destiny pool
- `!crit` rolls a d100 with optional modifier and displays result of the critical hit.
  - `!crit +X`
  - `!crit + X`
  - `!crit -X`
  - `!crit - X`
- `!shipcrit` rolls a d100 with optional modifier and displays result of the ship critical hit.
  - `!shipcrit +X`
  - `!shipcrit + X`
  - `!shipcrit -X`
  - `!shipcrit - X`
- `!char` Simple character stat manager
  - `!char setup characterName maxWound maxStrain credits` : Setup a new character
  - `!char wound/w characterName +X/-X` : increases/decreases wounds for characterName by X
  - `!char strain/s characterName +X/-X` : increases/decreases Strain for characterName by X
  - `!char credits/c characterName +X/-X` : increases/decreases credit balance for characterName by X
  - `!char Modify CharacterName +X/-X MaxStrain/MaxWounds` : increases/decreases selected stat for characterName by x
  - `!char Crit CharacterName +X/-X` : adds/removes critical injuries for characterName
  - `!char obligation/o CharacterName +X/-X obligationName` : adds/removes obligations for characterName
  - `!char duty/d CharacterName +X/-X dutyName` : adds/removes duty for characterName
  - `!char inventory/i CharacterName +X/-X itemName` : adds/removes inventory items for characterName
  - `!char status characterName` : current status for characterName   
  - `!char remove characterName` : removes characterName
  - `!char list` : lists all characters
  - `!char reset` : resets all characters
- `!init` initiative tracker and roller
  - `!init` : shows current initiative order
  - `!init roll dice npc/pc` : rolls your initiative dice and adds character to the order. ie `!init roll yygg pc`
  - `!init next` : moves to next initiative slot
  - `!init previous` : moves to previous initiative slot
  - `!init set` : manually set initiative order before any turns occur
  - `!init modify` : manually alter initiative order mid-round
  - `!init reset` : resets the initiative order
  - `!init remove x` : remove a slot where is is the position
- `!species/!gleepglop` : picks a random species
- `!obligation` : gathers all the obligations entered with !char and rolls to trigger
- `!reroll`: modifies the previous roll
  - `!reroll same` : rolls the same pool again
  - `!reroll add DiceIdentifiers` : roll additional dice and adds them to the pool
    ie `!reroll add y`
  - `!reroll remove DiceIdentifiers` : remove random dice of the designated color
    ie `!reroll remove g`
  - `!reroll select DiceColor/DicePosition` : rerolls specified dice
    ie `!reroll select Y3 P1` : rerolls only the 3rd yellow die and the 1st purple die in the current dice pool
  - `!reroll fortune show DiceColor/DicePosition` : shows adjacent sides for the specified die
      ie `!reroll fortune show Y1 P2`  (shows the adjacent side for the 1st yellow and 2 purple dicefaces)
  -  `!reroll fortune swap DiceColor/DicePosition AdjacentFace` (From `!reroll fortune show` Command): swaps the current face for an adjacent one
      ie `!reroll fortune swap 2Y 3`: swaps the current die face on the 2nd yellow with option 3 of the adjacent sides
- `!help`          Type '`!help topic` for further information'
  - `!roll`        rolls any combination of SWRPG dice and returns the canceled results
  - `!destiny`     sets and manages the destiny balance for the group
  - `!crit`        rolls a d100 with optional modifier and displays result of the critical hit
  - `!shipcrit`    rolls a d100 with optional modifier and displays result of the ship critical hit
  - `!char`        simple character stat manager
  - `!help`        displays help for topics
  - `!init`        initiative tracker and roller
  - `!ver`         displays bot version

## L5R commands

- `!roll` : rolls any combination of L5R dice
- `!poly` : rolls any combination of polyhedral dice
- `!keep` : ie `!keep 12` - keeps the first, second, and discards the rest of the dice
- `!add` : ie `!add ww` - adds specified dice to previous dicepool.
- `!reroll` : ie `!reroll 12` - rerolls the first and second dice without modifying the rest of the dicepool
- `!help` : displays help for topics  

## General Commands
  
- `!prefix` : changes the activation prefix for the bot.
  - Examples:
    - `prefix ^`, `prefix &`
    - NOTE: User needs to have a higher role than the bot. See more: https://support.discordapp.com/hc/en-us/articles/214836687-Role-Management-101
- `!invite` : get an invite link for @D1-C3
- `!stats` : Displays # of servers/users bot is currently has.

## Patrons
- Caleb Smith
- Chad Owen
- Clynac
- Esteban Riviera
- Flobio
- Gil Colgate
- Jason Greathouse
- Joonas Moisio
- JP Sugarbroad
- Matt Langhinrichs
- Matthew R Martinez
- Michael C Hershiser
- Mitch Christenson
- Nathan Montondon
- Ohdias
- Peter Cummuskey
- Peter Por
- Scott McNeil
- Tommy R.
- triplel
- Xavi Santamaria

[Patreon](https://www.patreon.com/SkyJedi)

[Fantasy Flight Games, Genesys](https://www.fantasyflightgames.com/en/products/genesys)
