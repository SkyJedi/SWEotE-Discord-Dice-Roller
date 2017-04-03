# SWEotE-Discord-Dice-Roller
CREDIT: Vampwood for conceiving the bot, and SkyJedi for substantial contributions to the project.

A Discord Bot Companion for the SW:EotE RPG

#Usage
Commands:
- !roll   rolls any combination of SWRPG dice and returns the cancelled results

  - You may add " " at the end of the line to give the roll a name like Initiative
  - Dice results and cancellations are computed by the bot so you don't have to!  
  - Only the remaining symbols will be displayed.

  DICE IDENTIFIERS
  - y/pro = Yellow/Proficiency
  - g/a = Green/Ability
  - b/boo = Blue/Boost
  - blk/k/sb/s = Black/Setback
  - r/c = Red/ Challenge
  - p/diff = Purple/ Difficulty
  - w/f = White/Force

    - note: if you use the !roll yyyggbbd method you must use the single character dice identifiers

  EXAMPLES
      - !roll yyyggbbd "Blast Him!"
      - !roll 3pro 2a 2boo 2dif 2sb "Delusions of Grandeur"
      - !roll "Get to the ship" 2y 1g 1r 1p

- !d100   rolls a d100 with optional modifier and displays result.

  EXAMPLES
  - !d100 +X
  - !d100 + X
  - !d100 -X
  - !d100 - X

- !destiny  sets and manages the Destiny Balance for the group

  COMMANDS
  - !destiny            view the destiny pool
  - !destiny rolls      roll one Force Die and adds it to current destiny pool
  - !destiny l/light    uses light side point
  - !destiny d/dark     uses dark side point
  - !destiny set #l #d  sets destiny pool
  - !destiny set lldd   sets destiny pool
  - !destiny reset      resets the destiny pool

- !crit     rolls a d100 with optional modifier and displays result of the critical hit.

  EXAMPLES
  - !crit +X
  - !crit + X
  - !crit -X
  - !crit - X

- !shipcrit   rolls a d100 with optional modifier and displays result of the ship critical hit.

  EXAMPLES
  - !shipcrit +X
  - !shipcrit + X
  - !shipcrit -X
  - !shipcrit - X

- !char         Simple character stat manager
  COMMANDS
  - !char setup characterName [maxWound] [maxStrain] [credits]  Setup a new character
  - !char wound/w characterName +X/-X                           increases/decreases wounds for characterName by X
  - !char strain/s characterName +X/-X                          increases/decreases Strain for characterName by X
  - !char credits/c characterName +X/-X                         dncreases/decreases credit balance for characterName by X
  - !char status characterName                                  current status for characterName   

-!help          Type '!help [topic] for futher information'

  !roll        rolls any combination of SWRPG dice and returns the canceled results.
  !d100        rolls a d100 with optional modifier and displays result
  !destiny     sets and manages the destiny balance for the group
  !crit        rolls a d100 with optional modifier and displays result of the critical hit
  !shipcrit    rolls a d100 with optional modifier and displays result of the ship critical hit
  !char        simple character stat manager.
  !help        displays help for topics.
  !ver         displays bot version

#Installation and Setup

1. First you will need to have NodeJS installed on your machine. You can find the latest version [here](https://nodejs.org/en/)
2. Next create a discord account for your bot. You can do this [here](https://discordapp.com/developers/applications/me)
  1. Click "New App"
  2. Provide a Name (this is the name people will see when the bot joins a channel) and Description
  3. Click "Create App"
  4. On the new screen click "Create a Bot User"
  5. Open Notepad
  6. Under the heading "App Bot User" you will see "Token:click to reveal" Click to reveal it and copy the resulting text and paste it in notepad. Be sure to keep this token private.
  7. Under the heading "App Details" Copy the number after "Client ID:" and paste this in notepad as well.
  8. Replace "CLIENT_ID_GOES_HERE" in the following link with the Client ID you copied in the above step https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID_GOES_HERE&scope=bot&permissions=0
  9. Paste the edited link into a web browser, select the discord server you wish to add the bot to, and click "Authorize".
3. Click "Clone or Download" at the top of this page. Click "Download Zip" and extract the files.
4. Open Config.json with a text editor program of your choice.
5. Replace "BOT TOKEN" with your bot token you copied in step 2.6 and save the file
6. Your bot is now configured and ready to launch.

#Running the bot

Before you first launch the bot you need to run the file "Run this before first launch". You can't miss it. This will install all the dependencies that bot needs to run.

To run the bot, Just execute the file "EotE Dice Roller.lnk". You can copy/move this file to any location you want. However, do not move "start.bat" out of the installation folder.

#Configuration File config.json

  config.json has four properties

  1. token
    - this is the login token for your bot
  2. prefix
    - this is the symbol the bot uses to recognize commands. This is set to "!" by default
  3. descriptorPrenpend
    - Any text you place between the double quotes following this property will be prepended to the text provided in the comment parameter.
    Example: if "descriptorPrepend" is set to "Targeting: ", then the command !roll 2g 2blk "Soldier 1" is called, the bot will respond with:     Targeting: Soldier 1
    Astrydax roll results:    Success: 1   Threat: 1
  4. maxRollsPerDie
    - This is the max number per dice type that can be rolled in a given roll command. Set to 20 by default. Commands that don't respect the roll limit will be aborted and send an error message to the discord chat.
  5.  emoji
    - set to 'true' to enable custom emoji

#CUSTOM emoji

  1. Follow instructions here https://support.discordapp.com/hc/en-us/articles/207619737-Adding-Emoji-Magic to add emoji from /dice to your discord server

  2. Set "emoji": true in config.json

  3. Start your bot
    1.  if any emoji don't work type "\:emoji:" into your channel for every emoji that doesn't work. (ie \:adv:  \:tri:)
        The server will output <:adv:294221000277491714> <:tri:294221000713830401>
    2.  Make sure those output values match the values in printValues.json

#Amazon EC2 install

  1.  Connect to your ubuntu Linux instance using SSH.

  2.  Install node  
      curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
      sudo apt-get install -y nodejs

  3.  Download and unzip lastest build
      wget https://github.com/Astrydax/SWEotE-Discord-Dice-Roller/archive/master.zip
      unzip master.zip
      cd SWEotE-Discord-Dice-Roller-master

  4.  Install npm for the bot
      npm install

  5.  Configure the bot
      sudo nano config.json

  6.  launch bot (this will launch the bot and let you close the terminal window)
      nohup nodejs bot.js &>/dev/null & disown
