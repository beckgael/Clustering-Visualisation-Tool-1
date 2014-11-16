
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
      obj[varName] = scientToDecimal(tab2[i][j]); //coerce values
    }
    tab3.push(obj);
  }
  //console.log("tab3=",tab3);



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





//Traite les fichiers txt avec des " " au lieux des "," des fichiers csv
function parseDataMathlab(data1) {

  var data = data1,
    dataRez = [],
    indicAttLign;
  //console.log(data);
  //console.log(data.match(regex1)[0]);

  //On extrait le nom des attributs
  indicAttLign = data.indexOf("\n");
  var strAtt1 = data;
    strAtt1 = strAtt1.slice(0,indicAttLign);
    //console.log("stratt1 = ",strAtt1);
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
    //console.log("cpdata = ",cpdata);



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
            dataRez[i][j] = scientToDecimal(dataRez[i][j]);
          };

          //on s'occupe du dernier attribut en excluant le "\n" de fin de ligne
          var indexLigne = dataRez[i][nbAtt-1].indexOf("\n");
          dataRez[i][nbAtt-1] = dataRez[i][nbAtt-1].slice(0,indexLigne);
          dataRez[i][nbAtt-1] = scientToDecimal(dataRez[i][nbAtt-1]);

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

    var dataRezF = [];
    for (var i = 0; i < dataRez2[1].length; i++) {
      var obj1 = {};
      for (var j = 0; j < dataRez2[0].length; j++) {
        obj1[dataRez2[0][j]] = dataRez2[1][i][j];
      };
      dataRezF.push(obj1);
    };
    
    console.log(dataRezF);
    return dataRezF;
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



