
function foncInfo(datas,index1) {

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

