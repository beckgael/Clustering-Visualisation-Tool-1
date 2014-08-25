/* 
***********************************************
  USEFULL FUNCTION FOR THE USELESS FUNCTION
***********************************************
*/


//Clone un obj sans faire de lien
//Sert uniquement dans ce fichier
function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}


/*
***********************************************************
    END OF THE USEFULL FUNCTION FOR THE USELESS FUNCTION
***********************************************************
*/





// on formatte les données de façon à obtenir des tableaux composés des
// valeurs d'un attribut sous forme de réel et non de string
//Gere automatiquement les attribut string
function extra12(dAtA){
  //console.log(dAtA);
  var reZZ = [];
  var cLeS = d3.keys(dAtA);
  var cle1 = cLeS[0];

  var lg = Object.size(dAtA[cle1]);
  for (var u = 0; u < lg; u++) {
                                reZZ[u] = new Array();
                                };

  for (var i in dAtA) {
    //console.log("_____________");
   //console.log(dAtA[i]);
    var obj = clone(dAtA[i]);
    //console.log(obj);
    for (var j in obj) {
                      var cLeS2 = d3.keys(obj);
                      //console.log(cLeS2);
                      //console.log(j);

                      for (var v = 0; v < lg; v++) {
                        //console.log(lg)
                        //console.log(j);
                        //console.log(cLeS2[v]);
        //if (j.localeCompare(cLeS2[v]) == 0){console.log("MATCH");}
                       if (j.localeCompare(cLeS2[v]) == 0)  {
                  //    console.log("************");
                    // console.log(dAtA[0][cLeS2[v]]); 
                       var valatt = clone(obj[cLeS2[v]]);
                       //console.log(valatt);
                       valatt = +valatt;
                        //console.log("*****____******_____*********");
                       //console.log(valatt);
                      //  console.log("*****____******_____*********");


                            if (typeof valatt === "number") {
                              /*
                                                  console.log(obj[j]);
                                                  obj[j] = + obj[j];    // coerce values
                                                  console.log(obj[j]);
                                                  //console.log(reZZ[v]);                              
                                */
                                                  reZZ[v].push(valatt);
                                                                }
                            else { 
                            console.log("**************");
                            console.log(obj[j]);
                           reZZ[v].push(obj[j]); // il faut encore grinoter les "  " = les blancs
                                  //console.log(reZZ[v]); 
                                }
                                                             };
                                                  };     
                      };
                     };

  //console.log(reZZ);

  return reZZ;

};



// Regarde si val est présent dans tab
function areYouHere(val,tab) {
  for (var i = 0; i < tab.length; i++) {
    if (tab[i] == val) { return true};
  };
  return false;
};




// on formatte les données de façon à obtenir des tableaux composés des
// valeurs d'un attribut sous forme de réel et non de string
//Gere automatiquement les attribut string
function extra13(dAtA){
  //console.log(dAtA);
  var reZZ = [];
  var cLeS = d3.keys(dAtA);
  var cle1 = cLeS[0];

  var lg = Object.size(dAtA[cle1]);
  for (var u = 0; u < lg; u++) {
                                reZZ[u] = new Array();
                                };

  for (var i in dAtA) {
    //console.log("_____________");
   //console.log(dAtA[i]);
    var obj = clone(dAtA[i]);
    //console.log(obj);
                      var ind1 = 0;
    for (var j in obj) {
                      var cLeS2 = d3.keys(obj);
                      //console.log(cLeS2);
                      var val = clone(obj[j]);
                      val = +val;
                      //console.log(val);
                      var val2 = val.toString();
                      if (typeof val === "number" && val2.localeCompare("NaN") != 0 ){
                         reZZ[ind1].push(val);
                      }
                      else {  
                        reZZ[ind1].push(obj[j]); };
                      ind1++;
                    }
                  };
                  return reZZ;
};


//Uniquement les attributs VN, pas de string
function extra31(dAtA){
  var reZZ = [];
  //console.log(dAtA);
  for (var j in dAtA) {
    if ( typeof dAtA[j][0] === "number") { reZZ.push(dAtA[j]); };
  };
  return reZZ;
};

