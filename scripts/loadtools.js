
const tooldata = await foundry.utils.fetchJsonWithTimeout('modules/tool-proficiencies/tools.json');

Hooks.once("init", () => {
console.log(tooldata);
	 foundry.utils.mergeObject(CONFIG.DND5E.tools,tooldata);

  console.log ("CONFIG DONE");
  game.settings.register('tool-proficiencies', 'includedtools', {
    name: 'Included Tools',
    hint: 'When enabled it will add the included tools from the Tool Proficiencies compendium on the character sheet options.',
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
    requiresReload: false,
  });

   game.settings.register('tool-proficiencies', 'othertools', {
    name: 'Include other tool-proficiencies compendium',
    hint: 'This will include all compendiums named \"tool-proficiencies\" and scan them.',
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
    requiresReload: false,
  });

  
  game.settings.register('tool-proficiencies', 'compendium', {
    name: 'Create a world compendium',
    hint: "This will create a world compendium called tool-proficiencies",
    scope: 'world',
    onChange: value => {
    if (value){compcre()}
    },
    config: true,
    type: new foundry.data.fields.BooleanField(),
  });
  game.settings.get('tool-proficiencies', 'compendium'); // false


  
  game.settings.register('tool-proficiencies', 'rescan', {
    name: 'Rescan',
    hint: "Check to rescan the compendiums and rebuild the JSON file",
    scope: 'world',
    onChange: value => {
    if (value){rescan(game.settings.get('tool-proficiencies', 'includedtools'),game.settings.get('tool-proficiencies', 'othertools'))}
    },
    config: true,
    type: new foundry.data.fields.BooleanField(),
  });
  game.settings.get('tool-proficiencies', 'rescan'); // false

});

//SETS RESCAN TO FALSE AND SETS THE CHECK BOX UNCHECKED

Hooks.once("ready", () => {
  game.settings.set('tool-proficiencies', 'rescan', false);
});

Hooks.on("renderSettingsConfig", (app, html, context) => {
  game.settings.set('tool-proficiencies', 'rescan', false);
  game.settings.set('tool-proficiencies', 'compendium', false);
  // Find your module's settings section
  const moduleSettings = html.find('section[data-tab="tool-proficiencies"]');
  moduleSettings.find('input[name="tool-proficiencies.rescan"]').replaceWith('<input type=\"checkbox\" name=\"tool-proficiencies.rescan\">');
  if (game.packs.get("world.tool-proficiencies") != undefined)
  {
    moduleSettings.find('input[name="tool-proficiencies.compendium"]').replaceWith('');
  }
  // console.log ("HOOKED");
}); 

//FUNCTION TO CREATE WORLD COMPENDIUM
async function compcre (){
if (game.packs.get("world.tool-proficiencies") == undefined)
{
const pack = await CompendiumCollection.createCompendium({
  label: "tool-proficiencies",
  type: "Item",
});
}
}


// FUNCTIONS TO SCAN AND OUT JSON
async function rescan(opt1,opt2){
let itempacks = {};
let toolsjson_string ="";
let itemsinpack = {};
let toolsinpack = {};
// console.log (opt1);
// console.log (opt2);
if (opt1 == false && opt2 == false)
  {
    itempacks = {};
    // console.log(itempacks);
  }
else if (opt1 == false && opt2 == true)
  {
    itempacks=game.packs.filter(i=>i.metadata.packageName != ("tool-proficiencies") && i.metadata.name == ("tool-proficiencies"));
    // console.log(itempacks);
  }
else if (opt1 == true && opt2 == false)
  {
    itempacks=game.packs.filter(i=>i.metadata.packageName == ("tool-proficiencies") && i.metadata.name == ("tool-proficiencies"));
    // console.log(itempacks);
  }
else
{
 itempacks=game.packs.filter(i=>i.metadata.name == ("tool-proficiencies"));
 // console.log(itempacks);
}
// 
// BUILD THE JSON
// 
toolsjson_string = "{";
if (itempacks.length>0)
{
  
  for (let j = 0; j < itempacks.length; j++) {
    itemsinpack=await itempacks[j].getDocuments();
      toolsinpack=itemsinpack.filter(i=>i.type == ("tool"));
        for (let i = 0; i < toolsinpack.length; i++) {
          //EACH TOOL

          toolsjson_string = toolsjson_string + "\""+toolsinpack[i].name.toLowerCase().replace(/ /g, '')+"\":";
          toolsjson_string = toolsjson_string + "{\"ability\": \""+toolsinpack[i].system.ability+"\", \"id\": \"Compendium."+itempacks[j].collection+".Item."+toolsinpack[i].id+"\"},";

        }
   }
  toolsjson_string = toolsjson_string.slice(0, -1)+"}";
  console.log (toolsjson_string);
// 
// END OF STRING BUILD
// 
// CONVERT TO JSON
  const obj = JSON.parse(toolsjson_string);
  console.log(obj)
  }
// IF NO TOOLS
  else
  {
  const obj = JSON.parse("{}");
  console.log(obj)
  }

const file = new File([toolsjson_string], "tools.json",{ type: 'application/json' });
FilePicker.upload("data", "modules/tool-proficiencies/",file,{});

}