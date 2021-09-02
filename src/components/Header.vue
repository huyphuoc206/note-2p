<template>
  <header class="container-fluid bg-dark text-white p-3 pe-5">
    <div class="logo">
      <router-link to="/app" class="ms-4 fs-5">
        <span class="h1 text-center m-2 text-white">
          <i class="fas fa-check-square me-3"></i>
          <span>Note 2P</span>
        </span>
      </router-link>
    </div>
    <div class="text-end">
      <span class="fs-5">Xin chào, {{ fullname }} </span>
      <i
        class="fas fa-sign-out-alt ms-4 fs-5 logout"
        @click="$emit('logOut')"
        title="Thoát"
      ></i>
    </div>
  </header>
</template>

<script>
import TokenStorage from "../jwt/token-storage";

export default {
  name: "Header",
  data() {
    return {
      fullname: "",
    };
  },
  created() {
    const token = TokenStorage.getUserInfo(TokenStorage.ACCESS_TOKEN);
    if (token) this.fullname = token.fullname;
  },
};
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logout {
  cursor: pointer;
}
</style>