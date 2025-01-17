//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//---------------------------------------------------------------------------------------------
//*********************************************************************************************
//final actions
async function start ()
{
	try
	{
		await createGlideTable(
			["rank", "Player", "Cavern", "Temple", "Canyon", "Kraken", "Yeti", "Dragon", "Shrunk", "Mobs", "Body", "Excalibur", "Icarus", "Celts", "average", "ttTime", "Platform", "Division"],
			"",
			[]
		);
		await checkAllCheckboxesHeader();
		await hideAdvencedFilters();
		setTimeout(() =>
		{
			addClickTableRedirectParam("data-table", "Player", "/pages/glide/playerGlideProfil.html");
		}, 0);
		console.log("Tableau créé avec succès !");
	} catch (error)
	{
		console.error("Une erreur est survenue dans start :", error);
	}
}


start();

const onlyMapKeys = ["Cavern", "Temple", "Canyon", "Kraken", "Yeti", "Dragon", "Shrunk", "Mobs", "Body", "Excalibur", "Icarus", "Celts"];
const outputTable = document.getElementById("outputTable");
// Sélectionne uniquement les cases avec l'id "headerCheckbox"
const searchBar = document.getElementById("input-ldb-player-id");
// Sélectionne uniquement les cases avec l'id "headerCheckbox"
const headerCheckboxes = document.querySelectorAll("input[type='checkbox']#headerCheckbox");
// Ajout d'un écouteur d'événements sur chaque checkbox correspondante
headerCheckboxes.forEach(checkbox =>
{
	checkbox.addEventListener("change", async () =>
	{
		const updatedTable = getCheckedValues();
		let matchingKeys = updatedTable.filter(key => onlyMapKeys.includes(key));
		matchingKeys = onlyMapKeys.filter(key => !matchingKeys.includes(key));
		await createGlideTable(updatedTable, searchBar.value, matchingKeys);
		await toggleTableHeadersByValues('data-table', updatedTable);
	});
});

searchBar.addEventListener("input", async () =>
{
	const updatedTable = getCheckedValues();
	let matchingKeys = updatedTable.filter(key => onlyMapKeys.includes(key));
	matchingKeys = onlyMapKeys.filter(key => !matchingKeys.includes(key));
	await createGlideTable(updatedTable, searchBar.value, matchingKeys);
	await toggleTableHeadersByValues('data-table', updatedTable);
});
