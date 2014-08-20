
//Fichier test
//Sans espace ni ligne superflus !!!
/*	Fichier test
//Debut
1 0 0 1
0 1 0 1
0 0 1 0
1 1 0 1
//Fin
*/



function uploadFichierMatAtdj() {

	//Grand nettoyage
	commeNeuf();
	d3.select("div.boutons2Base").remove();
	d3.select("div.boutonsSup").remove();
	d3.select("div.buttonsArea").append("div").classed("boutons2Base",true);
	d3.select("div.buttonsArea").append("div").classed("boutonsSup",true);


	// On prépare la zone d'upload
	var UpldButtonZ = d3.select("div.boutons2Base").append("div")
													.classed("UplArea",true);

	var divUp1 = UpldButtonZ.append("div")
								.style("height",45+"%")
								.style("width",45+"%")
								.classed("Upload1",true);

	var divUp2 = UpldButtonZ.append("div")
								.style("height",45+"%")
								.style("width",45+"%")
								.classed("Upload1",true);


	divUp1.text("Fichier principal");
	divUp1.append("input").attr("id","myfile")
							.classed("input0",true)
							.attr("type","file");	// on indique qu'on cherche un fichier
							//.attr("accept","text/csv");

	divUp2.text("Fichier secondaire");
	divUp2.append("input").attr("id","myfile2")
							.classed("input0",true)
							.attr("type","file")	// on indique qu'on cherche un fichier
							.attr("accept","text/csv");

	UpldButtonZ.append("button")
						.attr("id","validF")
						.text("Valider la selection")


	var bouttonF = document.querySelector('#validF');
	var boutton1 = document.querySelector('#myfile');
	var boutton2 = document.querySelector('#myfile2');

	var dataF = [];


	bouttonF.onclick = function(e) {


			var reader = new FileReader();
			reader.onload = function() { 

						//traitDataJson1(reader.result);
						dataF.push(reader.result);	// on insérer dans dataF le tab des valeurs du fichier upldé
						//console.log(dataF);
						
						
				 };
			reader.readAsText(boutton1.files[0]);
			var reader2 = new FileReader();
			reader2.onload = function() { 

						//traitDataJson1(reader.result);
						dataF.push(reader2.result);	// on insérer dans dataF le tab des valeurs du fichier upldé
						//console.log(dataF);
						
						var jsonTab = arrayToJSON(parseMatAdjToJSON(dataF));

						var rez5 = traitDataCsv(dataF[1]);
						//console.log(rez5);
						plotForceLayout(jsonTab,rez5);

				 };
			reader2.readAsText(boutton2.files[0]);
									};






}










// Transforme une matrice d'adjacence en tableau JS
function parseMatAdjToJSON (data1) {

	var data = data1[0];
	//console.log(data);

	var nbLign = nbLignes(data);
	//console.log(nbLign);

	var rez1 = [],
		indexLign,
		cp1data = data,
		cp2data = data;

	for (var i = 0; i < nbLign-1; i++) {
		indexLign = data.indexOf("\n");
		cp1data = data;
		cp1data = cp1data.slice(0,indexLign);
		//console.log(cp1data);
		var rez2 = cp1data.split(" ",i+1)
		for (var j = 0; j < rez2.length; j++) {
			rez2[j] = +rez2[j]
		};
		//console.log(rez2);

		//on coupe data
		indexLign++;
		data = data.slice(indexLign,data.length);
		//console.log(data);

		rez1.push(rez2);		
	};

	rez2 = data.split(" ",nbLign-1);
	//console.log(data);
	//console.log(data.length);
	rez2.push(data.slice(data.length-1,data.length));
	for (var i = 0; i < rez2.length; i++) {
		rez2[i] = + rez2[i];
	};
	rez1.push(rez2);	


	//console.log(rez1);
	return(rez1);

}



