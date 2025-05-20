# Adventure Boy: Heroes & Monsters
Adventure Boy: Heroes & Monsters is a .NET full-stack web application I helped create during my time at Revature. We were tasked with creating a full-stack application that uses at least one external API; here we used the [Scryfall API](https://scryfall.com/docs/api).

## Overview
My group members were big fans of Dungeons and Dragons and Magic the Gathering (MtG), so we decided to create our take on a simple dungeon crawler.

You start by making an account or logging into an existing one. From there, you are taken to the game screen, where you face an enemy equipped with a weapon and a spell. You can take one of three actions, and hopefully, you choose the correct course that allows you to defeat every monster in the gauntlet. After finishing, you can log out and log back into wherever you were, as your progress is saved in the database.

Adventure Boy is also hosted on Azure and can be found [here](https://ashy-forest-0cdf9410f.6.azurestaticapps.net).

The corresponding respository for the back-end can be found [here](https://github.com/emmanuelalesna/adventure-boy-back).

## Technologies
The front-end uses primarily HTML/CSS and JavaScript to structure the web pages and program their functionality.

The back-end uses SQL Server to store data, .NET and ASP.NET to program API access, Entity Framework using code-first migrations to export models into the database, and xUnit to test.

Since finishing and presenting this project, I've taken it upon myself to continue developing it, incorporating the knowledge I've gained since. To start, I made varied changes across the entire application, but the biggest changes were implementing Vite to build and host this application on Azure, and converting all JavaScript files to TypeScript. In the future, I hope to migrate the entire front-end to a framework like React and more fully flesh out the feature set.

## Features
Users start by either creating a new account or logging into a previous account. New accounts will start at level 1, while logging into an existing account will resume the player's progress.

The user then proceeds to the fight screen, where upon starting the fight, they are presented with a series of images depicting the enemy, current stage, and their item and spell. All of these images are pulled from the Scryfall API, an API that hosts information about Magic The Gathering cards.

The user starts the fight by choosing one of three options. "Swing your sword" will use the player's equipped weapon to attampt to deal damange to the enemy. "Cast a spell" is an attack that does more damage than the weapon, but costs mana. If the user does not have enough mana, the spell will fail and the monster will take its turn. "Raise your shield" is the player's only defensive option, and prevents all incoming damage the turn it's used. Immediately after taking their turn, the monster will respond.

Similarly, the monster has three possible actions, chosen randomly. It can simply attack to hurt the player, or it can defend. It can also charge up its strength to empower its next attack, which deals double damage if it lands.

The player takes their turn until either they or the enemy falls. If the player falls, they must start from the beginning. If the monster is defeated, the player automatically receives an upgrade to their equipment and their health and mana is partially restored.

There are five levels, with the fifth level featuring a dangerous dragon as the final boss. If the player manages to defeat the dragon, they win and can start a new adventure.

At any time, the player can also log out. Their progress will be saved for their next login.
## ERD Framework:
![image](https://github.com/user-attachments/assets/fc420819-50b6-4021-a4a7-7cd55908ea79)
