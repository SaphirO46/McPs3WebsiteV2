		//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		//---------------------------------------------------------------------------------------------
		//*********************************************************************************************
		//final actions

		createGlideTable(["rank", "Player", "Cavern", "Temple", "Canyon", "Kraken", "Yeti", "Dragon", "Shrunk", "Mobs", "Body", "Excalibur", "Icarus", "Celts", "average", "ttTime", "Platform", "Division"], "", []);
		checkAllCheckboxesHeader();
		hideAdvencedFilters();

		const onlyMapKeys = ["Cavern", "Temple", "Canyon", "Kraken", "Yeti", "Dragon", "Shrunk", "Mobs", "Body", "Excalibur", "Icarus", "Celts"];
		const outputTable = document.getElementById("outputTable");
		// Sélectionne uniquement les cases avec l'id "headerCheckbox"
		const searchBar = document.getElementById("input-ldb-player-id");
		// Sélectionne uniquement les cases avec l'id "headerCheckbox"
		const headerCheckboxes = document.querySelectorAll("input[type='checkbox']#headerCheckbox");
		// Ajout d'un écouteur d'événements sur chaque checkbox correspondante
		headerCheckboxes.forEach(checkbox =>
		{
			checkbox.addEventListener("change", () =>
			{
				const updatedTable = getCheckedValues();
				let matchingKeys = updatedTable.filter(key => onlyMapKeys.includes(key));
				matchingKeys = onlyMapKeys.filter(key => !matchingKeys.includes(key));
				createGlideTable(updatedTable, searchBar.value, matchingKeys);
				toggleTableHeadersByValues('data-table', updatedTable);
			});
		});

		searchBar.addEventListener("input", () =>
		{
			const updatedTable = getCheckedValues();
			let matchingKeys = updatedTable.filter(key => onlyMapKeys.includes(key));
			matchingKeys = onlyMapKeys.filter(key => !matchingKeys.includes(key));
			createGlideTable(updatedTable, searchBar.value, matchingKeys);
			toggleTableHeadersByValues('data-table', updatedTable);
		});
