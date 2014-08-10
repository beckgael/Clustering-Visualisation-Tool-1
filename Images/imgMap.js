function imgMap() {

	commeNeuf();

	var nbCells = 6;
	var lala;
	if (nbCells <= 100) { lala = 25 }
	else if (100 < nbCells <= 200) { lala = 20 }
	else if (200 < nbCells <= 400) { lala = 15 }

	var dimY1 = 10;


	var rectTaill = 25;  // 25 de base
	var dimY = dimY1;
	var dimX = Math.floor((100)/dimY)+1;
	var cellMargin = 1;
	var bigCellWidthMarg = 9;
	var bigCellHeightMarg = 50;
	var bigCellWidth = (2*cellMargin)+(dimX*rectTaill)+((dimX-1)*(2*cellMargin))+bigCellWidthMarg;
	var bigCellHeight = (2*cellMargin)+(dimY*rectTaill)+((dimY-1)*(2*cellMargin))+bigCellHeightMarg;
	var rectPadding =  rectTaill;
	//(15+bigCellWidthMarg);
	//console.log(bigCellHeight);



	for (var i = 0; i < nbCells; i++) {

	var fen = d3.select("div.dessein")
				.append("div")
				.classed("t"+i,true)
				.classed("mapAtt",true)
				.style("height",0)
				.style("width", 0)
				.style("top","30px")
				.style("left","30px");

		fen.transition().duration(1500).ease("linear")
			.style("width",bigCellWidth+"px")
			.style("height",bigCellHeight+rectTaill+"px");



		fen.append("img")
		.attr("height","200px")
		.attr("width","200px")
		.attr("src",function(){ return "Images/imgs/"+(i+1)+".jpg";});


		fen.append("div").text("Image "+(i+1));


								}
};
