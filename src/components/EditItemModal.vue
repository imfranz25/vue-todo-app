<template>
  <div
    class="modal fade"
    id="editItem"
    tabindex="-1"
    aria-labelledby="editItemLabel"
    aria-hidden="true"
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
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label"
                >Date Created:</label
              >
              <input type="text" disabled class="form-control" />
            </div>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label"
                >To-Do Title:</label
              >
              {{ itemIndex }}
              <input type="text" class="form-control" />
            </div>
            <div class="mb-5">
              <label for="message-text" class="col-form-label">Status:</label>
              <select class="form-control">
                <option value="Pending">Pending</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            Cancel
          </button>
          <button type="button" class="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toDoItem } from "@/composables/ToDoList.js";
//import { ref } from "vue";

export default {
  name: "EditItemModal",
  setup() {
    let id = toDoItem.id;
    console.log(id);
  },
};
</script>
