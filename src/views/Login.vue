<template>
  <div class="login ms-3 me-3">
    <div class="main ps-3 pe-3">
      <h3 class="sign text-center pt-5 pb-3">Đăng nhập</h3>
      <div
        v-show="loginFail"
        class="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        Email hoặc mật khẩu không chính xác
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <form @submit="onSubmit">
        <input
          class="field"
          type="email"
          v-model="email"
          placeholder="Email"
          required
          oninvalid="this.setCustomValidity('Vui lòng nhập Email')"
          oninput="this.setCustomValidity('')"
        />
        <input
          class="field"
          type="password"
          v-model="password"
          placeholder="Mật khẩu"
          minlength="6"
          oninvalid="this.setCustomValidity('Mật khẩu từ 6 ký tự')"
          oninput="this.setCustomValidity('')"
        />
        <input type="submit" class="submit mt-4" value="Đăng nhập" />
      </form>
      <div class="text-center mt-5 mb-5">
        <router-link to="/register" class="register">Đăng ký</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TokenStorage from "../jwt/token-storage";

export default {
  name: "Login",

  data() {
    return {
      email: "hp@gmail.com",
      password: "123456",
      loginFail: false,
    };
  },

  methods: {
    async onSubmit(e) {
      e.preventDefault();
      const req = {
        email: this.email,
        password: this.password,
      };
      const res = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(req),
      });
      if (res.status === 200) {
        const data = await res.json();
        TokenStorage.ACCESS_TOKEN = data.access_token;
        this.$router.push({ name: "Home" });
      } else if (res.status === 400) {
        this.loginFail = true;
        this.password = "";
      }
    },
  },
  async created() {
    const token = TokenStorage.ACCESS_TOKEN;
    console.log(TokenStorage.isExpired(token))
    if (token === undefined || TokenStorage.isExpired(token)) {
      const res = await fetch("api/token/refresh", {
        method: "GET",
      });
      if (res.status === 200) {
        const data = await res.json();
        TokenStorage.ACCESS_TOKEN = data.access_token;
        this.$router.push({ name: "Home" });
      }
    } else {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>

<style scoped>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main {
  width: 400px;
  border-radius: 1.5em;
  box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
}

.sign {
  color: #8c55aa;
  font-weight: bold;
}

form {
  display: flex;
  flex-direction: column;
}

.field {
  color: rgb(82, 84, 87);
  letter-spacing: 1px;
  background: rgba(71, 70, 70, 0.04);
  padding: 10px 20px;
  border-radius: 5em;
  outline: none;
  border: 2px solid rgba(0, 0, 0, 0.02);
  margin: auto;
  text-align: center;
  margin-top: 20px;
}

.field:focus {
  border: 2px solid rgba(0, 0, 0, 0.18) !important;
}

.submit {
  cursor: pointer;
  border-radius: 5em;
  color: #fff;
  background: linear-gradient(to right, #9c27b0, #e040fb);
  border: none;
  padding: 10px 40px;
  margin: auto;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
}

.register {
  text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
  color: #8c55aa;
  text-decoration: none;
}
</style>
