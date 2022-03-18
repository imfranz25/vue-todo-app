<?php
  // import @ top !important
  require_once('../vendor/thingengineer/mysqli-database-class/MysqliDb.php');
  //Database Init -> Config (hostname, username, password, database name)
  $conn = new MysqliDb ('localhost', 'root', '', 'todo');
?>