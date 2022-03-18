import { ref } from "vue";
import axios from "axios";
import $ from "jquery";

// ===============================INITIALIZATION==========================================
const TO_DO_LIST = ref([]);
const API_URL = ref("http://localhost/ojt-training-repo/api/action.php");
let toDoItem = ref(null);
// ===============================FUNCTIONS==========================================
/**
 * This function will retrieve all of the data from the database (id, item, status, date_created)
 * if the action specified is not include in the following
 * ('retrieve', 'update', 'delete', 'insert')
 * it will alert the user -> "Invalid Action Request" (callback == 1)
 * else proceed to the action specified (e.g retrieve -> retrieve data)
 * Every time this function is invoke it will reinitialize the datatable()
 * to refresh pagination and its content
 */
let retrieveList = () => {
  axios.get(`${API_URL.value}?action=retrieve`).then(function (response) {
    if (response.data == 1) {
      alert("Invalid Action Request");
    } else {
      TO_DO_LIST.value.splice(0, TO_DO_LIST.value.length); // delete all items -> array
      TO_DO_LIST.value.push(...response.data); // put all the data objects -> array
      setTimeout(() => $("#toDoTable").DataTable(), 1000);
    }
  });
};
let getItem = (index) => {
  toDoItem = TO_DO_LIST[index];
};
/**
 * This function adds an item in the array -> TO_DO_LIST []
 * status -> "PENDING" by default
 * date_created -> "DATE TODAY"
 * @param item -> value specified in the text input
 */
let addItem = (item) => {
  axios({
    method: "post",
    url: `${API_URL.value}?action=insert`,
    data: { item: item },
  }).then(function (response) {
    if (response.data === 0) {
      $("#toDoTable").DataTable().destroy();
      retrieveList();
      alert("To-do List item successfully added");
    } else {
      alert("Something went wrong, please try again!");
    }
  });
};
/**
 * This function will delete an item in the toDoList array based in
 * the specified index passed
 *@param index -> position of object in toDoList array
 */
let deleteItem = (id) => {
  if (confirm("Are you sure you want to delete this item ?")) {
    axios({
      method: "post",
      url: `${API_URL.value}?action=delete`,
      data: { id: id },
    }).then(function (response) {
      if (response.data === 0) {
        $("#toDoTable").DataTable().destroy();
        retrieveList();
        alert("To-do List item successfully deleted");
      } else {
        alert("Something went wrong, please try again!");
      }
    });
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
/**
 * This function returns a new date format
 * (e.g 01/0/2022 -> January 01, 2022)
 * @param date -> sql date format e.g 2022-03-17 (Y-m-d)
 */
let dateFormat = (date) => {
  let format = { month: "long", day: "numeric", year: "numeric" };
  return new Date(date).toLocaleString("en-US", format);
};
export {
  TO_DO_LIST,
  toDoItem,
  addItem,
  getBadgeClass,
  deleteItem,
  retrieveList,
  dateFormat,
  getItem,
};
