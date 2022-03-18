<template>
  <!-- To-Do List Container -->
  <div class="container">
    <h1 class="text-center my-5">To-Do List App</h1>
    <!-- To-Do List Add Form -->
    <div class="d-flex justify-content-center">
      <form @submit.prevent="sendItem">
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
      <table class="table table-striped border border-secondary" id="toDoTable">
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
          <tr v-for="(value, index) in TO_DO_LIST" :key="value.id">
            <td>{{ index + 1 }}</td>
            <td>{{ value.item }}</td>
            <td>{{ dateFormat(value.date_created) }}</td>
            <td>
              <span class="badge" :class="getBadgeClass(value.status)">
                {{ value.status }}
              </span>
            </td>
            <td>
              <div class="d-block">
                <button class="btn btn-primary">Edit</button>
                <button
                  @click="deleteItem(value.id)"
                  class="btn btn-danger mx-1"
                >
                  Delete
                </button>
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

<style scoped>
@import "@/assets/styles/main.css";
</style>

<script>
import $ from "jquery";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { ref, onMounted } from "vue";
import {
  TO_DO_LIST,
  addItem,
  getBadgeClass,
  deleteItem,
  retrieveList,
  dateFormat,
} from "@/composables/ToDoList.js";

export default {
  name: "TodoListComposition",
  setup() {
    // ===============================INITIALIZATION==========================================
    let toDoItem = ref(null);
    // ===============================FUNCTIONS==========================================
    /**
     * This seperate function will call the addItem
     * and pass the value of toDoItem -> Trim the value
     * after calling the function clear out the value of toDoItem
     */
    let sendItem = () => {
      addItem(toDoItem.value.trim());
      toDoItem.value = "";
    };
    // ===============================HOOKS==========================================
    /**
     * This Lifecyclehook will call the function retrieveList
     */
    onMounted(() => {
      retrieveList();
      setTimeout(() => $("#toDoTable").DataTable(), 1000);
    });
    return {
      TO_DO_LIST,
      toDoItem,
      getBadgeClass,
      deleteItem,
      dateFormat,
      sendItem,
    };
  },
};
</script>