// transforme les tab JS en JSON compris par d3.force nodes
function arrayToJSON(tab1) {

	//console.log(tab1);
	var nodesLinksData = {"nodes":[],"links":[]};

	//On instancie le noeud originel avec liaison vers lui même sinon le graph ne peut exister
	//provoque un bug bisard, je décide donc de créer tout les noeud et suprimer les inutiles ensuites malgrès le coup
	//console.log(nodesLinksData);

	for (var i = 0; i < tab1.length; i++) {
		nodesLinksData["nodes"].push({"index1":i});
		for (var j = 0; j < tab1[i].length; j++) {
			if (tab1[i][j] == 1) {
				nodesLinksData["links"].push({"source":i,"target":j});
			};
		};
	};

	//console.log(nodesLinksData);
	//console.log(nodesLinksData["links"]);

	/*
	//Useless to delete les connections des noeurds vers eux même
	// On supprime les noeuds équivalent aux éléments diagonaux de la matrice sauf le premiers et le dernier sinon on perd des noeuds.
	for (var i = 1; i < nodesLinksData["links"].length-1; i++) {
		if (nodesLinksData["links"][i]["source"] ==  nodesLinksData["links"][i]["target"]) {
			
			//console.log(nodesLinksData["links"][i]["source"]," = ",nodesLinksData["links"][i]["source"])
			nodesLinksData["links"].splice(i,1);
			//nodesLinksData["nodes"].splice(i,1);
			i--;
	}
	};
	*/

	//console.log(nodesLinksData);

	return nodesLinksData;
}





function plotForceLayout(nodesLinksData2,dataComp) {

	//Grand nettoyage
	commeNeuf();
	d3.select("div.boutons2Base").remove();
	d3.select("div.boutonsSup").remove();
	d3.select("div.buttonsArea").append("div").classed("boutons2Base",true);
	d3.select("div.buttonsArea").append("div").classed("boutonsSup",true);

	//Choix de revenir au menu original
	var NewUpload = d3.select("div.boutons2Base").append("button").attr("id","NewUpload");
	NewUpload.text("New Upload");
	NewUpload.on("click",function(d){ choixUpldFichierCsvOuPas(); });

	var Help0 = d3.select("div.boutons2Base").append("button").attr("id","help0");
	Help0.text("Help");
	Help0.on("click",function(d){ aideUser(); });

	var tabVall = objToAtt(dataComp);

	plotForceLayoutInside(nodesLinksData2,0,tabVall,false,false,false,false,35);


}

