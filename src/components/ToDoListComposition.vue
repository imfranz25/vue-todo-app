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
            <th>Status</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="value in TO_DO_LIST" :key="value.id">
            <td>{{ value.id }}</td>
            <td>{{ value.item }}</td>
            <td>
              <span class="badge" :class="getBadgeClass(value.status)">
                {{ value.status }}
              </span>
            </td>
            <td>{{ dateFormat(value.date_created) }}</td>
            <td>
              <div class="d-block">
                <button class="btn btn-primary">Edit</button>
                <button class="btn btn-danger mx-1">Delete</button>
              </div>
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
    // ===============================INITIALIZATION==========================================
    let toDoItem = ref(null);
    // ===============================FUNCTIONS==========================================
    /**
     * This function returns a new date format
     * (e.g 01/0/2022 -> January 01, 2022)
     * @param date -> sql date format e.g 2022-03-17 (Y-m-d)
     */
    let dateFormat = (date) => {
      let format = { month: "long", day: "numeric", year: "numeric" };
      return new Date(date).toLocaleString("en-US", format);
    };
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
      dateFormat,
    };
  },
};
</script>
