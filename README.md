# Adventure Boy: Heroes & Monsters

## Overview

Adventure Boy: Heroes & Monsters is a .NET fullstack web application that leverages the Scryfall API. After making an account, players fight different enemies while gaining new and more powerful equipment and spells as they progress through the game. Information about player accounts and their progress is stored on an Azure hosted SQL Server database.

## Adventure Boy: Heros & Monsters has fun and exciting features such as:
- Create an account!
- Log into your account!
- Experience the thrill of entering the incorrect password or incorrect username!
## Once logged in, players of Adventure Boy: Heroes & Monsters can:
- Adventure through five exciting levels based on beautiful Magic the Gathering card art
- Fight five monsters, also based on beautiful Magic the Gathering card art
- Swing your sword, cast a spell, or block
- Pick up new items as you defeat more and more enemies
- Experience the satisfaction of victory by reading a line of text on the screen
- Experience the disappointment of defeat by reading a much longer paragraph describing your demise
- Log out
## Technologies
The backend of Adventure Boy uses SQL Server to store data, .NET and ASP.NET to program API access, Entity Framework using code-first migrations to export models into the database, and xUnit to test.

The frontend uses primarily HTML/CSS and JavaScript to structure the web pages and program their functionality.

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

## Scryfall External API:
https://scryfall.com/docs/api
