function degColHisto(dimY1,rectTaillUser,dataUp){

			//On efface pour mieux redessiner =)
			commeNeuf();



		//On refait les socles

var boutons12 = d3.select("div.legendG2")
						.append("div")
						.classed("boutons12",true);

var boutons2 = d3.select("div.legendG2")
						.append("div")
						.classed("boutons2",true)
						.attr("id","b2");

		tracerCellHisto(dimY1,rectTaillUser,dataUp);


};

function tracerCellHisto(dimY1,rectTaillUser,dataUp2) {

	//console.log(dataUp2);

	var to1,to2;
	to1 = objToAtt(dataUp2[0]);
	to2 = objToAtt(dataUp2[1]);

	//console.log(to1);
	//console.log(to2);

	for (var j in to2) {
		to1[j] = to2[j];
	}
	//console.log(to1);

	var ObjF = to1;


	var clesF = d3.keys(ObjF);

	var nbElem = ObjF[clesF[0]].length;

	var nbCells = Object.size(ObjF);
	var lala;
	if (nbCells <= 100) { lala = 25 }
	else if (100 < nbCells <= 200) { lala = 20 }
	else if (200 < nbCells <= 400) { lala = 15 }


	var rectTaill = rectTaillUser;  // 25 de base
	var dimY = dimY1;
	var dimX = Math.floor((nbElem)/dimY)+1;
	var cellMargin = 3;
	var bigCellWidthMarg = 20;
	var bigCellHeightMarg = 50;
	var bigCellWidth = (2*cellMargin)+(dimX*rectTaill)+((dimX-1)*(2*cellMargin))+bigCellWidthMarg;
	var bigCellHeight = (2*cellMargin)+(dimY*rectTaill)+((dimY-1)*(2*cellMargin))+bigCellHeightMarg;
	var rectPadding =  rectTaill;
	//(15+bigCellWidthMarg);
	//console.log(bigCellHeight);


	// On regroupe toute ces données dans un obj pour les réutiliser au besoin dans des fonctions
	var confCell = {};
	confCell.cellMargin = cellMargin;
	confCell.rectTaill = rectTaill ; 
	confCell.dimX = dimX ; 
	confCell.dimY = dimY ; 
	confCell.bigCellWidthMarg = bigCellWidthMarg ; 
	confCell.bigCellHeightMarg = bigCellHeightMarg ; 
	confCell.bigCellWidth = bigCellWidth ; 
	confCell.bigCellHeight = bigCellHeight ; 
	confCell.rectPadding = rectPadding ;

	//console.log(confCell);

	var tabIndTaill = [];
	var tabTaill = [];

	//console.log(ObjF);

	for (var i = 0; i < ObjF["card"].length; i++) {
		if (ObjF["card"][i] == 0) {}
		else { var obj = { "index" : i , "card" : ObjF["card"][i] }
			tabIndTaill.push(obj);
			tabTaill.push(ObjF["card"][i]); }
	};

	var indPostabTaill = 0;	// indice permettant le repérage des prototypes adéquat lors du traçage par d3
	var indPostabTaill2 = 0;	// indice permettant le repérage des prototypes adéquat lors du traçage par d3
	var indPostabTaill3 = 0;	// indice permettant le repérage des prototypes adéquat lors du traçage par d3
	var tailleMax = d3.max(tabTaill);
	//console.log(tabIndTaill);
	//console.log(tailleMax);
	//console.log(rectTaill);

	var scalePropRect = d3.scale.linear().domain([d3.min(tabTaill),d3.max(tabTaill)]).range([20,100]);
	var rezScale = [];

	for (var i = 0; i < tabTaill.length; i++) {
		rezScale.push(scalePropRect(tabTaill[i]));
	};

	//console.log(tabTaill);
	//console.log(rezScale);

	//console.log(ObjF);


	var cellsArea = d3.select("div.dessein").append("div").classed("cellsArea",true);
	var cellsArea2 = cellsArea.append("div").classed("cellsArea2",true);


	for (var i = 0; i < Object.size(ObjF); i++) {

	var fen = cellsArea2.append("div")
				.classed("t"+i,true)
				.classed("mapAtt",true)
				.style("height",0)
				.style("width", 0)
				.style("top","30px")
				.style("left","30px");
				//.style("float","left");
				//.style("transform","translateX(100px)");

		fen
			//.transition().duration(2000).ease("linear")
			.style("width",bigCellWidth+"px")
			.style("height",bigCellHeight+rectTaill+"px");



var coul = ["#393b79" , "#5254a3" , "#6b6ecf" , "#9c9ede" , "#637939" , "#8ca252" , "#b5cf6b" , "#cedb9c" , "#8c6d31" , "#bd9e39" , "#e7ba52" , "#e7cb94" , "#843c39" , "#ad494a" , "#d6616b" , "#e7969c" , "#7b4173" , "#a55194" , "#ce6dbd" , "#de9ed6" , "#3182bd" , "#6baed6" , "#9ecae1" , "#c6dbef" , "#e6550d" , "#fd8d3c" , "#fdae6b" , "#fdd0a2" , "#31a354" , "#74c476" , "#a1d99b" , "#c7e9c0" , "#756bb1" , "#9e9ac8" , "#bcbddc" , "#dadaeb" , "#636363" , "#969696" , "#bdbdbd" , "#d9d9d9"];

var scale1 = d3.scale.linear().domain([d3.min(ObjF[clesF[i]]),d3.max(ObjF[clesF[i]])]).range(["white",coul[i]]);

var svg3 = fen.append("svg").classed("svgCell",true)
							.style("height",(bigCellHeight-bigCellHeightMarg+rectTaill)+"px")
							.call(	d3.behavior.zoom()
					                    .scaleExtent([0.1, 30]) 
					                    .on("zoom", zoom1All)
					               )
							.append("g")
							.classed("gZoom",true);

var gg3 = svg3.selectAll("g.svgG")
							.data(ObjF[clesF[i]])
							.enter()
							.append("g")
							.classed("svgG",true);

	gg3.transition().duration(1500).ease("linear")
							.attr("transform", function(d,i) { //console.log(d);
			    	var posId = posInd(i,dimY)	// retourne les indices de pos
			    	return "translate(" + posId[0] * (rectTaill+cellMargin) + "," + posId[1] * (rectTaill+cellMargin) + ")"; });



var cell1 = gg3.append("rect")
				.classed("cellRect",true)
		        .attr("x", rectPadding)
		        .attr("y", rectPadding)
		        .attr("height",function(d,i){
		        try{
		        	//console.log(tabIndTaill[indPostabTaill]["index"]);
		        	if (d && i == tabIndTaill[indPostabTaill3]["index"]) {
		        		//console.log(indPostabTaill3);
		        		indPostabTaill3++;
		        		//console.log(rezScale[indPostabTaill3-1]);
		        		return ((((rezScale[indPostabTaill3-1]))/(100))*rectTaill);
		        	}
		        	else { return 0; }
		        	}
		        catch(e) {}
		        })
		        .attr("width",25)
				.attr("fill", function(d,i){ 
				try{
					if (d && i == tabIndTaill[indPostabTaill]["index"]) {
						indPostabTaill++;
						return scale1(d);}
					else { return "white"}
					}
				catch(e) {}
										});
				//.on("dblclick",function(d,i){foncInfo(ObjF,i);});	//useless si même fct sur le deuxieme rect qui est "au-dessus"

var cell2 = gg3.append("rect")
				.classed("cellRect2",true)
		        .attr("x", rectPadding)
		        .attr("y", rectPadding)
		        .attr("height",25)
		        .attr("width",25)
				.on("dblclick",function(d,i){foncInfo(ObjF,i);});


	//Legend attribut
	var leg = fen.append("div").classed("attName",true)
								.style("height",bigCellHeightMarg+"px");

	leg.transition().duration(3000).ease("bounce")
						.text(function(){ return clesF[i]; });


	indPostabTaill = 0;		// on réinitialise les indices pour traçer les nouveaux attributs
	indPostabTaill2 = 0;	// on réinitialise les indices pour traçer les nouveaux attributs
	indPostabTaill3 = 0;	// on réinitialise les indices pour traçer les nouveaux attributs
	};



	//Boutons de selections pour observer un attribut unique

	appendChoice(clesF,dataUp2,ObjF,confCell);

};