function parraCoord2() {

    //On efface pour mieux redessiner =)
    commeNeuf();


  //var clusters = ["ClusterN1","ClusterN2","ClusterN3","ClusterN4","ClusterN5","ClusterN6","ClusterN7","ClusterN8","ClusterN9","ClusterN10","ClusterN11","ClusterN12","ClusterN13","ClusterN14","ClusterN15","ClusterN16"],
  var traits = ["Nbpiecs","Cdqualp","Cdhabit","Cdresid"];

var m = [80, 160, 200, 160],
    w = 1280 - m[1] - m[3],
    h = 800 - m[0] - m[2];

var x = d3.scale.ordinal().domain(traits).rangePoints([0, w]),
    y = {};

var coul = d3.scale.linear().domain([0,50]).range(["red","blue"]);

var line = d3.svg.line(),
    axis = d3.svg.axis().orient("left"),
    foreground;

var svg = d3.select("div.dessein")
            .append("div")
            .classed("parraCoord",true)
            .append("svg")
            .classed("parraCoordSVG",true)
            //.attr("width", w + m[1] + m[3])
            //.attr("height", h + m[0] + m[2] + 200)
            .append("g")
            .classed("parraCoordSVGg",true)
            .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

d3.csv(
  //"../../data/prototype.csv"
  "Data/data4.csv"
  , function(flowers) {

      //On récupère la valeur taille des prototypes
    d3.csv("Data/data3.csv", function(data5){ 
    var t1 = extra13(data5);
    var tabTaille = t1[1]     //On récupère la valeur taille des prototypes
    //console.log(tabTaille);


  //console.log(flowers);

  // Create a scale and brush for each trait.
  traits.forEach(function(d,i) {
    //console.log(d + " : " + i);
       // Coerce values to numbers.
    flowers.forEach(function(p) { 
                                  //console.log(p[d]); //valeur texte
                                  p[d] = +p[d];
                                  //console.log(p[d]); //valeur int
                                 });

    y[d] = d3.scale.linear()
        .domain(d3.extent(flowers, function(p) { return p[d]; }))
        .range([h, 0]);

    y[d].brush = d3.svg.brush()
        .y(y[d])
        .on("brush", brush);
 });


  
  //console.log(flowers);
  // On ajoute l'attribut taille associé à chaque prototype
  for (var i = 0; i < flowers.length; i++) {
    flowers[i].taille = tabTaille[i];
  };

  var tabTailleSansZero = [];
  for (var i = 0; i < tabTaille.length; i++) {
    if (tabTaille[i] == 0) {}
    else { tabTailleSansZero.push(tabTaille[i]); }
  };
  //console.log(tabTailleSansZero);

  var flowers2 = [];

  for (var i = 0; i < flowers.length; i++) {
    if (flowers[i].taille == 0) {}
    else { flowers2.push(flowers[i]);}
  };

var coul = d3.scale.log().domain([d3.min(tabTailleSansZero),d3.max(tabTailleSansZero)]).range(["red","blue"]);


  // Add foreground lines.
  foreground = svg.append("g")
      .attr("class", "foreground")
    .selectAll("path")
      .data(flowers2)
    .enter().append("svg:path")
      .attr("d", path)
      .style("stroke", function(d){ return coul(d.taille); });

      //Si on joue avec l'opacité, on perd le changement d'opacité lors de la selection
      /*
      .style("stroke-opacity",function(d){
        if (d.taille == 0) { return "0.15"; }
        else { return "1"; }       
      });
      */

  // Add a group element for each trait.
  var g = svg.selectAll(".trait")
      .data(traits)
    .enter().append("svg:g")
      .attr("class", "trait")
      .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
      .call(d3.behavior.drag()
      .origin(function(d) { return {x: x(d)}; })
      .on("dragstart", dragstart)
      .on("drag", drag)
      .on("dragend", dragend));

  // Add an axis and title.
  g.append("svg:g")
      .attr("class", "axis")
      .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
    .append("svg:text")
      .attr("text-anchor", "middle")
      .attr("y", -9)
      .text(String);

  // Add a brush for each axis.
  g.append("svg:g")
      .attr("class", "brush")
      .each(function(d) { d3.select(this).call(y[d].brush); })
    .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);

  function dragstart(d) {
    i = traits.indexOf(d);
  }

  function drag(d) {
    x.range()[i] = d3.event.x;
    traits.sort(function(a, b) { return x(a) - x(b); });
    g.attr("transform", function(d) { return "translate(" + x(d) + ")"; });
    foreground.attr("d", path);
  }

  function dragend(d) {
    x.domain(traits).rangePoints([0, w]);
    var t = d3.transition().duration(500);
    t.selectAll(".trait").attr("transform", function(d) { return "translate(" + x(d) + ")"; });
    t.selectAll(".foreground path").attr("d", path);
  }

}); 
});

// Returns the path for a given data point.
function path(d) {
  return line(traits.map(function(p) { return [x(p), y[p](d[p])]; }));
                }

// Handles a brush event, toggling the display of foreground lines.
function brush() {
  var actives = traits.filter(function(p) { return !y[p].brush.empty(); }),
      extents = actives.map(function(p) { return y[p].brush.extent(); });
  foreground.classed("fade", function(d) {
    return !actives.every(function(p, i) {
      return extents[i][0] <= d[p] && d[p] <= extents[i][1];
    });
  });
}


//Add legend

d3.select("div.legendG").append("div")
                        .style("height","20%")
                        .style("width","99%")
                        .style("font-size","20px")
                        .text("Les traits suivent une echelle logarithmique croissante du rouge vers le bleu.");

d3.select("div.legendG").append("div")
                        .style("height","30%")
                        .style("width","99%")
                        .style("font-size","20px")
                        .text("Vous pouvez sélectionner des portions des différents axes afin de mettre en relief les prototypes inclus dans la selection.");

d3.select("div.legendG").append("div")
                        .style("height","20%")
                        .style("width","99%")
                        .style("font-size","20px")
                        .text("Vous pouvez également déplacer les axes les uns par rapport aux autres.");

d3.select("div.legendG2").append("div").classed("legendDeg",true);


};

