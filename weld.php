<?php
/*
Esta es la parte de la aplicacion que se encargará de hacer la administracion
de las maquinas en la base de datos, 
*/

include "../inc/database.php";
require 'Slim/Slim.php';
$app = new Slim();

$app->get('/equipments', 'index' );
$app->get('/piezas', 'piezas_maquina' );

function index()
{
    // updateMachinesMxOptix();
    $query = file_get_contents('sql/minutos.maquina.sql');
    $DB = new Prod();
    $DB->setQuery($query);
    $DB->exec();
    if ($DB->json() == "[]") {
        throw new Exception("No arrojo datos la base de datos", 1);
    } else {
        echo $DB->json();
    }   
}
function piezas_maquina()
{
    // updateMachinesMxOptix();
    $lastCalculatedFileName = 'lk3456kjgadfmlcvjdfbladfq984874.txt';
    $query = file_get_contents('sql/piezas.turno.sql');
    $today = strtotime("now");
    $horaMilitar = date('Hi',$today);
    $hora = date('H',$today);
    // echo "$hora";
    if (file_exists($lastCalculatedFileName)){
        $lastCalculated = file_get_contents($lastCalculatedFileName);
        if( $lastCalculated != $hora ){
            file_put_contents($lastCalculatedFileName, $hora);
            // Tenemos que recalcular el valor de las maquinas
            $recalculate = true;
        } else {
            // No tenemos que recalcular los datos, por que son de menos de una hora de diferencia.
            $recalculate = false;
        }
    } else {
        file_put_contents($lastCalculatedFileName, $hora);
        $recalculate = true;
    }
    if($horaMilitar < 630){
        // echo "Mayor";
        $today = strtotime("-1 day");
        $tomorrow = strtotime("now");
    } else {
        // echo "Menor";
        // no necesito volver a calcular $today
        $tomorrow = strtotime("+1 day");
    }
    if ($recalculate){
        $DB = new Prod();
        $DB->setQuery($query);
        $DB->bind_vars(':nowDay',date('d'));
        $DB->bind_vars(':nowMonth',date('n'));
        $DB->bind_vars(':tomDay',date('d', $tomorrow));
        $DB->bind_vars(':tomMonth',date('n', $tomorrow));
        // echo $DB->query;
        $DB->exec();
        if ($DB->json() == "[]") {
            throw new Exception("No arrojo datos la base de datos", 1);
        } else {
            file_put_contents('asdkljasdfahsdfjhusdf2834', $DB->json());
            echo $DB->json();
        }   
        $DB->exit();
    }else{
        echo file_get_contents('asdkljasdfahsdfjhusdf2834');
    }
}

$app->run();
