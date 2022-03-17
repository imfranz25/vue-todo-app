<?php
  class ToDo{

    //initialization
    private $valid_actions = array('retrieve', 'update', 'delete', 'insert');
    private $conn;

    /**
     * ToDo Class Constructor for referencing a value from the passed parameter to $conn
     * @param conn -> mysql database configuration
     */
    function __construct($conn) {
      $this->conn = $conn;
    }
    /**
     * This function will validate the passed argument (request type)
     * If the Request type is valid (present in the array)
     * return true (e.g action=retrieve -> return true)
     * else return false (e.g action=modify -> return false)
     */
    public function checkAction($action) {
      return in_array($action, $this->valid_actions);
    }
    /**
     * This function will retrieve the data (To do List Items)
     * that is present in the database
     * return type object
     */
    public function retrieveList(){
      $to_do = array();
      $columns = array("id", "item", "status", "date_created");
      $result = $this->conn->get("todo_tbl", null, $columns);
      // if ($this->conn->count > 0) {
      //   foreach ($list as $result) {
      //     $to_do['list'] = $list;
      //   }
      echo (json_encode($result));
    }
  }
?>