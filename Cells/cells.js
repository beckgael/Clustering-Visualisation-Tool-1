function tracerCell(dimY1,rectTaillUser,dataUp2,boolLign) {


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


	var to1,to2;
	to1 = objToAtt(dataUp2[0]);
	to2 = objToAtt(dataUp2[1]);

	//On concatène to1 et to2
	for (var j in to2) {
		to1[j] = to2[j];
	}

	var ObjF = to1;
	var clesF = d3.keys(ObjF);
	var nbElem = ObjF[clesF[0]].length;
	var nbCells = Object.size(ObjF);

	var rectTaill = rectTaillUser;  // 25 de base
	var dimY = dimY1;
	var dimX = Math.floor((nbElem)/dimY)+1;
	var cellMargin = 3;
	var bigCellWidthMarg = 9;
	var bigCellHeightMarg = 50;
	var bigCellWidth = (2*cellMargin)+(dimX*rectTaill)+((dimX-1)*(2*cellMargin))+bigCellWidthMarg;
	var bigCellHeight = (2*cellMargin)+(dimY*rectTaill)+((dimY-1)*(2*cellMargin))+bigCellHeightMarg;
	var rectPadding =  rectTaill;

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


	var scalePropRect = d3.scale.linear().domain([d3.min(tabTaill),d3.max(tabTaill)]).range([20,100]);
	var rezScale = [];

	for (var i = 0; i < tabTaill.length; i++) {
		rezScale.push(scalePropRect(tabTaill[i]));
	};

	//console.log(tabTaill);
	//console.log(rezScale);

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
							.attr("height",(bigCellHeight-bigCellHeightMarg+rectTaill)+"px")
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
			    	return inversLigneColon(boolLign,posId,rectTaill,cellMargin); });


//console.log(tabIndTaill);

var cell1 = gg3.append("rect")
				.classed("cellRect",true)
		        .attr("x", rectPadding)
		        .attr("y", rectPadding)
		        .attr("height",function(d,i){
	        	try{

		        	if (d && i == tabIndTaill[indPostabTaill3]["index"]) {
		        		indPostabTaill3++;
		        		return ((((rezScale[indPostabTaill3-1]))/(100))*rectTaill);
		        	}
		        	else { return 0; }
		        	}
		        catch(e) { /*console.log(e);*/ }
		        })
		        .attr("width",function(d,i){
		        try{
		        	if (d && i == tabIndTaill[indPostabTaill2]["index"]) {
		        		indPostabTaill2++;
		        		return ((((rezScale[indPostabTaill2-1]))/(100))*rectTaill);
		        	}
		        	else { return 0; }
		        	}
		        catch(e) {}
		        	
		        })
				.attr("fill", function(d,i){ 
		        try{
					if (d && i == tabIndTaill[indPostabTaill]["index"]) {
						indPostabTaill++;
						return scale1(d);}
					else { return "white"}
		        	}
		        catch(e) {}
										});
				//.on("dblclick",function(d,i){foncInfo5(ObjF,i);});	//useless si même fct sur le deuxieme rect qui est "au-dessus"


var cell2 = gg3.append("rect")
				.classed("cellRect2",true)
		        .attr("x", rectPadding)
		        .attr("y", rectPadding)
		        .attr("height",rectTaill)
		        .attr("width",rectTaill)
				.on("dblclick",function(d,i){foncInfo5(ObjF,i);});


	//Legend attribut
	var leg = fen.append("div").classed("attName",true)
								.style("height",bigCellHeightMarg+"px");

	leg.transition().duration(3000).ease("bounce")
						.text(function(){ return clesF[i]; });


	indPostabTaill = 0;		// on réinitialise les indices pour traçer les nouveaux attributs
	indPostabTaill2 = 0;	// on réinitialise les indices pour traçer les nouveaux attributs
	indPostabTaill3 = 0;	// on réinitialise les indices pour traçer les nouveaux attributs
	};


	//Bontons d'aides
d3.select("#help0").remove();
d3.select("div.div2Buttons").append("button").attr("id","help0").text("Help");
document.querySelector("#help0").addEventListener("click",function(){helpUserCells();});


	//Boutons de selections pour observer un attribut unique

	appendChoice(clesF,dataUp2,ObjF,confCell);

};


