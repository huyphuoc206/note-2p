<template>
  <div>
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
};
</script>

<style scoped></style>
