<?php

  //Header Access-Controls
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, PUT");
  header("Access-Control-Allow-Headers: Content-Type");

  //Imports
  require_once("ToDo.php"); //ToDo Class
  require_once("../database/conn.php"); //Connection Config

  //class instance ToDo ($conn -> comes from conn.php file where it is configured)
  $ToDo = new ToDo($conn);
  $request = json_decode(file_get_contents("php://input"));

  /*
    This condition test if $_GET[action] has a value
    if none(no value) send a callback == 1 (Invalid Request Action)
    if have -> check if its a valid action (insert, retrieve, update, delete)
    if valid then proceed to the request action
  */
  if (isset($_GET['action'])) {
    $action = $_GET['action'];
    //Invalid Request (will not proceed to the rest of the code) -> echo 1
    if (!($ToDo->checkAction($action))) echo 1;
    //Valid Request type
    if ($action === "retrieve") {
      echo $ToDo->retrieveList();
    } else if ($action === "insert") {
      $item = $request->item;
      echo $ToDo->insertItem($item);
    }
  } else {
    echo 1; //Invalid Request
  }

?>