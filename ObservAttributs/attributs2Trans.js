function tracerProp3(dataUp2){

	//On efface pour mieux redessiner =)
	commeNeuf();


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

	//console.log(to1);
	//console.log(to2);

	for (var j in to2) {
		to1[j] = to2[j];
	}
	//console.log(to1);

	var ObjF = to1;

	var clesF = d3.keys(ObjF);
	//console.log(clesF);

	var SumTab = [];
	for (var i in ObjF) {
		SumTab.push(d3.sum(ObjF[i]));
	};

	//console.log(SumTab.length);
	var pie1 = d3.layout.pie();
	var coul1 = ["#393b79" , "#5254a3" , "#6b6ecf" , "#9c9ede" , "#637939" , "#8ca252" , "#b5cf6b" , "#cedb9c" , "#8c6d31" , "#bd9e39" , "#e7ba52" , "#e7cb94" , "#843c39" , "#ad494a" , "#d6616b" , "#e7969c" , "#7b4173" , "#a55194" , "#ce6dbd" , "#de9ed6" , "#3182bd" , "#6baed6" , "#9ecae1" , "#c6dbef" , "#e6550d" , "#fd8d3c" , "#fdae6b" , "#fdd0a2" , "#31a354" , "#74c476" , "#a1d99b" , "#c7e9c0" , "#756bb1" , "#9e9ac8" , "#bcbddc" , "#dadaeb" , "#636363" , "#969696" , "#bdbdbd" , "#d9d9d9" , "#393b79" , "#5254a3" , "#6b6ecf" , "#9c9ede" , "#637939" , "#8ca252" , "#b5cf6b" , "#cedb9c" , "#8c6d31" , "#bd9e39" , "#e7ba52" , "#e7cb94" , "#843c39" , "#ad494a" , "#d6616b" , "#e7969c" , "#7b4173" , "#a55194" , "#ce6dbd" , "#de9ed6" , "#3182bd" , "#6baed6" , "#9ecae1" , "#c6dbef" , "#e6550d" , "#fd8d3c" , "#fdae6b" , "#fdd0a2" , "#31a354" , "#74c476" , "#a1d99b" , "#c7e9c0" , "#756bb1" , "#9e9ac8" , "#bcbddc" , "#dadaeb" , "#636363" , "#969696" , "#bdbdbd" , "#d9d9d9" , "#393b79" , "#5254a3" , "#6b6ecf" , "#9c9ede" , "#637939" , "#8ca252" , "#b5cf6b" , "#cedb9c" , "#8c6d31" , "#bd9e39" , "#e7ba52" , "#e7cb94" , "#843c39" , "#ad494a" , "#d6616b" , "#e7969c" , "#7b4173" , "#a55194" , "#ce6dbd" , "#de9ed6" , "#3182bd" , "#6baed6" , "#9ecae1" , "#c6dbef" , "#e6550d" , "#fd8d3c" , "#fdae6b" , "#fdd0a2" , "#31a354" , "#74c476" , "#a1d99b" , "#c7e9c0" , "#756bb1" , "#9e9ac8" , "#bcbddc" , "#dadaeb" , "#636363" , "#969696" , "#bdbdbd" , "#d9d9d9" , "#393b79" , "#5254a3" , "#6b6ecf" , "#9c9ede" , "#637939" , "#8ca252" , "#b5cf6b" , "#cedb9c" , "#8c6d31" , "#bd9e39" , "#e7ba52" , "#e7cb94" , "#843c39" , "#ad494a" , "#d6616b" , "#e7969c" , "#7b4173" , "#a55194" , "#ce6dbd" , "#de9ed6" , "#3182bd" , "#6baed6" , "#9ecae1" , "#c6dbef" , "#e6550d" , "#fd8d3c" , "#fdae6b" , "#fdd0a2" , "#31a354" , "#74c476" , "#a1d99b" , "#c7e9c0" , "#756bb1" , "#9e9ac8" , "#bcbddc" , "#dadaeb" , "#636363" , "#969696" , "#bdbdbd" , "#d9d9d9"];
	var arc = d3.svg.arc().outerRadius(200).innerRadius(100);

	var tabIndice = [];
	var tabArcs = [];

	//console.log(ObjF);


	var cellsArea = d3.select("div.dessein").append("div").classed("cellsArea",true);
	var cellsArea2 = cellsArea.append("div").classed("cellsArea2",true);




	for (var ind2 = 0; ind2 < Object.size(ObjF)	; ind2++) {

		var fen = cellsArea2.append("div")
				.classed("t"+ind2,true)
				.classed("mapAtt",true)
				.style("top","30px")
				.style("left","30px")
				.style("width","450px")
				.style("height","450px");

/*
				.style("float","left");
				.style("transform","translateX(100px)");
				.style("height",0)
				.style("width", 0)
	fen.transition().duration(2000).ease("bounce")
*/

	
	//On récupère les valeurs non null/undefined avec leur indice
	//console.log(pie1);
	//console.log(ObjF[clesF[ind2]]);
	var tab1 = [];
	var tab2 = [];
	for (var i = 0; i < ObjF[clesF[ind2]].length; i++) {
		var obj = {};
		if (ObjF[clesF[ind2]][i]) { obj.ind = (i+1);
									obj.val = ObjF[clesF[ind2]][i];
									tab1.push(ObjF[clesF[ind2]][i]);
									tab2.push(obj);
									};
	};
	//console.log(tab1);
	//console.log(tab2);
	tabIndice.push(tab2);

	var data9 = pie1(tab1);
	//console.log(data9);


	var scalCoul0 = d3.scale.linear().domain([d3.min(ObjF[clesF[ind2]]),d3.max(ObjF[clesF[ind2]])]).range(["darkred","lightsteelblue"]);




	// On prépare les données pour le bind avec la DOM
	var dataCercl = [];		// tab des startAngle & endAngle
	var ind6 = 0;
	for (var i in data9) {
		var obj3 = {};
		obj3.startAngle = data9[i]["startAngle"];
		obj3.endAngle = data9[i]["endAngle"];
		obj3.indice = tab2[ind6]["ind"];
		dataCercl.push(obj3);
		ind6++;
	};
	//console.log(dataCercl);

    var svg1 = fen.append("svg").classed("grrr",true)

    svg1.append("text")
    		.attr("x","180")
    		.attr("y","225")
    		.attr("font-size","20px")
    		.text(function(){ return clesF[ind2]; });

	var arcs1 = svg1.append("g")
					.attr("transform", "translate(225,225)")
    				.selectAll("path.arc")
					.data(dataCercl)
					.enter();

	var arcs2 = arcs1.append("path")		// on créer l'objet
					.attr("class", "arc")
					.attr("fill", function(d, i){return scalCoul0(tab1[i]);});

					arcs2.transition().duration(2000)	// on lui applique une transition
					.attrTween("d", function (d) { 
						var start = {startAngle: 0, endAngle: 0}; // <-A
						var interpolate = d3.interpolate(start, d); // <-B
						return function (t) {
							return arc(interpolate(t)); // <-C
						};
					});

	tabArcs.push(arcs2);
	//console.log(arcs2);

		arcs2.on("click",function(d){
			//console.log("_____data______");
			//console.log(d);
			//console.log(d.indice);
			foncInfobis(d,ObjF,d.indice-1);	// on lui applique un eventhandler de manière séparer de la transition sinon bog
			});





			/*
			//		Arcs labels
				arcs1.append("text")
				        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
				        .attr("dy", "9px")
				        .attr("text-anchor", "middle")
				        .text(function(d,i) { return tab2[i]["ind"]; });
			*/

									};



									//console.log(tabIndice);
									//console.log(tabIndice[3]);
									//console.log(tabArcs);


	d3.select("#help0").remove();
	d3.select("div.div2Buttons").append("button").attr("id","help0").text("Help");

	document.querySelector("#help0").addEventListener("click",function(){helpUserProp();});



};








function foncInfobis(data,datas,index1) {

		//	On enlève pour mieux redessiner

	d3.select("div.info1bis").remove();		// on supp les anciens elem pour éviter qu'ils se cumulent
	d3.select("div.barGraphbis").remove();		// on supp les anciens elem pour éviter qu'ils se cumulent
	//commeNeufLegend();

	var info1 = d3.select("div.legendG").append("div")
								.classed("info1bis",true);

	info1.append("p").style("font-size","20px")
					.text(" Valeurs des attributs"); // on fait une marge freestyle

	for (var i in datas) {
		var text1 = i + " : " + datas[i][index1];
		info1.append("p").style("font-size","15px").text(text1);

	};

	var valcalc = moyInfo5(datas);
	barchartInfobis(valcalc,datas,index1);

};




function barchartInfobis(dataGen,obj1,index5){
	 
	var attrNames3 = Object.keys(obj1);

	var graph = d3.select("div.legendG2").append("div")
	 						.classed("barGraphbis",true);

	var svg1 = graph.append("svg").classed("barchart",true);

	
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
