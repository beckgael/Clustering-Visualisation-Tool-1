//Fonction de base pour avoir le nombre d'élement d'un objets <=> sont nombre de clé
//
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};






// Works nicely
//  to upgrade
function tabScale(tab2,domain,nbAttr) {

  var reZ = new Array();

  for (var cp1 = 0; cp1 < tab2.length; cp1++) {

    // Si tab de VN alors on créer une échelle
    if (typeof tab2[cp1][0] === "number") {
      //console.log(d3.max(tab2[cp1]));
      var scaleZ = d3.scale.linear().domain([0,d3.max(tab2[cp1])]).range([0,domain]);
      reZ.push(scaleZ);
                  }

    // Sinon c'est des chaine de caractère, on ajoute un 0;
    else reZ.push(0);
  };


  //console.log(reZ);
  return reZ;
};


function tabScaleDeg(tab2,nbAttr,couleurmax,index1) {

  //console.log(tab2);
      var scaleZ = d3.scale.linear().domain([d3.min(tab2[index1]),d3.max(tab2[index1])]).range(["white",couleurmax]);
      return scaleZ;
};




  //  Supprime les zone de dessein et de légend et les remets en place (vierge)
function commeNeuf() {

d3.select("div.dessein").remove();
d3.select("div.legendGsocle").remove();
d3.select("div.legendG2socle").remove();
d3.select("div.boutonsSup").remove();


d3.select("div.dessein0").append("div").classed("dessein",true);
d3.select("div.buttonsArea").append("div").classed("boutonsSup",true);

var legendSocle = d3.select("div.legend0").append("div").classed("legendGsocle",true);

var legendSocle2 = d3.select("div.generalSocle").append("div").classed("legendG2socle",true);

legendSocle.append("div").classed("legendTitle1",true)
              .text("Légende");


legendSocle2.append("div").classed("legendTitle1",true)
                  .text("Informations complémentaires");

legendSocle.append("div").classed("legendG",true);
legendSocle2.append("div").classed("legendG2",true);


};

function commeNeufsansLeg() {

d3.select("div.dessein").remove();
d3.select("div.dessein0").append("div").classed("dessein",true);

};


  //  useless   cassdedi circles
function commeNeufLegend(){

d3.select("div.legendG2").remove();

var legendSocle2 = d3.select("div.legendBase").append("div").classed("legendG2",true);

legendSocle2.append("div").classed("titreLegendSocle",true)
                  .text("Légende");

};



// Créer les index de position à partir de l'indice de l'objet
function posInd(indice,nbCaseHor) {
  var rep1 = [];
  var t1 = Math.floor(indice/nbCaseHor);
  var t2 = indice%nbCaseHor;
  //console.log(t1);
  //console.log(t2);
  rep1.push(t1,t2);
  //console.log(rep1);
  return rep1;
};




function objToAtt(tab){

  var res = {}
  var attNames = d3.keys(tab[0]);

  for (var i = 0; i < attNames.length; i++) {

    res[attNames[i]] = [];
    
    for (var j = 0; j < tab.length; j++) {
        res[attNames[i]].push(tab[j][attNames[i]]);
      };  

  };

  return res;

}