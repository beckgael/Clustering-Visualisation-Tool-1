
function aideUser() {
	commeNeuf();

};


function aideUserMatAdj() {
	commeNeuf();
}

function aideUserCircles() {
	commeNeuf();
}




function helpUserCells() {
	d3.select("div.HelpCircles").remove();

	var h1 = d3.select("div.legendG").append("div")
							.classed("HelpCircles",true);
							
		h1.append("p").text("Intéractivité disponible :");
		h1.append("p").text("Double clic sur une petite cellule pour obtenir des informations complémentaires.");
		h1.append("p").text("Zoom sur l'ensemble des cartes");
}



function helpUserCircles() {

	d3.select("div.HelpCircles").remove();

	d3.select("div.legendG").append("div")
							.classed("HelpCircles",true)
							.text("Aide pour l'utilisation de la visualisations sous forme de cercles.\n"
									+"Double-cliquez sur une cellule pour des informations complémentaires. "
									+"Vous pouvez également choisir la disposition des cellules "
									+"avec le champs à votre gauche en entrant un valeur de remplissage par ligne ou colonne ou encore "
									+"visualiser les attributs de manière indépendante à l'aide du menu déroulant."
								);
}

function helpUserHisto() {

	d3.select("div.HelpCircles").remove();

	d3.select("div.legendG").append("div")
							.classed("HelpCircles",true)
							.text("Aide pour l'utilisation de la visualisations sous forme d'histogrammes'.\n"
									+"Double-cliquez sur une cellule pour des informations complémentaires. "
									+"Vous pouvez également choisir la disposition des cellules "
									+"avec le champs à votre gauche en entrant un valeur de remplissage par ligne ou colonne ou encore "
									+"visualiser les attributs de manière indépendante à l'aide du menu déroulant."
								);
}

function helpUserProp() {

	d3.select("div.HelpCircles").remove();

	var h1 = d3.select("div.legendG").append("div")
							.classed("HelpCircles",true);
							
		h1.append("p").text("Intéractivité disponible :");
		h1.append("p").text("Cliquer sur un arc de cercle pour obtenir des informations complémentaires.");
}