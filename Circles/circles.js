function circles(dataUp) {

var tous = [],
	boolAffParLigne = true;

circlesIn(tous,10,dataUp,boolAffParLigne);

}

function circlesIn(toto,dimMap,dataUp2,boolLigne) {



	// Préparation data pour fonction foncInfo5
	var to1,to2;
	to1 = objToAtt(dataUp2[0]);
	to2 = objToAtt(dataUp2[1]);

	for (var j in to2) {
		to1[j] = to2[j];
	}

	var ObjF = to1;









  var size = 150,		// taille rect et ...
      padding = 10;		// espacement

  var 	data2 = [],	// tableau de tableau des valeurs des attributs
  		nbAtt,	// nombre d'attributs des objets
  		nbObj,	// nopmbre d'objets
  		scaleTab,	// tableau des echelles associé à chaque attribut
  		attrNames,	// tableau des noms des attributs
  		strIndex;	// tableau des indices des attributs de type string

  	var rectTaille = size-padding;
	var rectTaill = size - padding;
	var dimY = dimMap;
	var dimX = Math.floor(100/dimY);
	var cellMargin = 1;
	var bigCellWidthMarg = 20;
	var bigCellHeightMarg = 20;
	var bigCellWidth = (2*cellMargin)+(dimX*rectTaill)+((dimX-1)*(2*cellMargin))+bigCellWidthMarg;
	var bigCellHeight = (2*cellMargin)+(dimY*rectTaill)+((dimY-1)*(2*cellMargin))+bigCellHeightMarg;
	var rectPadding =  (11+bigCellWidthMarg)/2;

	var coul = d3.scale.category10();

		//On efface pour mieux redessiner
		commeNeuf();
		legendCircle();

	d3.selectAll("div.butAttributs button").remove();
	d3.select("div.boutons1").remove();

	var cellsArea = d3.select("div.dessein").append("div").classed("cellsArea1",true);
	var cellsArea2 = cellsArea.append("div").classed("cellsArea22",true);

							
	var svg = cellsArea2.append("svg")			// on ajoute un espace SVG
						.attr("id","circles")
						.attr("width", bigCellWidth)
						.attr("height", bigCellHeight)
						.call(	d3.behavior.zoom()
						            .scaleExtent([0.1, 30])
						            .on("zoom", zoom1All)
						       )
						.append("g")
						.classed("gZoom",true);


		//Zone de boutons


	d3.select("div.boutonsSup").append("input")
			.attr("id","dimYY")
			.attr("type","text")
			.attr("value","Entrez la dimension désirée  1<x");
			//.attr("size","80%");

	d3.select("div.boutonsSup").append("button")
								.classed("lignCol",true)
								.on("dblclick",function(){ circlesIn([],dimY,dataUp2,true);})
								.text("dblclick : By Column");
	d3.select("div.boutonsSup").append("button")
								.classed("lignCol",true)
								.on("dblclick",function(){ circlesIn([],dimY,dataUp2,false);})
								.text("dblclick : By Raw");

			//.attr("onchange","ModifDimSizeCircles()");

	document.querySelector("#dimYY").onchange = function(){ ModifDimSizeCircles(dataUp2,boolLigne); };


 var boutonsAtt = d3.select(".boutonsSup").append("div")
 							.classed("butAttributs",true);

/*
	d3.select("div.butAttributs").append("button")
			.attr("class","attsButtons")
			.attr("id","allCircles1")
			.text("Tous");

document.querySelector('#allCircles1').onclick = function(){ circlesIn(10,dimY,dataUp2); };
*/


	//console.log(dataUp2);
	//console.log(dataUp2[0]);

	var dataTemp = objToAtt(dataUp2[0]);
	for (var i in dataTemp) {
		data2.push(dataTemp[i]);
	};

	//data2 est un tableau de tableaux, ou chacun rpz l'ensemble des valeurs d'un att

	attrNames = Object.keys(dataUp2[0][0]);
	nbAtt = data2.length;


		//On crée les cellules
		var cell = svg.selectAll("g.cellCircles")
  				.data(dataUp2[0])
			    .enter()
			    .append("g")
			    .classed("cellCircles",true)
			    .attr("transform", function(d,i) { //console.log(d);
			    	var posId = posInd(i,dimY)	// retourne les indices de pos
			    	return inversLigneColon(boolLigne,posId,rectTaill,cellMargin); });

			//Backgroun cellules
		    cell.append("rect")
		        .attr("class", "frame")		    
		        .attr("x", padding / 2)
		        .attr("y", padding / 2)
		        .attr("width", size - padding)
		        .attr("height", size - padding)
				.on("dblclick",function(d,i){foncInfo5(ObjF,i);});

	        cell.append("text")
	        	.attr("transform","translate(7,19)")
	        	.attr("font-size","20px")
	        	.text(function(d,i){ return i+1;});



		// On construit les echelles adaptées aux intervalles des attributs
		scaleTab = tabScale(data2,68,nbAtt);


	    for (var indo1=0; indo1<nbAtt; indo1++) {
	    	if (typeof dataUp2[0][0][attrNames[indo1]] !== "number") {}
	    	else {


// On initialise les cercles avec r=0
var trans1 = cell.append("circle")
		    	.attr("class",attrNames[indo1])	    	
		    	.attr("cx", (rectTaille/2)+5 )
		    	.attr("cy", (rectTaille/2)+5 )
		    	.attr("r",0)
		    	.attr("stroke",function(){ return coul(indo1);})
		    	.attr("fill","none")
		    	.attr("stroke-width",2)
		    	.attr("stroke-opacity",0.7);

//On donne la bonne valeur du rayon avec transition
    	trans1.transition()
		    	.duration(1500)
		    	.ease("bounce")
		    	.attr("r",function(d){ 
		    		//console.log(d);
		    		//console.log(d[attrNames[indo1]]);
		    		return scaleTab[indo1](d[attrNames[indo1]]); })		    	
		

		//Création légend suite
		d3.select("svg.legLine").append("line")
			.attr("x1",10)
			.attr("x2",60)
			.attr("y1", indo1*20+20)
			.attr("y2", indo1*20+20)
			.attr("stroke",coul(indo1))
			.attr("stroke-width",5);

		d3.select("svg.legLine").append("text")
			.attr("font-size","20px")
			.attr("transform", function() {	return "translate(75,"+(indo1*20 + 23)+")";		})
			.text(attrNames[indo1]);
			    
	    			}		    
			    								}

	//	Legend Text

	d3.select("svg.legLine").append("text")
		.attr("font-size","20px")
		.attr("transform", function() {	return "translate(10,"+(nbAtt*20 + 40)+")";		})
		.text("Double-cliquez sur une cellule pour des informations");


 	d3.select("svg.legLine").append("text")
		.attr("font-size","20px")
		.attr("transform", function() {	return "translate(10,"+(nbAtt*20 + 60)+")";		})
		.text("complémentaires.");


 	d3.select("svg.legLine").append("text")
		.attr("font-size","20px")
		.attr("transform", function() {	return "translate(10,"+(nbAtt*20 + 90)+")";		})
		.text("Vous pouvez également choisir la disposition des cellules");

 	d3.select("svg.legLine").append("text")
		.attr("font-size","20px")
		.attr("transform", function() {	return "translate(10,"+(nbAtt*20 + 110)+")";		})
		.text("avec le champs à votre gauche en entrant un valeur ou ");

 	d3.select("svg.legLine").append("text")
		.attr("font-size","20px")
		.attr("transform", function() {	return "translate(10,"+(nbAtt*20 + 130)+")";		})
		.text("visualiser les attributs de manière indépendante.");

	// Suprime les cercles non selectionnés
if (toto.length == 0) {}
else if (toto != null) {
    for (var indo1=0; indo1<nbAtt; indo1++) {
		if (typeof dataUp2[0][0][attrNames[indo1]] !== "number") {}
		else if (toto.indexOf(indo1) != -1) {}	// si on trouve l'att n° indo1 dans le tableau on le laisse
    	else {				//sinon on supprime les cercles corespondants

			var aSupp = "."+attrNames[indo1]
			d3.selectAll(aSupp).remove();
			}
											}
			};





	var divChoixAttVisible = d3.select("div.butAttributs").append("div").classed("divChoixAttVisible",true);

	var ChoixAttVisible = divChoixAttVisible.append("select")
												.attr("id","AttVisible")
												.attr("multiple",true);

	var butAct =  d3.select("div.butAttributs").append("button").attr("class","b1")
													.attr("size","5")
													.attr("id","Activation");
		butAct.text("Activer selection");

		var selectAtt2 = ChoixAttVisible.append("optgroup")
										.classed("optgroup0",true)
										.attr("label","Attributs à afficher");


	// On construit les boutons pour afficher les attributs souhaités
    for (var indo1=0; indo1<nbAtt; indo1++) {
		if (typeof dataUp2[0][0][attrNames[indo1]] !== "number") {}
    	else{

    		var id1 = "circleA"+indo1;

			selectAtt2.append("option")
					.classed("attsButtons",true)
					.attr("id",id1)
					.attr("value",indo1)
					.attr("selected",false)
					.text(function(){ return attrNames[indo1];});

			//id1 = "#"+id1;
			//document.querySelector(id1).onclick = function(){ circlesIn(this.value,dimY,dataUp2); };
	
			}	
	}

	butAct.on("click",function() {

	var lol = document.getElementById("AttVisible");
	var tabElemSelect = [];

	for (var i = 0; i < lol.options.length; i++) {
		//si l'option est selectionnée, on met son indice dans le tableau des options selectionnées
		if (lol.options[i].selected) { 
			tabElemSelect.push(i) };
	};

	//console.log(tabElemSelect);
	circlesIn(tabElemSelect,dimY,dataUp2,boolLigne);
	});
	



};






