<template>
  <!-- To-Do List Container -->
  <div class="container">
    <h1 class="text-center my-5">To-Do List App</h1>
    <!-- To-Do List Add Form -->
    <div class="d-flex justify-content-center">
      <form @submit.prevent="addItem(toDoItem)">
        <div class="form-group row">
          <div class="col-10">
            <input type="text" class="form-control" v-model="toDoItem" />
          </div>
          <div class="col-2">
            <button type="submit" class="btn btn-dark">Add</button>
          </div>
        </div>
      </form>
    </div>
    <!-- ** End To-Do List Add Form ** -->
    <!-- To-Do List Table -->
    <div class="mt-5">
      <table class="table table-striped" id="toDoTable">
        <thead>
          <tr>
            <th>#</th>
            <th>My To-Do List</th>
            <th>Item Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in TO_DO_LIST" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ value.item }}</td>
            <td>
              <span class="badge" :class="getBadgeClass(value.status)">
                {{ value.status }}
              </span>
            </td>
            <td>
              <button class="btn btn-primary">Edit</button>
              <button @click="deleteItem(index)" class="btn btn-danger">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
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
import { ref, onMounted } from "vue";
import {
  TO_DO_LIST,
  addItem,
  getBadgeClass,
  deleteItem,
} from "@/composables/ToDoList.js";

export default {
  name: "TodoListComposition",
  setup() {
    let toDoItem = ref(null);
    // ===============================HOOKS==========================================
    /**
     * This Lifecyclehook will generate an instance of dataTable for our ToDoList Table
     * For Search & Pagings Functionality after the DOM is loaded
     */
    onMounted(() => {
      $("#toDoTable").DataTable();
    });
    return {
      TO_DO_LIST,
      toDoItem,
      addItem,
      getBadgeClass,
      deleteItem,
    };
  },
};
</script>
