<?php
  class ToDo{

    //initialization
    private $valid_actions = array('retrieve', 'update', 'delete', 'insert');
    private $conn;

    //functions
    function __construct($conn) {
      $this->conn = $conn;
    }
    public function checkAction($action) {
      return in_array($action, $this->valid_actions);
    }
  }
?>