function legendCircle(){

      // Zone de légende
  var legend1 = d3.select("div.legendG").append("div")
					.classed("legend",true);

	//Création légend
	legend1.append("svg").classed("legLine",true)
						.attr("height",900)
						.attr("width",900);

}




function foncInfoCircles(datas,index1) {

	var clesF = d3.keys(datas[0]);

	var ObjF = {};
	// On initialise les tableau d'attributs
	for (var i = 0; i < clesF.length; i++) {
		ObjF[clesF[i]] = [];
	};

	for (var j = 0; j < datas.length; j++) {
		for (var i in datas[j]) {
			ObjF[i].push(datas[j][i]);
		};
	};

	d3.select("div.info1").remove();		// on supp les anciens elem pour éviter qu'ils se cumulent
	d3.select("div.barGraph").remove();		// on supp les anciens elem pour éviter qu'ils se cumulent

	var info1 = d3.select("div.legendG2").append("div")
								.classed("info1",true);

	info1.append("p").style("font-size","20px")
					.text(" Valeurs des attributs"); // on fait une marge freestyle

	for (var i in ObjF) {
		var text1 = i + " : " + ObjF[i][index1];
		info1.append("p").style("font-size","15px").text(text1);

	};

	var valcalc = moyInfo5(ObjF);
	barchartInfo5(valcalc,ObjF,index1);

};



