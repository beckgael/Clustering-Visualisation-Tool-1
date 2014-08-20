
function choixUpldFichierCsvOuPas() {

	//On prépare le terrain avec un grand nettoyage
	commeNeuf();
	d3.select("div.boutons2Base").remove();
	d3.select("div.boutonsSup").remove();
	d3.select("div.buttonsArea").append("div").classed("boutons2Base",true);
	d3.select("div.buttonsArea").append("div").classed("boutonsSup",true);

	
	//On crée le menu déroulant
	var divChoixDeroulant = d3.select("div.boutons2Base")
								.append("div")
								.classed("divChoixDeroulant",true)
	var ChoixDeroulant = divChoixDeroulant
								.append("select")
								.attr("id","choice0");

	var optGroup0 = ChoixDeroulant
								.append("optgroup")
								.attr("label","Veuillez selectionner un type d'upload");

		optGroup0.append("option")
					.classed("opt0","true")
					.text("Algorithme SOM with csv");
		optGroup0.append("option")
					.classed("opt0","true")
					.text("Algorithme SOM with txt");
		optGroup0.append("option")
					.classed("opt0","true")
					.text("Matrice d'adjacences with csv");
		optGroup0.append("option")
					.classed("opt0","true")
					.text("Matrice d'adjacences with txt");


	// On selectionne le selecteur pour trouver la valeur qui nous interesse
	var choice00 = document.getElementById("choice0");

	//On lui assigne un event
	choice00.addEventListener("click",function(e){
		//console.log(choice00.options);
		//console.log(choice00.selectedIndex);

		//var choix0 = choice00.selectedIndex;

		// On active le choix selectionné
		switch (choice00.selectedIndex) {

			case 0 : upldFichierCsv();
						break;

			case 1 : console.log("txt");
						break;

			case 2 : uploadFichierMatAtdj();
						break;

			case 3 : console.log("txt2");
						break;

			default : break;
		}

	});

};





function upldFichierCsv() {

	// on nétoie les espaces d'affichages
	commeNeuf();
	d3.select("div.boutons2Base").remove();
	d3.select("div.boutonsSup").remove();
	d3.select("div.buttonsArea").append("div").classed("boutons2Base",true);
	d3.select("div.buttonsArea").append("div").classed("boutonsSup",true);


	// On prépare la zone d'upload
	var UpldButtonZ = d3.select("div.boutons2Base").append("div")
													.classed("UplArea",true);
	//Zone d'upload 1
	var divUp1 = UpldButtonZ.append("div").classed("Upload1",true);
	divUp1.text("Fichier principal");
	divUp1.append("input").attr("id","myfile")
							.classed("input0",true)
							.attr("type","file")	// on indique qu'on cherche un fichier
							.attr("accept","text/csv");
							//Mettre text informatif a coté
							//.text("Fichier Principal");
	//Zone d'upload 2
	var divUp2 = UpldButtonZ.append("div").classed("Upload2",true);
	divUp2.text("Fichier secondaire");
	divUp2.append("input").attr("id","myfile2")
							.classed("input0",true)
							.attr("type","file")	// on indique qu'on cherche un fichier
							.attr("accept","text/csv")
							;							
							//Mettre text informatif a coté
							//.text("Fichier Complémentaires");


	//Bouton de validation des selections
	UpldButtonZ.append("button")
						.attr("id","validF")
						.text("Valider la selection")

	// on selectionnner les boutons pour pouvoir y chercher les fichiers
	var bouttonF = document.querySelector('#validF');
	var boutton1 = document.querySelector('#myfile');
	var boutton2 = document.querySelector('#myfile2');

	var dataF = [];


	/*
Idéalement il faut gérer l'exécution de la function finale sur les donnés dl/traitées
en fonction de la vitesse d'upload, cependant on peux penser qu'il s'agit de fichier csv
de taille < 1mo et donc "immédiatement" upl et donc functionFinale est exéc par Bouton 2
	
On travaille ici sur des fonctions asynchrones
	*/
	bouttonF.onclick = function(e) {
		//bouton 1
		var reader = new FileReader();
		reader.onload = function() { 
			//traitDataCsvJson1(reader.result);
			dataF.push(traitDataCsv(reader.result));	// on insérer dans dataF le tab des valeurs du fichier upldé
			//console.log(dataF);
		 };
		reader.readAsText(boutton1.files[0]);
		//bouton 2
		var reader2 = new FileReader();
		reader2.onload = function() { 
			dataF.push(traitDataCsv(reader2.result));	// on insérer dans dataF le tab des valeurs du fichier upldé
			//console.log(dataF);
			choixVisu(dataF);
		 };
		reader2.readAsText(boutton2.files[0]);

								};



}