function foncInfo5(datas,index1) {

		//	On enlève pour mieux redessiner

	d3.select("div.info1").remove();		// on supp les anciens elem pour éviter qu'ils se cumulent
	d3.select("div.barGraph").remove();		// on supp les anciens elem pour éviter qu'ils se cumulent
	//commeNeufLegend();

	var info1 = d3.select("div.legendG2").append("div")
								.classed("info1",true);

	info1.append("p")
				.style("text-align","center")
				.style("font-size","20px")
					.text(" Valeurs des attributs"); // on fait une marge freestyle

	for (var i in datas) {
		var text1 = i + " : " + datas[i][index1];
		info1.append("p")
					.style("text-align","left")
					.style("font-size","15px").text(text1);

	};

	var valcalc = moyInfo5(datas);
	barchartInfo(valcalc,datas,index1);

};


function moyInfo5(data2) {

	//console.log(data2);

	var maxVal = [];
	var minVal = [];
	var moyVal = [];
	var medVal = [];
	var rez = [];

	for (var i in data2) {
		maxVal.push(d3.max(data2[i]));
		minVal.push(d3.min(data2[i]));
		moyVal.push(d3.mean(data2[i]));
		medVal.push(d3.median(data2[i]));
	};

	rez.push(maxVal);
	rez.push(minVal);
	rez.push(moyVal);
	rez.push(medVal);


	return rez;
}


function barchartInfo(dataGen,obj1,index5){
	 
	var attrNames3 = Object.keys(obj1);

	var graph = d3.select("div.legendG2").append("div")
	 						.classed("barGraph",true);

	var lgSvg = Object.size(obj1);

	//console.log(dataGen);
	//console.log(obj1);
	//console.log(lgSvg);

	var svg1 = graph.append("svg")
						.classed("barchart",true)
						.attr("height",lgSvg*20 + 150);

	
	for (var index2 = 0; index2 < Object.size(obj1); index2++) {

		//console.log(index2+"_________");
	
	var scale2 = d3.scale.linear().domain([dataGen[1][index2],dataGen[0][index2]]).range([10,300]);
	//console.log(dataGen[1][index2]);
	//console.log(obj1[attrNames3[index2]]);
	var valexam = obj1[attrNames3[index2]][index5];
	//console.log(valexam);

	//MiniLegend
	var mini1 = svg1.append("rect")
						.attr("transform","translate(10,10)")
						.attr("fill","black")
						.attr("fill-opacity",0.7)
						.attr("height","5px")
						.attr("width","40px");

	var mini2 = svg1.append("rect")
						.attr("transform","translate(10,25)")
						.attr("fill","lightsteelblue")
						.attr("fill-opacity",0.7)
						.attr("height","5px")
						.attr("width","40px");

	var mini3 = svg1.append("rect")
						.attr("transform","translate(10,40)")
						.attr("fill","gray")
						.attr("fill-opacity",0.7)
						.attr("height","5px")
						.attr("width","40px");

	var mini4 = svg1.append("rect")
						.attr("transform","translate(10,55)")
						.attr("fill","lightgreen")
						.attr("fill-opacity",0.7)
						.attr("height","5px")
						.attr("width","40px");

	var mini5 = svg1.append("rect")
						.attr("transform","translate(10,70)")
						.attr("fill","red")
						.attr("fill-opacity",0.4)
						.attr("height","20px")
						.attr("width","40px");

	var rect11 = svg1.append("text")
						.attr("font-size","15px")
						.attr("transform","translate(60,"+(10+5)+")")
						.attr("fill","black")
						.text("Maximum");

	var rect12 = svg1.append("text")
						.attr("font-size","15px")
						.attr("transform","translate(60,"+(25+5)+")")
						.attr("fill","black")
						.text("Minimum");

	var rect13 = svg1.append("text")
						.attr("font-size","15px")
						.attr("transform","translate(60,"+(40+5)+")")
						.attr("fill","black")
						.text("Moyenne");

	var rect14 = svg1.append("text")
						.attr("font-size","15px")
						.attr("transform","translate(60,"+(55+5)+")")
						.attr("fill","black")
						.text("Médiane");

	var rect14 = svg1.append("text")
						.attr("font-size","15px")
						.attr("transform","translate(60,"+(80+5)+")")
						.attr("fill","black")
						.attr("height","20px")
						.attr("width","150px")
						.text("Valeur prototype");


	var rectMax = svg1.append("rect")
						.attr("transform",function(){ return "translate(10,"+(100+10+(20*index2))+")";})
						.attr("fill","black")
						.attr("fill-opacity",0.7)
						.attr("height","5px")
						.attr("width",scale2(dataGen[0][index2])+"px");	
	var rectMin = svg1.append("rect")
						.attr("transform",function(){ return "translate(10,"+(100+15+(20*index2))+")";})
						.attr("fill","lightsteelblue")
						.attr("fill-opacity",0.7)
						.attr("height","5px")
						.attr("width",scale2(dataGen[1][index2])+"px");	
	var rectMoy = svg1.append("rect")
						.attr("transform",function(){ return "translate(10,"+(100+20+(20*index2))+")";})
						.attr("fill","gray")
						.attr("fill-opacity",0.7)
						.attr("height","5px")
						.attr("width",scale2(dataGen[2][index2])+"px");
	var rectMed = svg1.append("rect")
						.attr("transform",function(){ return "translate(10,"+(100+25+(20*index2))+")";})
						.attr("fill","lightgreen")
						.attr("fill-opacity",0.7)
						.attr("height","5px")
						.attr("width",scale2(dataGen[2][index2])+"px");

	var rect1 = svg1.append("rect")
						.attr("transform",function(){ return "translate(10,"+(100+10+(20*index2))+")";})
						.attr("fill","red")
						.attr("fill-opacity",0.4)
						.attr("height","20px")
						.attr("width","0px")
						.transition().duration(1500).ease("bounce")
						.attr("width",function(){ 
							if (isNaN(valexam)) { return "0px";}
							else { return scale2(valexam)+"px"; }
							});

	var rect2 = svg1.append("text")
						.attr("font-size","15px")
						.attr("transform",function(){ return "translate(350,"+(100+30+(20*index2))+")";})
						.attr("fill","black")
						.attr("height","20px")
						.attr("width","150px")
						.text(attrNames3[index2]);
	};

};




