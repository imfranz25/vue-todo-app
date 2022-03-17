import { ref } from "vue";
//import axios from "axios";

// ===============================INITIALIZATION==========================================
const TO_DO_LIST = ref([
  {
    item: "Codes",
    status: "Pending",
  },
]);
// ===============================FUNCTIONS==========================================
/**
 * This function adds an item in the array -> TO_DO_LIST []
 * status -> "PENDING" by default
 * @param item -> value specified in the text input
 */
let addItem = (item) => {
  TO_DO_LIST.value.push({
    item: item,
    status: "Pending",
  });
};
/**
 * This function will delete an item in the toDoList array based in
 * the specified index passed
 *@param index -> position of object in toDoList array
 */
let deleteItem = (index) => {
  TO_DO_LIST.value.splice(index, 1);
};
/**
 * This getBadgeClass function will render the bg class from bootstrap class
 * depending to the status of the ToDoItem
 * @param status -> (Pending,In-Progress,Done) -> (bg-warning,bg-info,bg-success)
 *
 */
let getBadgeClass = (status) => {
  if (status == "Pending") return "bg-warning";
  if (status == "In-Progress") return "bg-info";
  if (status == "Done") return "bg-success";
};
// ===============================RETURN OBJECTS==========================================
export { TO_DO_LIST, addItem, getBadgeClass, deleteItem };