function ModifDimSizeCircles(dataUp3,lignOrCol){

	var htmlElem = document.getElementById("dimYY");
	var val1 = htmlElem.value;
	val1 = +val1;

	circlesIn([],val1,dataUp3,lignOrCol);

};























//  to upgrade
function tabScaleGen(Obj55,attNames55,domain,nbAttr) {

  var reZ = new Array();

  for (var cp1 = 0; cp1 < attNames55.length; cp1++) {

    // Si tab de VN alors on créer une échelle
    if (typeof Obj55[attNames55[cp1]][0] === "number") {
      //console.log(d3.max(tab2[cp1]));
      var scaleZ = d3.scale.linear().domain([d3.min(Obj55[attNames55[cp1]]),d3.max(Obj55[attNames55[cp1]])]).range([0,domain]);
      reZ.push(scaleZ);
                  }

    // Sinon c'est des chaine de caractère, on ajoute un 0;
    else reZ.push(0);
  };


  //console.log(reZ);
  return reZ;
};


function propagEvent(){

	console.log(document);
	console.log(window);


	var dessein = document.getElementsByClassName("dessein");
	var dessein2 = document.querySelectorAll("div.dessein");
	console.log(dessein);
	console.log(dessein2);

	//dessein.getElementsByClassName("cellCircles");

	var dessein3 = d3.select("div.dessein");
	var svg = d3.select("svg");

	console.log(dessein3);
	console.log(svg);
	console.log(svg[0]);
	console.log(svg[0][0]);
	console.log(svg[0][0].childNodes);
	var lol = svg[0][0].childNodes;
	console.log(lol);
	console.log(lol.item(5));
	console.log(lol[5]);


	var svgNodes = svg[0][0].getElementsByClassName("cellCircles");
	console.log(svgNodes);
	console.log(svgNodes[0]);
	console.log(svgNodes.item(5));








	var cells = document.getElementsByClassName('cellCircles');
	var cells2 = document.querySelectorAll("g.cellCircles");
	var socle = document.getElementById('circles');
	//console.log(cells);
	//console.log(cells2);

	//console.log(cells.item(5));
	//console.log(typeof cells);
	//console.log(cells);
	//console.log(cells.item(5));
	//console.log(socle);

	var cells3 = d3.selectAll("g.cellCircles");
	//console.log(cells3);

	//var lala = d3.select(".circles");
	//console.log(lala);


	//for (var i in cells) { console.log(i);}

	//var cell1 = cells[0];
	//console.log(cells.item);


}

// range les cellules par colonne si vrai, par ligne si faux
function inversLigneColon(unBool,lesPosistionSurGrille,recTail,celMarg) {
	if (unBool) {
		return "translate(" + (lesPosistionSurGrille[0] * (recTail+celMarg)+5) + "," + (lesPosistionSurGrille[1] * (recTail+celMarg)+5) + ")"
	}

	else {
		return "translate(" + (lesPosistionSurGrille[1] * (recTail+celMarg)+5) + "," + (lesPosistionSurGrille[0] * (recTail+celMarg)+5) + ")"
	}

}