function appendChoice(attNames,dataF,dataF2,confCell){

	var modifArea = d3.select("div.boutonsSup").append("div").classed("modifArea",true);


	modifArea.append("input").attr("id","dimYCells")
							.attr("type","text")
							.attr("value","Entrez la dimension désirée 1<x");

	modifArea.append("input").attr("id","cellsSize")
							.attr("type","text")
							.attr("value","Entrez la card de cellule désirée 1<x<50");

	modifArea.append("button")
				.attr("id","ValidChoice")
				.text("Effectuer les changements");

	document.querySelector("#ValidChoice").addEventListener("click",function(){ ModifDimSizeCells(dataF); });


	var choiceB = d3.select("div.legendG").append("div").classed("choiceAtt",true);
	var divChoixDeroulantAtt = choiceB.append("div").classed("divChoixDeroulantAtt",true);
	var selectAtt1 = divChoixDeroulantAtt.append("select").attr("id","selectAtt1")
												.attr("size","5");
	
for (var clee in confCell) { 
		if (clee == "dimX") { /* console.log("On ne touche pas à dimX") */ }
		else if (clee == "dimY") { /* console.log("On ne touche pas à dimY") */ }
		else { confCell[clee] *= 3; }
							};

	for (var i = 0; i < attNames.length; i++) {

	var unAtt = selectAtt1.append("option")
							.classed("attButtons",true)
							.attr("id","butAtt"+i)
							.attr("value",attNames[i]);

						unAtt.text(attNames[i]);
						/*
						unAtt.on("change",function(){ 
							console.log("yoyyy")
							showUniqAtt(this.value,dimY,dataUp2); });
						*/
/*
	var butt = document.getElementById("butAtt"+i);
	//butt.onclick = showUniqAtt(attNames[i],dataF);		//oldschool methode
	butt.addEventListener('click',function(e){
											//console.log(e);
											//console.log(this);
											showUniqAtt(this.value,dataF2,confCell);
											 }
					,false);
	//console.log(butt);
*/
	};

	var leSelect = document.getElementById("selectAtt1");
/*

	leSelect.addEventListener('onchange', function(el){
    var options = this.children;
    console.log(options);
    for(var i=0; i < this.childElementCount; i++){
        options[i].style.color = '#79bbff';
    }
    var selected = this.children[this.selectedIndex];
        selected.style.color = 'red';
    }, false);
*/
	var butAct =  choiceB.append("button").attr("class","b1")
													.attr("size","5")
													.attr("id","Activation");
		butAct.text("Activer selection");

		butAct.on("click",function() {

	//console.log(leSelect);
	
	var tabElemSelect = [];

	for (var i = 0; i < leSelect.options.length; i++) {
		if (leSelect.options[i].selected) { 
			tabElemSelect.push(i) };
	};
	//console.log(tabElemSelect);
	
	showUniqAtt(attNames[tabElemSelect[0]],dataF2,confCell);




	});


	d3.select("div.boutonsSup").append("button")
								.classed("lignCol",true)
								.on("dblclick",function(){ tracerCell(confCell.dimY,confCell.rectTaill,dataF,true);})
								.text("dblclick : By Column");
	d3.select("div.boutonsSup").append("button")
								.classed("lignCol",true)
								.on("dblclick",function(){ tracerCell(confCell.dimY,confCell.rectTaill,dataF,false);})
								.text("dblclick : By Raw");



};




