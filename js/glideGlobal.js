		//notification hidder
		function hideDivisionNotif ()
		{
			let notif = document.getElementById("notificationDivision");
			notif.style.visibility = "hidden";
		}
		function unhideAdvencedFilters ()
		{
			let plusButton = document.getElementById("plusButtoAdvencedFilter");
			let notif = document.getElementById("advancedFilterGlide");
			plusButton.style.display = "none";
			notif.style.display = "block";
		}
		function hideAdvencedFilters ()
		{
			let notif = document.getElementById("advancedFilterGlide");
			let plusButton = document.getElementById("plusButtoAdvencedFilter");
			notif.style.display = "none";
			plusButton.style.display = "block";
		}
		//convert json 
		function csvToJson (csv)
		{
			const lines = csv.trim().split("\n");
			const headers = lines[0].split(",");

			return lines.slice(1).map(line =>
			{
				const values = line.split(",");
				return headers.reduce((obj, header, index) =>
				{
					obj[header.trim()] = values[index]?.trim();
					return obj;
				}, {});
			});
		}

		//----------------------------------------------------------------header
		//header filters

		function checkAllCheckboxesHeader ()
		{
			const headerCheckboxes = document.querySelectorAll("input[type='checkbox']#headerCheckbox");
			headerCheckboxes.forEach(checkbox =>
			{
				checkbox.checked = true; // Coche chaque case
			});
		}

		//----------------------------------------------------------------
		//modify data to json

		function addAverageTimes (data, keys)
		{
			return data.map(player =>
			{
				// Filtre les clés correspondantes aux temps et les convertit en secondes
				const times = keys.map(key => timeToSeconds(player[key]));
				const average = times.reduce((sum, time) => sum + time, 0) / times.length; // Moyenne des temps
				player.average = secondsToTime(average); // Ajoute la moyenne en format MM:SS.mmm
				return player;
			});
		}

		function addRankByJson (data)
		{
			return data.map((player, index) =>
			{
				player.rank = index + 1;
				return player;
			});
		}
		function addTtTimeByJson (data, mapKeys)
		{

			data.forEach(player =>
			{
				// Additionner les temps des cartes pour chaque joueur en secondes
				let totalTimeInSeconds = 0;
				mapKeys.forEach(map =>
				{
					totalTimeInSeconds += timeToSeconds(player[map]);
				});

				// Convertir le total en format MM:SS.mmm et ajouter au joueur
				player.ttTime = secondsToTime(totalTimeInSeconds);
			});

			return data;
		}

		function removeKeysFromJSON (jsonArray, keysToRemove)
		{
			return jsonArray.map(player =>
			{
				// Crée une copie de l'objet pour éviter de modifier l'original
				const updatedPlayer = { ...player };
				keysToRemove.forEach(key =>
				{
					delete updatedPlayer[key];
				});
				return updatedPlayer;
			});
		}

		//----------------------------------------------------------------
		//table personalisation


		function ColoredCaseByTime (key, valueCell, td, mapSelected, json)
		{
			let finalColor = "unknow-bg-color";
			const glideRankyRanky = json;


			if (key == mapSelected)
			{
				const mapChoosedData = glideRankyRanky.find(mapData => mapData.Map === key);
				// Seuil spécifique pour la colonne
				const timeRankE = timeToSeconds(mapChoosedData.Times.Elite);
				const timeRankL = timeToSeconds(mapChoosedData.Times.Legend);
				const timeRankM = timeToSeconds(mapChoosedData.Times.Master);
				const timeRankX = timeToSeconds(mapChoosedData.Times.Expert);
				const timeRankP = timeToSeconds(mapChoosedData.Times.Pro);
				const timeRankS = timeToSeconds(mapChoosedData.Times.Skilled);
				const timeRankI = timeToSeconds(mapChoosedData.Times.Intermediate);
				const timeRankB = timeToSeconds(mapChoosedData.Times.Beginner);
				const cellTime = timeToSeconds(valueCell); // Convertit le temps de la cellule en secondes


				// Si le temps est supérieur au seuil, colorier la cellule en bleu
				if (cellTime > timeRankB)
				{
					finalColor = "unknow-bg-color";
				}
				else if (cellTime > timeRankI)
				{
					finalColor = "beginner-bg-color";
				}
				else if (cellTime > timeRankS)
				{
					finalColor = "intermediate-bg-color";
				}
				else if (cellTime > timeRankP)
				{
					finalColor = "skilled-bg-color";
				}
				else if (cellTime > timeRankX)
				{
					finalColor = "pro-bg-color";
				}
				else if (cellTime > timeRankM)
				{
					finalColor = "expert-bg-color";
				}
				else if (cellTime > timeRankL)
				{
					finalColor = "master-bg-color";
				}
				else if (cellTime < timeRankE)
				{
					finalColor = "elite-bg-color";
				}
				else if (cellTime >= timeRankE)
				{
					finalColor = "legend-bg-color";
				}
				else
				{
					finalColor = "unknow-bg-color";
				}

				td.classList.add(finalColor);




			}

		}


		//	--+++++--- Division adding to table-+++++++-----
		function AddingDivisionToTable (key, valueCell, td, mapSelected, json, rank)
		{
			let finalColor = "unknow-bg-color";
			let finalDivision = "/img/glide/beginner.webp";
			const glideRankyRanky = json;
			if (key == "division" || key == "Division")
			{
				const mapChoosedData = glideRankyRanky.find(mapData => mapData.Map === "average");
				// Seuil spécifique pour la colonne
				const timeRankE = timeToSeconds(mapChoosedData.Times.Elite);
				const timeRankL = timeToSeconds(mapChoosedData.Times.Legend);
				const timeRankM = timeToSeconds(mapChoosedData.Times.Master);
				const timeRankX = timeToSeconds(mapChoosedData.Times.Expert);
				const timeRankP = timeToSeconds(mapChoosedData.Times.Pro);
				const timeRankS = timeToSeconds(mapChoosedData.Times.Skilled);
				const timeRankI = timeToSeconds(mapChoosedData.Times.Intermediate);
				const timeRankB = timeToSeconds(mapChoosedData.Times.Beginner);
				const cellTime = timeToSeconds(valueCell); // Convertit le temps de la cellule en secondes


				// Si le temps est supérieur au seuil, colorier la cellule en bleu
				if (cellTime > timeRankB)
				{
					finalDivision = "/img/glide/none.webp";
					finalColor = "unknow-bg-color";
				}
				else if (cellTime > timeRankI)
				{
					finalDivision = "/img/glide/beginner.webp";
					finalColor = "beginner-bg-color";
				}
				else if (cellTime > timeRankS)
				{
					finalDivision = "/img/glide/intermediate.webp";
					finalColor = "intermediate-bg-color";

				}
				else if (cellTime > timeRankP)
				{
					finalDivision = "/img/glide/skilled.webp";
					finalColor = "skilled-bg-color";

				}
				else if (cellTime > timeRankX)
				{
					finalDivision = "/img/glide/pro.webp";
					finalColor = "pro-bg-color";

				}
				else if (cellTime > timeRankM)
				{
					finalDivision = "/img/glide/expert.webp";
					finalColor = "expert-bg-color";

				}
				else if (cellTime > timeRankL)
				{
					finalDivision = "/img/glide/master.webp";
					finalColor = "master-bg-color";

				}
				else if (cellTime < timeRankE)
				{
					finalDivision = "/img/glide/elite.webp";
					finalColor = "elite-bg-color";

				}
				else if (cellTime >= timeRankE)
				{
					finalDivision = "/img/glide/legend.webp";
					finalColor = "legend-bg-color";

				}
				else
				{
					finalDivision = "/img/glide/none.webp";
				}
				if (rank == "1")
				{
					finalDivision = "/img/glide/champion.webp";
					finalColor = "champion-bg-color";
				}

				td.classList.add(finalColor);
				td.innerHTML = '<center><img style="max-width:2.3em" src="' + finalDivision + '"></center>'
			}


		}

		function AddingPlateformLogoToTable (key, valueCell, td, mapSelected)
		{
			let finalColor = [0, 0, 0];
			let finalPlateform = "/img/glide/switch.webp";

			if (key == "Platform")
			{
				if (valueCell == "wiiuc")
				{
					finalPlateform = "/img/glide/wiiuc.webp"
				}
				else if (valueCell == "wiiu")
				{
					finalPlateform = "/img/glide/wiiu.webp"
				}
				else if (valueCell == "ps")
				{
					finalPlateform = "/img/glide/ps.webp"
				}
				else if (valueCell == "xbox")
				{
					finalPlateform = "/img/glide/xbox.webp"
				}
				else if (valueCell == "switch")
				{
					finalPlateform = "/img/glide/switch.webp"
				}
				else { finalPlateform = "/img/glide/switch.webp" }
				td.innerHTML = '<center><img style="max-width:2.3em" src="' + finalPlateform + '"></center>'
			}
		}

		//----------------------------------------------------------------
		//times configurator
		function timeToSeconds (time)
		{
			const parts = time.split(":"); // Sépare les minutes et les secondes
			const minutes = parseInt(parts[0], 10); // Convertit les minutes en no
			const seconds = parseFloat(parts[1]); // Convertit les secondes en no (décimal)
			return minutes * 60 + seconds; // Convertit tout en secondes
		}

		function sortByTime (array, key)
		{
			return array.sort((a, b) =>
			{
				const timeA = timeToSeconds(a[key]);
				const timeB = timeToSeconds(b[key]);
				return timeA - timeB; // Tri croissant
			});
		}

		function secondsToTime (seconds)
		{
			const minutes = Math.floor(seconds / 60);
			const remainingSeconds = (seconds % 60).toFixed(3); // Garde les millisecondes à 3 décimales
			return `${minutes}:${remainingSeconds.padStart(6, '0')}`; // Formate en MM:SS.mmm
		}


		//----------------------------------------------------------------
		//Preparation du Json et data table final. 
		function filterPlayersByName (players, pseudo)
		{
			return players.filter(player => player.Player.toLowerCase().includes(pseudo.toLowerCase()));
		}

		function toggleTableHeadersByValues (tableId, columnValues)
		{
			// Récupère le tableau par son ID
			const table = document.getElementById(tableId);

			if (!table)
			{
				console.error('Table not found');
				return;
			}

			// Récupère toutes les cellules <th> dans le header du tableau
			const headers = table.querySelectorAll('th');

			// Parcours chaque <th>
			headers.forEach(header =>
			{
				// Récupère la valeur de l'attribut 'value' dans le <th>
				const headerValue = header.getAttribute('value');

				// Vérifie si la valeur est dans le tableau columnValues
				if (columnValues.includes(headerValue))
				{
					// Si la valeur est dans le tableau, affiche le <th>
					header.style.display = '';
				} else
				{
					// Si la valeur n'est pas dans le tableau, cache le <th>
					header.style.display = 'none';
				}
			});
		}



		function createGlideTable (headerColumnsTable, playerSearch, keysMapsRemoved)
		{
			fetch('/csv/glideLDBaerialtorti.csv') 
				.then(response =>
				{
					if (!response.ok) throw new Error("Erreur de chargement du fichier CSV");
					return response.text();
				})
				.then(csvText =>
				{
					fetch('/csv/glideRank.json') // prend le json sa mere
						.then(response =>
						{
							if (!response.ok) throw new Error("Erreur de chargement du fichier json");
							return response.json();
						})
						.then(glideRankyRanky =>
						{
							glideRankyRanky = glideRankyRanky.gliderankyranky
							const timeKeys = ["Cavern", "Temple", "Dragon", "Body", "Canyon", "Celts", "Excalibur", "Icarus", "Kraken", "Mobs", "Shrunk", "Yeti"];
							const timeKeysToRemove = keysMapsRemoved;
							const finalTimeKeys = timeKeys.filter(key => !timeKeysToRemove.includes(key));
							const jsonData = csvToJson(csvText);
							let finalDataTable = jsonData;
							finalDataTable = removeKeysFromJSON(finalDataTable, timeKeysToRemove);
							console.log("check1");
							console.log(finalDataTable);
							finalDataTable = addAverageTimes(finalDataTable, finalTimeKeys);
							console.log("check2");
							console.log(finalDataTable);

							finalDataTable = addTtTimeByJson(finalDataTable, finalTimeKeys);
							console.log("check3");
							console.log(finalDataTable);

							finalDataTable = sortByTime(finalDataTable, "average");
							console.log("check4");
							console.log(finalDataTable);

							finalDataTable = addRankByJson(finalDataTable);
							console.log("check5");
							console.log(finalDataTable);

							finalDataTable = filterPlayersByName(finalDataTable, playerSearch);
							console.log("check6");
							console.log(finalDataTable);



							//creeation du tableau
							// Insérer les données dans le tableau
							const tbody = document.querySelector("#data-table tbody");
							tbody.innerHTML = ""; // Réinitialiser le tableau

							finalDataTable.forEach(row =>
							{
								const tr = document.createElement("tr");
								for (const key of headerColumnsTable)
								{
									const td = document.createElement("td");
									td.textContent = row[key] || ""; // Si la valeur est vide, insérer une chaîne vide


									glideRankyRanky.forEach((map) =>
									{
										//adding data to table like plateform img, division, colors
										ColoredCaseByTime(key, row[key], td, map.Map, glideRankyRanky);
										AddingDivisionToTable(key, row["average"], td, map.Map, glideRankyRanky, row["rank"]);
										AddingPlateformLogoToTable(key, row["Platform"], td, map.Map);
									})

									tr.appendChild(td);
								}
								tbody.appendChild(tr);
							});

						})
						.catch(error => console.error("Erreur :", error));


				})
				.catch(error => console.error("Erreur :", error));
		}



		// Fonction pour récupérer les valeurs cochées des cases avec id="headerCheckbox"
		function getCheckedValues ()
		{
			const checkedValues = [];
			headerCheckboxes.forEach(checkbox =>
			{
				if (checkbox.checked)
				{
					checkedValues.push(checkbox.value);
				}
			});
			return checkedValues;
		}

