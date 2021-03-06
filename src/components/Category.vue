<template>
  <div class="title-wrapper mb-4">
    <input
      type="text"
      class="form-control title-input fs-3 text-primary"
      placeholder="Nhập tên danh mục"
      v-model="titleValue"
      :disabled="!isCreate && !isEditing"
      @blur="finishEditing()"
      v-on:keydown.enter.prevent="finishEditing()"
      ref="titleInput"
    />
    <button
      v-show="!isCreate"
      @click="startEditing()"
      class="btn text-primary ms-2 p-0 fs-5"
      title="Sửa tên danh mục"
    >
      <i class="fas fa-edit"></i>
    </button>
  </div>
  <AddTask @addTask="addTask" />
  <Task
    v-for="item in isCreate ? tasksCreate : tasks"
    :key="item.id"
    :id="item.id"
    :name="item.name"
    :isDone="item.done"
    :isCreate="isCreate"
    @onEdit="editTask"
    @removeTask="removeTask"
  />
  <div v-show="isCreate" class="text-end mt-5">
    <button
      class="btn btn-secondary me-3"
      @click="$emit('hiddenCreateCategory')"
    >
      Quay lại
    </button>
    <button class="btn btn-success" @click="createCategory">Thêm</button>
  </div>
  <transition v-show="showErrorTitle" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <p class="text-danger fst-italic text-center">
            <strong>Vui lòng nhập tên danh mục</strong>
          </p>
          <div class="text-center">
            <button class="btn btn-danger" @click="showErrorTitle = false">
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import AddTask from "./AddTask";
import Task from "./Task";
import TokenStorage from "../jwt/token-storage";

export default {
  name: "Category",
  components: {
    AddTask,
    Task,
  },
  props: {
    title: String,
    tasks: [],
    isCreate: {
      type: Boolean,
      default: false,
    },
    isClear: Boolean,
  },
  data() {
    return {
      isEditing: false,
      titleCreate: "",
      tasksCreate: [],
      showErrorTitle: false,
      newTitle: "",
    };
  },
  watch: {
    isClear() {
      this.titleCreate = "";
      this.tasksCreate = [];
    },
  },
  methods: {
    startEditing() {
      if (this.isEditing) {
        this.finishEditing();
      } else {
        this.isEditing = true;
        this.newTitle = this.title;
        this.$nextTick(() => this.$refs.titleInput.focus());
      }
    },
    finishEditing() {
      if (this.isEditing) {
        this.isEditing = false;
        if (
          this.newTitle.trim() != this.title.trim() &&
          this.newTitle.trim().length != 0
        ) {
          this.$emit("onEdit", this.newTitle.trim());
        }
      }
    },
    createCategory() {
      if (this.titleCreate.trim().length === 0) {
        this.titleCreate = "";
        this.showErrorTitle = true;
      } else {
        const category = {
          title: this.titleCreate,
          tasks: this.tasksCreate,
          userId: TokenStorage.getUserInfo(TokenStorage.ACCESS_TOKEN).id,
        };
        this.$emit("createCategory", category);
        this.titleCreate = "";
        this.tasksCreate = [];
      }
    },
    addTask(task) {
      if (this.isCreate) {
        // add task on view, not call api only add to array
        if (this.tasksCreate.length === 0) task.id = 1;
        else task.id = this.tasksCreate[0].id + 1;
        this.tasksCreate.push(task);
      } else {
        // add task when view detail category => call api add task
        this.$emit("addTask", task);
      }
    },
    editTask(editTask) {
      if (this.isCreate) {
        const index = this.tasksCreate.findIndex(
          (item) => item.id === editTask.id
        );
        this.tasksCreate[index].name = editTask.name;
      } else {
        // call api update task
        this.$emit("editTask", editTask);
      }
    },
    removeTask(id) {
      if (this.isCreate) {
        const index = this.tasksCreate.findIndex((item) => item.id === id);
        this.tasksCreate.splice(index, 1);
      } else {
        // call api update task
        this.$emit("removeTask", id);
      }
    },
  },
  computed: {
    titleValue: {
      get() {
        if (this.isCreate) {
          return this.titleCreate;
        } else if (this.isEditing) {
          return this.newTitle;
        } else {
          return this.title;
        }
      },
      set(val) {
        if (this.isCreate) {
          this.titleCreate = val;
        } else if (this.isEditing) {
          this.newTitle = val;
        }
      },
    },
  },
};
</script>
<style scoped>
.title-wrapper {
  display: flex;
}

.title-input {
  border-left: none;
  border-top: none;
  border-right: none;
  text-align: center;
  font-weight: bold;
}

.title-input:disabled {
  background: inherit;
}

.title-input::placeholder {
  text-align: center;
  font-size: 0.8em;
}

.btn:focus,
.btn:active {
  outline: none !important;
  box-shadow: none;
}
</style>