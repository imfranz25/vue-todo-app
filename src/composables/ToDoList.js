import { ref } from "vue";
import axios from "axios";

// ===============================INITIALIZATION==========================================
const TO_DO_LIST = ref([]);
const API_URL = ref("http://localhost/ojt-training-repo/api/action.php");
// ===============================FUNCTIONS==========================================
/**
 * This function will retrieve all of the data in the database (item, status, date_created)
 * if the action specified is not include in the following
 * ('retrieve', 'update', 'delete', 'insert')
 * it will alert the user -> "Invalid Action Request" (callback == 1)
 * else proceed to the action specified (e.g retrieve -> retrieve data)
 * retrieveList function have self invoke behavior
 */
(function retrieveList() {
  axios.get(`${API_URL.value}?action=retrieve`).then(function (response) {
    if (response.data == 1) {
      alert("Invalid Action Request");
    } else {
      //TO_DO_LIST.value.splice(0, TO_DO_LIST.value.length); // delete all items -> array
      //TO_DO_LIST.value.push(...response.data); // put all the data objects -> array
      console.log(response.data);
    }
  });
})();
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
  if (confirm("Are you sure you want to delete this item ?")) {
    TO_DO_LIST.value.splice(index, 1);
  }
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
