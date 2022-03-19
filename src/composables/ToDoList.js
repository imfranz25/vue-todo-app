import { ref } from "vue";
import axios from "axios";
import $ from "jquery";

// ===============================INITIALIZATION==========================================
const TO_DO_LIST = ref([]);
const API_URL = ref("http://localhost/ojt-training-repo/api/action.php");
let viewItem = ref({});
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
/**
 * This function adds an item in the database
 * status -> "PENDING" by default
 * date_created -> "DATE TODAY"
 * @param item -> value specified in the text input
 */
let addItem = (item) => {
  axios
    .post(`${API_URL.value}?action=insert`, { item: item })
    .then(function (response) {
      callback(response.data, "To-do Item addedd successfully");
    });
};
/**
 * This function will delete an item/record in the database
 *@param id ->record id
 */
let deleteItem = (id) => {
  if (confirm("Are you sure you want to delete this item ?")) {
    axios
      .post(`${API_URL.value}?action=delete`, { id: id })
      .then(function (response) {
        callback(response.data, "To-do List item deleted successfully");
      });
  }
};
/**
 * This function will get the object based on the index specified in
 * the parameter (e.g [0] first object store to -> viewItem)
 * @param {index value for reference} index
 */
let getItem = (index) => {
  viewItem.value = TO_DO_LIST.value[index];
};
/**
 * This function will trigger once the user cancel the editing form
 * in order to reset data (data from the database)
 * and also reset the viewItem to an empty object
 */
let clearItem = () => {
  viewItem.value = {};
  refreshTable();
};
/**
 * This function will create a axios http post request that will update records
 * in the database -> (id, item, status)
 */
let updateItem = () => {
  axios
    .post(`${API_URL.value}?action=update`, {
      id: viewItem.value.id,
      item: viewItem.value.item,
      status: viewItem.value.status,
    })
    .then(function (response) {
      callback(response.data, "To-do item update succesfully");
    });
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
/**
 * This seperate function will handle the response from the server
 * to alert user if its success or not
 * @param {0-> success, 1 -> error} response
 * @param {Custom message for success alert} msg
 */
let callback = (response, msg) => {
  if (response === 0) {
    refreshTable();
    alert(msg);
  } else {
    alert("Something went wrong, please try again!");
  }
};
/**
 * This function will refresh the table,
 * Since the DataTable is already initialized
 * it is necessary to destroy it first before
 * we call the retrieve function again to
 * reinitialized the datatable in order to read new/updated datas
 */
let refreshTable = () => {
  $("#toDoTable").DataTable().destroy();
  retrieveList();
};
// ===============================EXPORT==========================================
export {
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
};
