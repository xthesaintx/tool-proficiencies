# Tool Proficiencies - FoundryVTT Module
Tested with Foundry v12 & D&D 4.1+
This modules adds an Items compendium and additional Tools & Musical Instrument proficiencies selectable in the character sheet.

### Manifest URL
https://raw.githubusercontent.com/xthesaintx/tool-proficiencies/main/module.json

![Screenshot 2025-01-18 at 2 51 18 PM](https://github.com/user-attachments/assets/68cd2a2a-db76-4b11-bfb9-71da5c3a0105)


# Using the module
This module is experimental and does create not world specific settings. So whatever world you load it in, they all share the same Tool Proficiency list, and if they relevant compendiums or tools aren't in that world it might have unexpected behaviour.

## What this module does
* It reads a list of Tool Proficiencies linked to Tools in compendiums and adds them to the DND5E system on load.
* It scans compendiums named "tool-proficiencies" for tools to add to the list (This can be turned on/off)
* It scans the modules compendium for tools to add to the list (This can be turned on/off)
* It writes the list to tools.json in the module folder, this is volatile as updates will reset this, but can be rescanned.
* It offers the option to create a "tool-proficiencies" compendium in the world for adding your own custom tools.

## Config
![Screenshot 2025-01-18 at 2 50 33 PM](https://github.com/user-attachments/assets/a8263474-beff-445b-b18a-48f4f2780666)
**Included Tools - Check Box**
If this is checked the default module tools will be included in the scan

**Include Other tool-proficiencies compendium - Check Box**
If this is checked all compendiums called "tool-proficiencies" will be included in the scan

**Create a world compendium - Check Box**
If this is checked, on clicking Save Changes, a compendium will be created called "tool-proficiencies".
_This Check Box does not appear if there is already a world compendium called "tool-proficiencies"_

**Recan**
If this is checked, on clicking Save Changes, the selected compendiums will be scanned tools.json file written
_A warning will pop up about writing to a module directory_
![Screenshot 2025-01-18 at 2 50 52 PM](https://github.com/user-attachments/assets/6d397277-1a5e-47eb-ab15-372e21eda993)

**You will need to reload the world for the new proficiencies to show up**


## Using accross worlds
If using this accross worlds, and wanting to use your own tools, I highly recommend that you create a shared item compendium called "tool-proficiencies" and enable this in all the worlds you want to use the module. This will ensure that the data in the list can match accross worlds it is used in.


# Included Tool Proficiencies
## Gaming Sets
* darts
* quoits

## Musical Instruments
* birdpipes
* glaur
* handdrum
* longhorn
* songhorn
* tantan
* thelarr
* tocken
* wargong
* whistle-stick
* yarting
* zulkoon
