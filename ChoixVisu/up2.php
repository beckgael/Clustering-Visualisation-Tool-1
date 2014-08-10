
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
<?php
$nomOrigine = $_FILES['mon_fichierF']['name'];
$elementsChemin = pathinfo($nomOrigine);
$extensionFichier = $elementsChemin['extension'];
$extensionsAutorisees = array("jpeg", "jpg", "gif" , "csv");

echo "_________".$nomOrigine."______1______";

echo "_________".$_FILES["mon_fichierF"]["tmp_name"]."____2____";

echo dirname(__FILE__)."___3_____";

echo date("YmdHis")."______4____";

echo $extensionFichier."______5______";




if (!(in_array($extensionFichier, $extensionsAutorisees))) {
    echo "Le fichier n'a pas l'extension attendue";
} else {    
    // Copie dans le repertoire du script avec un nom
    // incluant l'heure a la seconde pres 
    $repertoireDestination = dirname(__FILE__)."/";
    $nomDestination = "fichier_du_" . date("YmdHis") . "." . $extensionFichier;

echo $repertoireDestination."____6____";
echo $nomDestination."___7_____";
echo $repertoireDestination . $nomDestination ."_______8_______";

//echo "".move_uploaded_file($_FILES["mon_fichierF"]["tmp_name"],$repertoireDestination . $nomDestination);

    if (move_uploaded_file($_FILES["mon_fichierF"]["tmp_name"], 
                                     $repertoireDestination . $nomDestination)) {
        echo "Le fichier temporaire ".$_FILES["mon_fichierF"]["tmp_name"].
                " a été déplacé vers ".$repertoireDestination.$nomDestination;
    } else {
        echo "Le fichier n'a pas été uploadé (trop gros ?) ou ".
                "Le déplacement du fichier temporaire a échoué".
                " vérifiez l'existence du répertoire ".$repertoireDestination;
    }
}
?>
</body>
</html>