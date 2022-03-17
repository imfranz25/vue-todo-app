<?php

  //Header Access-Controls
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, PUT");
  header("Access-Control-Allow-Headers: Content-Type");

  //Imports
  require_once('../vendor/thingengineer/mysqli-database-class/MysqliDb.php'); // import@top !important
  require_once("ToDo.php"); //ToDo Class
  require_once("conn.php"); //Connection Config

  //class instance ToDo ($conn -> comes from conn.php file where it is configured)
  $ToDo = new ToDo($conn);

  /*
    This condition test if $_GET[action] has a value
    if none(no value) send a callback == 1
    if have -> check if its a valid action
    if valid then proceed to the request action
  */
  if (isset($_GET['action'])) {
    $action = $_GET['action'];
    if (($ToDo->checkAction($action))) {
      echo json_encode($action);
    } else {
      echo 1; //Invalid Request
    }
  } else {
    echo 1; //Invalid Request
  }

?>