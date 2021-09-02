<template>
  <form @submit.prevent="addTask" class="mb-4">
    <input
      type="text"
      class="field"
      placeholder="Nhập công việc"
      v-model="taskName"
    />
    <button class="my-btn ms-2" v-bind:class="{ active: taskName }">
      <i class="fas fa-plus"></i>
    </button>
  </form>
</template>
<script>
export default {
  name: "AddTask",
  data() {
    return {
      taskName: "",
    };
  },
  methods: {
    addTask() {
      console.log("s");
    },
  },
};
</script>
<style scoped>
form {
  display: flex;
  justify-content: center;
  align-items: center;
}
.field {
  color: #4b2354;
  letter-spacing: 1px;
  padding: 15px 20px;
  border-radius: 15px;
  outline: none;
  border: 1px solid #b4adad;
  font-weight: bold;
  width: 100%;

  box-shadow: 0 5px 30px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 5px 30px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 5px 30px 0px rgba(0, 0, 0, 0.1);
  -o-box-shadow: 0 5px 30px 0px rgba(0, 0, 0, 0.1);
  -ms-box-shadow: 0 5px 30px 0px rgba(0, 0, 0, 0.1);

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.field:focus {
  box-shadow: 0 5px 30px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 5px 30px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 5px 30px 0px rgba(0, 0, 0, 0.2);
  -o-box-shadow: 0 5px 30px 0px rgba(0, 0, 0, 0.2);
  -ms-box-shadow: 0 5px 30px 0px rgba(0, 0, 0, 0.2);
}

.my-btn {
  cursor: pointer;
  border-radius: 15px;
  color: #fff;
  background: #bd59d4;
  outline: none;
  border: none;
  padding: 15px 30px;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;

  box-shadow: 0 10px 30px 0px rgba(189, 89, 212, 0.5);
  -moz-box-shadow: 0 10px 30px 0px rgba(189, 89, 212, 0.5);
  -webkit-box-shadow: 0 10px 30px 0px rgba(189, 89, 212, 0.5);
  -o-box-shadow: 0 10px 30px 0px rgba(189, 89, 212, 0.5);
  -ms-box-shadow: 0 10px 30px 0px rgba(189, 89, 212, 0.5);
}

.my-btn:hover,
.active {
  background-color: #4b2354;
  box-shadow: 0 10px 30px 0px rgba(189, 89, 212, 0.8);
  -moz-box-shadow: 0 10px 30px 0px rgba(189, 89, 212, 0.8);
  -webkit-box-shadow: 0 10px 30px 0px rgba(189, 89, 212, 0.8);
  -o-box-shadow: 0 10px 30px 0px rgba(189, 89, 212, 0.8);
  -ms-box-shadow: 0 10px 30px 0px rgba(189, 89, 212, 0.8);
}
</style>