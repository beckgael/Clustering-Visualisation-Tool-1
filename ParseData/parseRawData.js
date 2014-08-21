
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





// transforme un fichier csv en un tableau de tableau
// N'ACCEPTE QUE DES VALEURS NUMÉRIQUES COMME ATTRIBUT
// N'ACCEPTE PAS ENCORE DES ATTRIBUTS STRING
function traitDataCsv(data) {

  //console.log(data);

  var tab1 = [],
  ind = 0,
  ind2,
  arr,
  unAtt = 0;
  var regex1 = /,[a-zA-Z0-9]*\n/
  var regex2 = /[a-zA-Z0-9]*\n/
  var regex3 = /\n/

  //console.log(data.search(regex1))  // si =-1 il y a un attribut dans le fichier
  //console.log(data.search(regex2))
  //console.log(data.search(regex3))

  // on met dans tab1 chaque ligne du fichier
  while (arr != -1) {

  ind2 = ind;
  ind = data.indexOf("\n",ind);
  //console.log(ind);
  tab1.push(data.substring(ind2,ind));

  //Quand on arrive à la dernière ligne ind = -1
  if (ind == (-1)) { 
            arr = -1; // on prépare la fin du while
            tab1.pop(); // on éjecte le dernier élément fictif vu qu'il n'y pas de "\n"
            tab1.push(data.substring(ind2,data.length)) // on met la denière ligne dans tab1
          };
    ind++;
  }

  //console.log("tab1=",tab1);

  arr=ind=0;

  var tab2 = [];

  for (var i = 0; i < tab1.length; i++) {
    tab2.push(new Array());
      while (arr != -1) {
            ind2 = ind;
            ind = tab1[i].indexOf(",",ind);
            //console.log(ind);
            tab2[i].push(tab1[i].substring(ind2,ind));

            if (ind == (-1)) { 
                      arr = -1; 
                      tab2[i].pop();
                      tab2[i].push(tab1[i].substring(ind2,tab1[i].length))
                    };
              ind++;
              }
    arr=ind=0;
  };
  
  //console.log("tab2=",tab2);

  var tabAtt = tab2.splice(0,1)[0]; //On prend la prems ligne correspondant aux nom des att

  //console.log("tabAtt=",tabAtt);
  //console.log(tab2);

  var toChangestr = tabAtt[tabAtt.length-1];  // on selectionne le dernier attribut

      //toChangestr = toChangestr.slice(0,toChangestr.length-1) // on enlève l'espace invisible après le dernier attribut, sinon on se retrouve avec '"att"' au lieu de 'att'
 
      while (toChangestr.search(/ /) != -1) { 
          toChangestr = toChangestr.slice(0,toChangestr.length-1) // on enlève l'espace après le dernier attribut
      }

  //console.log("tabAtt=",tabAtt);
  
/*
  for (var i = 0; i < toChangestr.length; i++) {
    console.log(toChangestr[i]);
  };

  for (var i = 0; i < tabAtt[0].length; i++) {
    console.log(tabAtt[0][i]);
  };

  //If dernier attribut entouré de " on ne sais trop pk
  //console.log(toChangestr.search(/"/));
  //console.log(toChangestr.search(/'/));
  // on ne trouve pas de " ou ' alors qu'il y en a ... pk ???

  //toChangestr = toChangestr.slice(0,toChangestr.length-1) // on enlève l'espace automatique dont on ne sais ou après le dernier attribut
*/


  // on réitère l'opération au cas ou l'user aurait laissé des espaces trainés




  tabAtt.pop();
  //console.log(tabAtt);
  tabAtt.push(toChangestr);
  //console.log(tabAtt);
  //tabAtt.push(0);


  var tab3 = [] // tab des objets

  //var varName,
  //   varName2 = "";

  for (var i = 0; i < tab2.length; i++) {
    var obj = {}
    for (var j = 0; j < tabAtt.length; j++) {
      //console.log(tabAtt[j]);
      //console.log(typeof(tabAtt[j]));
      varName = tabAtt[j];
      obj[varName] = +tab2[i][j]; //coerce values
    }
    tab3.push(obj);
  }
  //console.log("tab3=",tab3);



  //console.log(tab3);
  /*
  Pas besoin de fournir les données sous 2 formats tab3/tab4
  On prend uniquement tab3 qui est le plus svt use dans les visu actuels
  Au besoin on fera la transfo ver tab4 dans la visu qui le requier
  afin de réduire les besoins en ressources et le temps de calcul.

  var tab4 = {} // tab des attibuts
  for (var i = 0; i < tabAtt.length; i++) {
      tab4[tabAtt[i]] = [];
    for (var j = 0; j < tab2.length; j++) {
      tab4[tabAtt[i]].push(+tab2[j][i]);  //coerce values
    };
  };
  //console.log(tab4);
  var tabF = [tab3,tab4];
  */

  var tabF = tab3;

  //console.log(tabF);

  return tabF;

}











