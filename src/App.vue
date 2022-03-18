<template>
  <ToDoListPage />
  <EditItemModal />
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
//components
import ToDoListPage from "@/components/ToDoListComposition.vue";
import EditItemModal from "@/components/EditItemModal.vue";
export default {
  name: "App",
  components: {
    ToDoListPage,
    EditItemModal,
  },
};
</script>
