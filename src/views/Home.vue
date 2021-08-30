<template>
  <div>
      <header-home/>
      <content-home/>
      <footer-home/>
  </div>
</template>

<script>
import TokenStorage from "../jwt/token-storage";
import headerHome from '../components/componentHome/headerHome.vue';
import contentHome from "../components/componentHome/contentHome.vue";
import footerHome from "../components/componentHome/footerHome.vue";

export default {
  name: "Home",
  components:{
      headerHome,
      contentHome,
      footerHome
  },
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

<style scoped>
</style>