// On transforme l'objet original en tableau en transformant les string int en int
// L'aspect original de l'objet est conserver
function extra22(dAtA){

  var reZZ = [];
  var taille = dAtA.length;
  //console.log(taille);
  var cLeS = d3.keys(dAtA);
  var cle1 = cLeS[0];
  //console.log("cle1 = " + cle1);
  //console.log(dAtA);
  //console.log(dAtA[cle1]);
  var dimObj = Object.size(dAtA);  // dimension des donnés
  //console.log(" taille2 = " + taille2);
  var tabIndString = new Array();
  var cleString = d3.keys(dAtA[0]); // Nom des atrributs
  //console.log(cleString);

  //On cherche les indices des string, en utilisant le premier objet
  var obj2 = clone(dAtA[0]);
  //console.log(obj2);
  for (var cle6 in obj2) {
    obj2[cle6] = +obj2[cle6];
  };
  //console.log(obj2);
  //console.log(dAtA[0]);
  var posStr = 0;
  for (var cle5 in obj2) {
    //console.log(cle5);
    //console.log(obj2[cle5]);
    if (isNaN(obj2[cle5])) {
      tabIndString.push(posStr);    //On ajoute un indice de string
    }
    posStr++;
  }
  //console.log(tabIndString);


  //On créer le tableau renvoyé avec autant d'élèment que dans l'objet original
  for (var i = 0; i < dimObj; i++) {
    reZZ[i] = new Array();
  };
  //console.log(reZZ);


  for ( var j in dAtA) {

    //console.log(j);
    //console.log(dAtA[j]);
    var indexStringTest = 0;
    for ( var u in dAtA[j]) {
      var obj1 = dAtA[j];
      //console.log(obj1);
      var cLeS2 = d3.keys(obj1);
      //console.log(cLeS2[indexString]);
      //console.log(cLeS2[4]);
      //console.log(u);
      //console.log(dAtA[j][u]);
      //console.log("\n");

     if (areYouHere(indexStringTest,tabIndString))  { 
      reZZ[j].push(obj1[u]);    // c'est un attribut de type string, on ne le modifie pas
                                                    }
     else {
      obj1[u] = +obj1[u]; // coerce values
      reZZ[j].push(obj1[u]);
           }
      indexStringTest++;
                             }

                      }
  //console.log(reZZ);
  return reZZ;

};





// USELESS
// ???? n'apparait qu'ici
function yoInd(){


  var data = [];
  var posId = [];
  var xx = 7;
  var yy = 10;

  for (var i = 0; i < 100; i++) { data.push(i) }

  console.log(data);


  for (var i = 0; i < data.length; i++) {
    var pInd = {};
    pInd.x = Math.floor(i/yy);
    pInd.y = i%yy;
    posId.push(pInd);
  }

  console.log(posId);


};








// Gèrer l'upload des matrices d'adjacences
// useless
function upldMatAdj() {

  commeNeuf();


  d3.select("div.boutons2Base").remove();
  d3.select("div.boutonsSup").remove();
  d3.select("div.buttonsArea").append("div").classed("boutons2Base",true);
  d3.select("div.buttonsArea").append("div").classed("boutonsSup",true);


  var UpldButtonZ = d3.select("div.boutons2Base").append("div")
                          .classed("UplArea",true);

  var divUp1 = UpldButtonZ;

  divUp1.text("Fichier Matrice Adjacence");
  divUp1.append("input").attr("id","myfile")
              .classed("input0",true)
              .attr("type","file")  // on indique qu'on cherche un fichier
              .attr("accept","text/json");


  UpldButtonZ.append("button")
          .attr("id","validF")
          .text("Valider la selection")

  var bouttonF = document.querySelector('#validF');
  var boutton1 = document.querySelector('#myfile');

  var dataF = [];


  /*
Idéalement il faut gérer l'exécution de la function finale sur les donnés dl/traitées
en function de la vitesse d'upload, cependant on peux penser qu'il s'agit de fichier csv
de taille < 1mo et donc "immédiatement" upl et donc functionFinale est exéc par B2
  */
  bouttonF.onclick = function(e) {


    var reader = new FileReader();
    reader.onload = function() { 

      //traitDataJson1(reader.result);
      dataF.push(reader.result);  // on insérer dans dataF le tab des valeurs du fichier upldé
      //console.log(dataF);
      matriAdjVisu(dataF);
     };
    reader.readAsText(boutton1.files[0]);

  };

}


//  Seconde P, après upload mat adj
// useless

function matriAdjVisu(data) {

  //console.log(data);
  var obj = $.parseJSON(data);  // on parse le fichier JSON en array JS à l'aide de Jquery
  console.log(obj);

  commeNeuf();
  d3.select("div.boutons2Base").remove();
  d3.select("div.boutonsSup").remove();
  d3.select("div.buttonsArea").append("div").classed("boutons2Base",true);
  d3.select("div.buttonsArea").append("div").classed("boutonsSup",true);

  var div2Buttons = d3.select("div.boutons2Base").append("div").classed("div2Buttons",true);


  var NewUpload = div2Buttons.append("button").attr("id","NewUpload");
    NewUpload.text("New Upload");
    NewUpload.on("click",function(d){ choixUpldFichierCsvOuPas(); });

  var help0 = div2Buttons.append("button").attr("id","help0");
    help0.text("Help");
    //help0.on("click",function() { aideUser(); });


  visuMatAdj(obj);

};








// Circles function
// Useless 
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

//Useless
// selectionnne les attribut de types VN
function elagage(tab3){
  var reZ = new Array();
  for (var i = 0; i < tab3[0].length; i++) {
    if (typeof tab3[0][i] === "number") {}
    else reZ.push(i);
  };
  return reZ;
}
