<template>
  <div class="mb-3 row justify-content-center align-items-center">
    <div v-show="!isCreate" class="col-1">
      <input
        class="form-check-input p-2 me-3"
        type="checkbox"
        :id="id"
        :checked="isDone"
        @click="checkDone"
      />
    </div>
    <div v-if="!isEditing" class="col-9">
      <label
        :for="id"
        class="border-0 task-name text-secondary"
        @click="$emit('on-toggle')"
        :class="{ done: isDone }"
      >
        {{ name }}
      </label>
    </div>
    <div v-else class="col-9">
      <form class="flex-grow-1" @submit.prevent="finishEditing()">
        <input
          type="text"
          class="form-control"
          v-model="newName"
          @blur="finishEditing()"
          ref="newTodo"
        />
      </form>
    </div>
    <div class="col-2">
      <div class="actions">
        <button @click="startEditing()" class="btn text-primary p-0 fs-5">
          <i class="fas fa-edit"></i>
        </button>
        <button @click="showRemove" class="btn text-danger p-0 fs-5">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
  <transition v-show="showRemoveTask" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <p class="text-danger">
            <strong>Lưu ý: </strong>
            <i>Công việc này sẽ bị xóa vĩnh viễn.</i>
          </p>
          <p>Bạn chắc chắn muốn xóa?</p>
          <div class="text-end">
            <button
              class="btn btn-secondary me-3"
              @click="showRemoveTask = false"
            >
              Quay lại
            </button>
            <button class="btn btn-danger" @click="removeTask">Xóa</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Task",
  props: {
    id: Number,
    name: String,
    isDone: Boolean,
    isCreate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isEditing: false,
      newName: "",
      showRemoveTask: false,
    };
  },
  methods: {
    startEditing() {
      if (this.isEditing) {
        this.finishEditing();
      } else {
        this.newName = this.name;
        this.isEditing = true;
        this.$nextTick(() => this.$refs.newTodo.focus());
      }
    },
    finishEditing() {
      if (this.isEditing) {
        this.isEditing = false;
        const editTask = {
          id: this.id,
          name: this.newName,
          done: this.isDone,
        };

        if (
          this.newName.trim() != this.name.trim() &&
          this.newName.trim().length != 0
        ) {
          this.$emit("onEdit", editTask);
        }
      }
    },
    showRemove() {
      if (this.isCreate) {
        // call remove task method, not show modal
        this.removeTask();
      } else {
        this.showRemoveTask = true;
      }
    },
    removeTask() {
      this.$emit("removeTask", this.id);
      this.showRemoveTask = false;
    },
    checkDone() {
      const editTask = {
        id: this.id,
        name: this.name,
        done: !this.isDone,
      };
      this.$emit("onEdit", editTask);
    },
  },
};
</script>
<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.done {
  text-decoration: line-through;
}

.task-name {
  overflow-wrap: break-word;
  max-width: 100%;
}

.btn:focus,
.btn:active {
  outline: none !important;
  box-shadow: none;
}
</style>