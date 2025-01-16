const data = await foundry.utils.fetchJsonWithTimeout('modules/tool-proficiencies/tools.json');

Hooks.once("init", () => {
	// console.log(data);
	foundry.utils.mergeObject(CONFIG.DND5E.tools,data);
//  CONFIG.DND5E.tools.darts = {"ability": "dex", "id": "isZeSnsTvCCMzNa3"};

});
