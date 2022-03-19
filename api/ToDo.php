<?php
  class ToDo{

    //initialization
    private $valid_actions = array('retrieve', 'update', 'delete', 'insert');
    private $conn;

    /**
     * ToDo Class Constructor for referencing the value from the passed parameter to $conn
     * @param conn -> mysql database configuration
     */
    function __construct($conn) {
      $this->conn = $conn;
    }
    /**
     * This function will validate the passed argument (request type)
     * If the Request type is valid (present in the array)
     * return true (e.g action=retrieve -> return true)
     * else return false (e.g action=modify -> return false) NOT PRESENT IN ARRAY
     * @param action -> action passed via url/api (e.g action="retrieve")
     */
    public function checkAction($action) {
      return in_array($action, $this->valid_actions);
    }
    /**
     * This function will retrieve the data (To do List Items)
     * that is present in the database
     * return type object
     */
    public function retrieveList() {
      $to_do = array();
      $columns = array("id", "item", "status", "date_created");
      $result = $this->conn->get("todo_tbl", null, $columns);
      if ($this->conn->count > 0) {
        foreach ($result as $list) {
          array_push($to_do, $list);
        }
      }
      return json_encode($to_do);
    }
    /**
     * This function will insert a new todo list item in the database
     * If it has successfully inserted a new item in todo table
     * it will return 0 (SUCCESS) else 1 (FAILED)
     */
    public function insertItem($item) {
      $data = array (
        'item' => $item,
        'status' => "Pending",
        'date_created' => $this->conn->now()
      );
      $add_item = $this->conn->insert('todo_tbl', $data);
      return ($add_item) ? 0 : 1;
    }
    /**
     * This function will delete the specific record in the database
     * based on the id specified in the parameter
     * If it has successfully delete/affect a row
     * it will return 0 (SUCCESS) else 1 (FAILED)
     * @param id -> todoItem id in database (primary key)
     */
    public function deleteItem($id) {
      $this->conn->where('id', $id);
      $delete_item = $this->conn->delete('todo_tbl');
      return ($delete_item) ? 0 : 1;
    }
    /**
     * This function will update the existing record
     * @param id -> primary key
     * @param item -> updated todo title
     * @param status -> updated status
     */
    public function updateItem($id, $item, $status) {
      $data = Array ('item' => $item, 'status' => $status);
      $this->conn->where ('id', $id);
      echo ($this->conn->update('todo_tbl', $data)) ? 0 : 1;
    }
  }
?>