function choixVisu(data) {

	//console.log(data);
	
	d3.select("div.boutons2Base").remove();
	var boutons2Base = d3.select("div.buttonsArea").append("div")
								.classed("boutons2Base",true);
	commeNeuf();

	var dataEncT = [];
	dataEncT.push(data);


	var dataEnc1 = [];
	dataEnc1.push(data[0]);
	var dataEnc2 = [];
	dataEnc2.push(data[1]);

var div2Buttons = boutons2Base.append("div").classed("div2Buttons",true);


var NewUpload = div2Buttons.append("button").attr("id","NewUpload");
	NewUpload.text("New Upload");
	NewUpload.data(dataEncT).enter();
	NewUpload.on("click",function(d){ choixUpldFichierCsvOuPas(); });

var help0 = div2Buttons.append("button").attr("id","help0");
	help0.text("Help");
	help0.on("click",function() { aideUser(); });

var divChoixDeroulant = boutons2Base.append("div").classed("divChoixDeroulant",true)

var ChoixDeroulant = divChoixDeroulant.append("select").attr("id","choice0");

var optGroup0 = ChoixDeroulant.append("optgroup").attr("label","Veuillez selectionner une visualisation");

	optGroup0.append("option").classed("opt0","true")
									.text("Circles");
	optGroup0.append("option").classed("opt0","true")
									.text("Cells");
	optGroup0.append("option").classed("opt0","true")
									.text("CellsHisto");
	optGroup0.append("option").classed("opt0","true")
									.text("Proportions");
	optGroup0.append("option").classed("opt0","true")
									.text("Histo");

var choice00 = document.getElementById("choice0");

	choice00.addEventListener("click",function(e){
		//console.log(choice00.options);
		//console.log(choice00.selectedIndex);

		//var choix0 = choice00.selectedIndex;

		switch (choice00.selectedIndex) {

			case 0 : circles(dataEncT[0])
						break;

			case 1 : degCol5(10,25,dataEncT[0],true);
						break;

			case 2 : degColHisto(10,25,dataEncT[0]);
						break;

			case 3 :  propData3(dataEncT[0]);
						break;

			case 4 :  histo1(dataEncT[0]);
						break;

			default : break;
		}

	});

	choice00.addEventListener("change",function(e){
		//console.log(choice00.options);
		//console.log(choice00.selectedIndex);

		//var choix0 = choice00.selectedIndex;

		switch (choice00.selectedIndex) {

			case 0 : circles(dataEncT[0])
						break;

			case 1 : degCol5(10,25,dataEncT[0]);
						break;

			case 2 : degColHisto(10,25,dataEncT[0]);
						break;

			case 3 :  propData3(dataEncT[0]);
						break;

			case 4 :  histo1(dataEncT[0]);
						break;
						
			default : break;
		}
	});
}



function upldMatAdj() {

	commeNeuf();


	d3.select("div.boutons2Base").remove();
	d3.select("div.boutonsSup").remove();
	d3.select("div.buttonsArea").append("div").classed("boutons2Base",true);
	d3.select("div.buttonsArea").append("div").classed("boutonsSup",true);


	var UpldButtonZ = d3.select("div.boutons2Base").append("div")
													.classed("UplArea",true);

	var divUp1 = UpldButtonZ;

	divUp1.text("Fichier Matrice Adjacence");
	divUp1.append("input").attr("id","myfile")
							.classed("input0",true)
							.attr("type","file")	// on indique qu'on cherche un fichier
							.attr("accept","text/json");


	UpldButtonZ.append("button")
					.attr("id","validF")
					.text("Valider la selection")

	var bouttonF = document.querySelector('#validF');
	var boutton1 = document.querySelector('#myfile');

	var dataF = [];


	/*
Idéalement il faut gérer l'exécution de la function finale sur les donnés dl/traitées
en function de la vitesse d'upload, cependant on peux penser qu'il s'agit de fichier csv
de taille < 1mo et donc "immédiatement" upl et donc functionFinale est exéc par B2
	*/
	bouttonF.onclick = function(e) {


		var reader = new FileReader();
		reader.onload = function() { 

			//traitDataJson1(reader.result);
			dataF.push(reader.result);	// on insérer dans dataF le tab des valeurs du fichier upldé
			//console.log(dataF);
			matriAdjVisu(dataF);
		 };
		reader.readAsText(boutton1.files[0]);

	};

}



function matriAdjVisu(data) {

	//console.log(data);
	var obj = $.parseJSON(data);	// on parse le fichier JSON en array JS à l'aide de Jquery
	console.log(obj);

	commeNeuf();
	d3.select("div.boutons2Base").remove();
	d3.select("div.boutonsSup").remove();
	d3.select("div.buttonsArea").append("div").classed("boutons2Base",true);
	d3.select("div.buttonsArea").append("div").classed("boutonsSup",true);

	var div2Buttons = d3.select("div.boutons2Base").append("div").classed("div2Buttons",true);


	var NewUpload = div2Buttons.append("button").attr("id","NewUpload");
		NewUpload.text("New Upload");
		NewUpload.on("click",function(d){ choixUpldFichierCsvOuPas(); });

	var help0 = div2Buttons.append("button").attr("id","help0");
		help0.text("Help");
		help0.on("click",function() { aideUser(); });


	visuMatAdj(obj);

};