function plotForceLayoutInside(data2,numAtt,dataComp1,gravity0,friction0,chargeParam0,linkDistance0,rayMaxNeur0) {

	//On nettoie l'ancien SVG si il est présent
	d3.select("svg.forceLayout").remove();
	d3.select("div.modifParamForceLay").remove();
	d3.select("div.divChoixDeroulantMatAdj").remove();


	//On teste les paramètres de force
	var chargeParam1 = chargeParam0;
	var linkDistance1 = linkDistance0;
	var friction1 = friction0;
	var gravity1 = gravity0;
	//Si ce param a pour valeur faux, on lui attribut une val par defaut
	if (!chargeParam1) {chargeParam1 = -300};
	if (!linkDistance1) {linkDistance1 = 100};
	if (!friction1) {friction1 = 0.7};
	if (!gravity1) {gravity1 = 0.1};

	var tabValParamForceLay = [gravity1,friction1,chargeParam1,linkDistance1];





	//Initialisation visu
	var width = 960,
	    height = 500;

	//Début zone diag force
	var svg = d3.select("div.dessein")
				.append("svg")
				.classed("forceLayout",true);

	// On initialise le diag de force
	var force = d3.layout.force()
	    .charge(chargeParam1)
	    .linkDistance(linkDistance1)
	    .friction(friction1)
	    .gravity(gravity1)
	    .size([width, height]);



	//On prépare les données qui serviront à influencer le graph
	var clesAtt = d3.keys(dataComp1);
	
	//console.log(dataComp1);
	//console.log(clesAtt);
	//console.log(dataComp1[clesAtt[numAtt]]);
	
	var color = d3.scale.linear().domain([d3.min(dataComp1[clesAtt[numAtt]]),d3.max(dataComp1[clesAtt[numAtt]])]).range(["pink","blue"]);
	var rayMaxNeur = rayMaxNeur0;
	var cardScale = d3.scale.linear().domain([d3.min(dataComp1["card"]),d3.max(dataComp1["card"])]).range([3,rayMaxNeur]);
	//console.log(data2.nodes)



	//Zone de selection des attributs à visualiser
	var selecteurAttributAVisu = d3.select("div.boutonsSup")
									.append("div")
									.classed("divChoixDeroulantMatAdj",true);

	//Début du select
	var ChoixDeroulant = selecteurAttributAVisu.append("select")
												.attr("id","choice0");

	//Sous titre des options disponibles
	var optGroup0 = ChoixDeroulant
								.append("optgroup")
								.attr("label","Veuillez selectionner un attribut");


	//On créer les options en fonction du nb d'attributs
		for (var i = 0; i < Object.size(dataComp1); i++) {

		var id1 = "Attribut"+i;

		optGroup0.append("option")
					.classed("opt0","true")
					.attr("id",id1)
					.attr("value",i)
					.attr("selected",false)
					.text(function(){ return clesAtt[i];});
		};

	//On va chercher l'option selectionnner
	var choice00 = document.getElementById("choice0");

	choice00.addEventListener("click",function(e){

		//console.log(choice00.selectedIndex);
		d3.layout.force().stop();
		//d3.select("svg").remove();
		plotForceLayoutInside(data2,choice00.selectedIndex,dataComp1,gravity1,friction1,chargeParam1,linkDistance1,rayMaxNeur);
	});







	//Zone de modification des paramètre

	var modifParam = d3.select("div.boutonsSup")
						.append("div")
						.classed("modifParamForceLay",true);

	var linkDist = modifParam.append("input")
								.classed("paramForceLay",true)
								.attr("type","text")
								.attr("value","Gravity 0<x<1");

	var linkDist = modifParam.append("input")
								.classed("paramForceLay",true)
								.attr("type","text")
								.attr("value","Friction 0<x<1");

	var linkDist = modifParam.append("input")
								.classed("paramForceLay",true)
								.attr("type","text")
								.attr("value","Charge -500<x<500");

	var linkDist = modifParam.append("input")
								.classed("paramForceLay",true)
								.attr("type","text")
								.attr("value","linkDistance 0<x<200");

	var linkDist = modifParam.append("input")
								.classed("paramForceLay",true)
								.attr("type","text")
								.attr("value","Rmax Neurone 1<x<60");


	modifParam.append("button")
				.attr("id","ValidChoiceForceLay")
				.text("Effectuer les changements");

	//Tab des val pour le forceLayout
	var tabValBase = [data2,choice00.selectedIndex,dataComp1];

	document.querySelector("#ValidChoiceForceLay").addEventListener("click",function(){ ModifParamForceLay(tabValBase,tabValParamForceLay); });










  force
      .nodes(data2.nodes)
      .links(data2.links)
      .start();

	function dblclick(d) {
	  d3.select(this).classed("fixed", d.fixed = false);
	}

	function dragstart(d) {
	  d3.select(this).classed("fixed", d.fixed = true);
	}

	var drag = force.drag()
    .on("dragstart", dragstart);


  var link = svg.selectAll(".link")
      .data(data2.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width",2);
      //.style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll(".node")
      .data(data2.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", function(d,i){return cardScale(dataComp1["card"][i])})	//fixe la taille du noeud en fonction de la taille du cluster associé
      .style("fill", function(d,i) { return color(dataComp1[clesAtt[numAtt]][i]); })
      .on("dblclick",dblclick)
      .on("click",function(d,i){foncInfo5(dataComp1,i);})
      .call(drag);

  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
};



function ModifParamForceLay(tabValBase,tabValParamForceLay) {

	var valInTab = document.querySelectorAll("input.paramForceLay");

	var inputVal;
	var tabBoolToChange = tabValBase;
	
	for (var i = 0; i < valInTab.length; i++) {
		inputVal = valInTab[i].value;
		inputVal = +inputVal;
		if (!isNaN(inputVal)) {
			tabBoolToChange.push(inputVal)
		}
		else {
			tabBoolToChange.push(tabValParamForceLay[i])
		};
	};

	//console.log(tabBoolToChange);
	plotForceLayoutInside(tabBoolToChange[0],tabBoolToChange[1],tabBoolToChange[2],tabBoolToChange[3],tabBoolToChange[4],tabBoolToChange[5],tabBoolToChange[6],tabBoolToChange[7])
}