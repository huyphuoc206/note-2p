<template>
  <div class="mb-3 row justify-content-center align-items-center">
    <div v-show="!isCreate" class="col-1">
      <input
        class="form-check-input p-2 me-3"
        type="checkbox"
        :id="id"
        :checked="isDone"
      />
    </div>
    <div v-if="!isCreate && !isEditing" class="col-9">
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
        <button
          v-if="!isCreate"
          @click="startEditing()"
          class="btn text-primary p-0 fs-5"
        >
          <i class="fas fa-edit"></i>
        </button>
        <div v-else></div>
        <button @click="$emit('on-delete')" class="btn text-danger p-0 fs-5">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
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
      this.isEditing = false;
      this.$emit("on-edit", this.newName);
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