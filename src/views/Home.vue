<template>
  <div>
    <h1>Home page</h1>
    <p> {{ fullname }}</p>
  </div>
</template>

<script>
import TokenStorage from "../jwt/token-storage";
export default {
  name: "Home",
  data() {
    return {
      fullname: TokenStorage.getUserInfo(TokenStorage.ACCESS_TOKEN)
    };
  },
  created() {
    const token = TokenStorage.ACCESS_TOKEN;
    if (token === undefined || TokenStorage.isExpired(token)) {
       this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style scoped></style>
