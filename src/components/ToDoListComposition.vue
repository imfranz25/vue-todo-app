<template>
  <!-- To-Do List Container -->
  <div class="container">
    <h1 class="text-center">To-Do List App</h1>
    <!-- To-Do List Add Form -->
    <form>
      <div class="form-group row">
        <div class="col-5">
          <input type="text" class="form-control" />
        </div>
        <div class="col-5">
          <button type="submit" class="btn btn-dark col-md-4">Add Item</button>
        </div>
        <div class="col-2">
          <select>
            <option value="" disabled selected>Status</option>
            <option value="P">Pending</option>
            <option value="IP">In-progress</option>
            <option value="D">Done</option>
          </select>
        </div>
      </div>
    </form>
    <!-- ** End To-Do List Add Form ** -->
    <!-- To-Do List Table -->
    <div>
      <table class="table table-striped" id="toDoTable">
        <thead>
          <tr>
            <th>My To-Do List</th>
            <th>Item Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
    <!-- ** End To-Do List Table ** -->
  </div>
  <!-- ** End To-Do List Container ** -->
</template>

<script>
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import $ from "jquery";
import { onMounted } from "vue";
//import axios from "axios";

export default {
  setup() {
    //let toDoList = [];
    //let addItem = ref(null);
    //let itemStatus = ref(null);
    /**
     * This Lifecyclehook will generate an instance of dataTable for our ToDoList Table
     * For Search & Pagings Functionality
     */
    onMounted(() => {
      $("#toDoTable").DataTable();
    });
  },
};
</script>
