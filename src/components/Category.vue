<template>
  <div class="title-wrapper mb-4">
    <input
      type="text"
      class="form-control title-input fs-3 text-primary"
      placeholder="Nhập tên danh mục"
      v-model="title"
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
  <AddTask />
  <Task :id="1" name="Mua áo" :isDone="false" :isCreate="isCreate" />
  <Task :id="2" name="Mua áo" :isDone="false" :isCreate="isCreate" />
  <Task :id="3" name="Mua áo" :isDone="false" :isCreate="isCreate" />
</template>

<script>
import AddTask from "./AddTask";
import Task from "./Task";

export default {
  name: "Category",
  props: {
    title: String,
    isCreate: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AddTask,
    Task,
  },
  data() {
    return {
      isEditing: false,
    };
  },
  methods: {
    startEditing() {
      if (this.isEditing) {
        this.finishEditing();
      } else {
        this.isEditing = true;
        this.$nextTick(() => this.$refs.titleInput.focus());
      }
    },
    finishEditing() {
      if (this.isEditing) {
        this.isEditing = false;
        console.log(this.title);
        this.$emit("on-edit", this.title);
      }
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