<template>
  <!-- To-Do List Container -->
  <div class="container">
    <h1 class="text-center my-5">To-Do List App</h1>
    <!-- To-Do List Add Form -->
    <div class="d-flex justify-content-center">
      <form @submit.prevent="sendItem">
        <div class="form-group row">
          <div class="col-10">
            <input
              type="text"
              class="form-control"
              v-model="toDoItem"
              required
            />
          </div>
          <div class="col-2">
            <button type="submit" class="btn btn-dark">Add</button>
          </div>
        </div>
      </form>
    </div>
    <!-- ** End To-Do List Add Form ** -->
    <!-- To-Do List Table -->
    <div class="mt-5 table-container">
      <table class="table table-striped table-bordered" id="toDoTable">
        <thead>
          <tr>
            <th>#</th>
            <th>My To-Do List</th>
            <th>Date Created</th>
            <th>Status</th>
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
                <button
                  @click="getItem(index)"
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#editItem"
                >
                  Edit
                </button>
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
  <!-- To-Do Item Update Modal -->
  <div
    class="modal fade"
    id="editItem"
    tabindex="-1"
    aria-labelledby="editItemLabel"
    aria-hidden="true"
    v-if="!viewItem.length"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editItemLabel">Edit To-Do Item</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="updateItem()">
          <div class="modal-body">
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label"
                >Date Created:</label
              >
              <input
                type="text"
                :value="dateFormat(viewItem.date_created)"
                class="form-control"
                disabled
              />
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label"
                >To-Do Title:</label
              >
              <input
                type="text"
                v-model="viewItem.item"
                class="form-control"
                required
              />
            </div>
            <div class="mb-5">
              <label for="message-text" class="col-form-label">Status:</label>
              <select class="form-control" v-model="viewItem.status" required>
                <option value="Pending">Pending</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="clearItem"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- ** End To-Do Item Update Modal ** -->
</template>

<style scoped>
@import "@/assets/styles/main.css";
</style>

<script>
import { ref, onMounted } from "vue";
import {
  TO_DO_LIST,
  addItem,
  getBadgeClass,
  deleteItem,
  retrieveList,
  dateFormat,
  getItem,
  viewItem,
  clearItem,
  updateItem,
} from "@/composables/ToDoList.js";

export default {
  name: "TodoListComposition",
  setup() {
    // ===============================INITIALIZATION==========================================
    let toDoItem = ref(null);
    let listLength = ref(TO_DO_LIST.length);
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
     * This Lifecyclehook will call the function retrieveList onMounted
     */
    onMounted(() => {
      retrieveList();
    });
    return {
      TO_DO_LIST,
      toDoItem,
      getBadgeClass,
      deleteItem,
      dateFormat,
      sendItem,
      listLength,
      getItem,
      viewItem,
      clearItem,
      updateItem,
    };
  },
};
</script>
