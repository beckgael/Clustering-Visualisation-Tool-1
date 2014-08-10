//Fonction de base pour avoir le nombre d'élement d'un objets <=> sont nombre de clé
//
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};







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


// selectionnne les attribut de types VN
function elagage(tab3){
  var reZ = new Array();
  for (var i = 0; i < tab3[0].length; i++) {
    if (typeof tab3[0][i] === "number") {}
    else reZ.push(i);
  };
  return reZ;
}


//USELESS
function placeCel(index1){
  var index2 = index1%10; 
  var index3 = Math.floor(index1/10);
  for (var i = 0; i < 10; i++) {
    for (var u = 0; u < 10; u++) {
      var str = index2+""+index3;
      var str2 = parseInt(str,10);
      console.log(str2);

      if (i == index3 && u == index2) { return str2;};
    };
  };
};


// USELESS
function recupClesObj(obj){

  var rez = [];
 for (var cle in obj) {
  rez.push(cle)
 }

 return rez;

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


// transforme une chaine de caractère représentant un nombre au format scientifique en format décimal interpretable par la machine
/*
Accepte les formates suivants
Le e/E symbolise 10^
xxx
xxxE+xxx
xxxE-xxx
xxxExxx
XXXe+XXX
XXXe-XXX
XXXeXXX
*/
function scientToDecimal(str1) {
  var strCopy = str1;
  var tabRez = [];



  if (/e/i.test(strCopy) == true) {

    var rez1 = strCopy.match(/e/i);

    tabRez.push(strCopy.slice(0,rez1.index)); // on prend la partie avant le E
    strCopy = str1;       // on réinitie la chaine pour new traitements
    
    if (strCopy[rez1.index+1] == "+") {
      tabRez.push(strCopy.slice(rez1.index+2,strCopy.lenght));
      return tabRez[0]*Math.pow(10,tabRez[1]);
    }
    else if (strCopy[rez1.index+1] == "-") {
      tabRez.push(strCopy.slice(rez1.index+2,strCopy.lenght));
      return tabRez[0]*(1/Math.pow(10,tabRez[1]));
    }
    else {
      tabRez.push(strCopy.slice(rez1.index+1,strCopy.lenght));
      return tabRez[0]*Math.pow(10,tabRez[1]);
    }
  
  }

  else { return +str1; }
  
}






function parseDataMathlab(data1) {

  var data = data1[0],
    dataRez = [],
    indicAttLign;
  //console.log(data);
  //console.log(data.match(regex1)[0]);

  //On extrait le nom des attributs
  indicAttLign = data.indexOf("\n");
  var strAtt1 = data;
    strAtt1 = strAtt1.slice(0,indicAttLign);
    //console.log(strAtt1);
    data = data.slice(indicAttLign+1,data.length);
    //console.log(data);




  var nbLign = nbLignes(data);
  var nbAtt = nbAttributs(data);

  var attNames = strAtt1.split(" ",nbAtt);
  //console.log(attNames);
  //console.log(nbLign,nbAtt);
  //console.log(data);

  // On s'occupe de la dernière car on sais pas ce qui se passe avec la méthode ci-dessous
  var indexLastLigne = data.lastIndexOf("\n"),
    cpdata = data;
    cpdata = cpdata.slice(indexLastLigne+1,cpdata.length)
    //console.log(cpdata);



  // On s'occupe des n-1 premières ligne
  for (var i = 0; i < nbLign-1; i++) {
    dataRez.push(new Array());

    var indexLigneVide = data.indexOf("\n"),
      datacp2 = data;
      datacp2 = datacp2.slice(0,indexLigneVide)
      if (datacp2.indexOf(" ") == -1) {
          var indexLigne3 = data.indexOf("\n");
          indexLigne3++;
          data = data.slice(indexLigne3,data.length);
      }
      else{
          dataRez[i] = data.split(" ",nbAtt);
          // on s'occupe des NbAtt-1 premiers attributs car il ne finise pas par "\n"
          for (var j = 0; j < nbAtt-1; j++) {
            dataRez[i][j] = stringScientToDecimal(dataRez[i][j]);
          };

          //on s'occupe du dernier attribut en excluant le "\n" de fin de ligne
          var indexLigne = dataRez[i][nbAtt-1].indexOf("\n");
          dataRez[i][nbAtt-1] = dataRez[i][nbAtt-1].slice(0,indexLigne);
          dataRez[i][nbAtt-1] = stringScientToDecimal(dataRez[i][nbAtt-1]);

          var indexLigne2 = data.indexOf("\n");
          indexLigne2++;
          data = data.slice(indexLigne2,data.length);
        }

  };

    //console.log(data); pk la derniere ligne disparait partiellement
    // Surement car je coupé à data.length-1 au lieu de data.lengh, toute façon c'est mieux comme ça car dernière ligne pas de "\n"
    // on prend la dernière ligne récupèrer plus haut avec cpdata pour la traiter comme ci-dessus
    dataRez.push(new Array());
    dataRez[i] = cpdata.split(" ",nbAtt);
    for (var j = 0; j < nbAtt; j++) {
      dataRez[i][j] = +dataRez[i][j]
    };

    //console.log(dataRez);

    var dataRez2 = [attNames,dataRez]
    console.log(dataRez2);
    return dataRez2;
}


//  Compte le nombre de ligne d'un fichier résultat mathlab. IL EST NECESSAIRE DE NE PAS AVOIR DE LIGNE SUPLÉMENTAIRE EN DEBUT/FIN DE FICHIER
// data1 = string
function nbLignes(data1) {
  var cpt = 0,
    r1 = -1;
  do {
      r1 = data1.indexOf("\n",r1+1)
      //console.log(r1)
      cpt++ ;
    } while (r1 != -1)
  cpt;
  //console.log(cpt);
  return cpt;
};


// Compte le nombre d'attribut dans un fichier mathlab en supposant que le dernier attribut ne soit pas suivi d'un espace et que les attributs de la premières ligne soit séparé d'un seul espace !
// objet sans espace
function nbAttributs(data1) {

  var indexL1 =  data1.indexOf("\n"),
    strL1 = data1.slice(0,indexL1), // on extrait la première ligne pour y compter les attributs
    cpt = 0,
      posEsp = 0,
      oldPosEsp;
    //console.log(strL1)
  while (posEsp != -1) {

      oldPosEsp = posEsp;
      posEsp = strL1.indexOf(" ",posEsp+1)
      if (posEsp-oldPosEsp >= 1 ) {cpt++};
  
  }
  cpt++
  //console.log(cpt);
  return cpt++
};