function showUniqAtt(attName,ObjF,confCell){

	commeNeufsansLeg();
	//console.log(attName);
	//console.log(ObjF);
	//console.log(ObjF[attName]);



var cellsArea = d3.select("div.dessein").append("div").classed("cellsArea",true);
var cellsArea2 = cellsArea.append("div").classed("cellsArea2",true);

var fen = cellsArea2.append("div")
				.classed("mapAtt",true)
				.style("height",0)
				.style("width", 0)
				.style("top","30px")
				.style("left","30px");

	fen.transition().duration(2000).ease("bounce")
								.style("width",confCell.bigCellWidth+"px")
								.style("height",confCell.bigCellHeight+confCell.rectTaill+"px");

var scale1 = d3.scale.linear().domain([d3.min(ObjF[attName]),d3.max(ObjF[attName])]).range(["white","darkblue"]);

var svg3 = fen.append("svg").classed("svgCell",true)
							.style("height",(confCell.bigCellHeight-confCell.bigCellHeightMarg+confCell.rectTaill)+"px")
							.call(	d3.behavior.zoom()
					                    .scaleExtent([0.1, 10]) 
					                    .on("zoom", zoom11)
					               )
							.append("g")
							.classed("gZoom",true);

var gg3 = svg3.selectAll("g.svgG")
							.data(ObjF[attName])
							.enter()
							.append("g")
							.classed("svgG",true);

	gg3.transition().duration(2000).ease("bounce")
							.attr("transform", function(d,i) { //console.log(d);
			    	var posId = posInd(i,confCell.dimY)	// retourne les indices de pos
			    	return "translate(" + posId[0] * (confCell.rectTaill+confCell.cellMargin) + "," + posId[1] * (confCell.rectTaill+confCell.cellMargin) + ")"; });

var cell1 = gg3.append("rect")
				.classed("cellRect",true)
		        .attr("x", confCell.rectPadding)
		        .attr("y", confCell.rectPadding)
		        .attr("height",confCell.rectTaill)
		        .attr("width",confCell.rectTaill)
				.attr("fill",function(d){ 
					if (d) {return scale1(d);}
					else { return "white"}
										})
				//.on("dblclick",function(d,i){foncInfo5(ObjF,i);});


var cell2 = gg3.append("rect")
				.classed("cellRect2",true)
		        .attr("x", confCell.rectPadding)
		        .attr("y", confCell.rectPadding)
		        .attr("height",confCell.rectTaill)
		        .attr("width",confCell.rectTaill)
				.on("dblclick",function(d,i){foncInfo5(ObjF,i);});

	//Legend attribut
	var leg = fen.append("div").classed("attName",true)
								.style("height",confCell.bigCellHeightMarg+"px");

	leg.transition().duration(3000).ease("bounce")
						.text(function(){ return attName; });


}



function ModifDimSizeCells(data){

	var htmlElem = document.getElementById("dimYCells");
	var val1 = htmlElem.value;
	val1 = +val1;
	var htmlElem2 = document.getElementById("cellsSize");
	var val2 = htmlElem2.value;
	val2 = +val2;
	//console.log(val1);


	if (isNaN(val1) && isNaN(val2)) { tracerCell(10,25,data); }
	else if (isNaN(val1) && !isNaN(val2)) { tracerCell(10,val2,data); }
	else if (!isNaN(val1) && isNaN(val2)) { tracerCell(val1,25,data); }
	else { tracerCell(val1,val2,data); }

};




function zoom11() {
    d3.select(".gZoom").attr("transform", "translate(" 
        + d3.event.translate 
        + ")scale(" + d3.event.scale + ")");
};

function zoom1All() {
    d3.selectAll(".gZoom").attr("transform", "translate(" 
        + d3.event.translate 
        + ")scale(" + d3.event.scale + ")");
};










function propagEventDeg(){

	//Pb viens des svg

	var cells = document.getElementsByClassName('mapAtt');
	console.log(cells);	// [item: function]
	console.log(cells[0]);	//	undefined
	console.log(cells.item(0));	//	none
	console.log(cells.length);	//  0

	var cells2 = document.querySelectorAll(".mapAtt");
	console.log(cells2);	// [item: function]
	console.log(cells2[0]);	//	undefined
	console.log(cells2.item(5));	//	none
	console.log(cells2.length);	//  0


};