// Est sensé gérer les fichiers dans un format JSON DONNÉ ! Il existe plusieur variantes :s
function traitDataJson1(data) {
  
  //console.log(data);

  var myregex = /"[a-zA-Z0-9]*"\s*:\s*[a-zA-Z0-9]*\.?[a-zA-Z0-9]*/;

  var t1, t2, t3, t4, t5;

  var t3 = data.indexOf("},");

  var tab1 = [];
  var test = 0;


  var aaa = data.indexOf("{");
  var aaa2 = data.indexOf("}");
  var nbAtt = 0;

  while (aaa<aaa2) {
    var inde1 = data.indexOf(",",aaa);
    if (inde1 != -1) {nbAtt++;}
    aaa=inde1+1;
  }
  //console.log(nbAtt);
  
  var index1 = 0;

  while (data.length > 1) {

    var obj = {};

    for (var i = 0; i < nbAtt-1; i++) {


    var lala = data.match(myregex); //on cherche la première ligne
    //console.log(lala);

    // UNe fois trouvé, on y extrait les données

    var rezReg = lala[0]; // on met sous string le rez
    var rezRegCp = rezReg;
    //console.log(rezReg);

    var ind1 = rezReg.indexOf('"');
    var ind2 = rezReg.indexOf('"',ind1+1);
    var att1 = rezRegCp.slice(ind1+1,ind2); // nom de l'attribut en string
    rezRegCp = rezReg;  // on réinitie la str pour de nouvelle recherche
    //console.log(att1);
    var ind3 = rezReg.indexOf(":");
    var val1 = rezRegCp.slice(ind3+1);
    val1 = +val1;
    //console.log(val1);
    obj[att1] = val1;
    //console.log(obj);

    // on passe à la seconde "ligne"

      index1 = data.indexOf(",");
      data = data.slice(index1+1,data.length);


    };


    //console.log(data);


    var lala = data.match(myregex); //on cherche la première ligne
    //console.log(lala);

    // UNe fois trouvé, on y extrait les données

    var rezReg = lala[0]; // on met sous string le rez
    var rezRegCp = rezReg;
    //console.log(rezReg);

    var ind1 = rezReg.indexOf('"');
    var ind2 = rezReg.indexOf('"',ind1+1);
    var att1 = rezRegCp.slice(ind1+1,ind2);
    rezRegCp = rezReg;  // on réinitie la str pour de nouvelle recherche
    //console.log(att1);
    var ind3 = rezReg.indexOf(":");
    var val1 = rezReg.slice(ind3+1);
    val1 = +val1;
    //console.log(val1);
    obj[att1] = val1;
    //console.log(obj);
    tab1.push(obj);

    index1 = data.indexOf("}");
    data = data.slice(index1+2,data.length);
    //console.log(data);

  }
      //console.log(data.length);

  console.log(tab1);
} 



