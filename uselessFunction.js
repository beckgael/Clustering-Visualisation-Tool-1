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



