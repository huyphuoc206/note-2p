<template>
  <div class="wrapper ms-3 me-3">
    <transition v-show="showLoginFail" name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container text-center">
            <p class="notification text-center">
              Email hoặc mật khẩu không chính xác
            </p>
            <button class="my-btn" @click="toggleModal">Quay lại</button>
          </div>
        </div>
      </div>
    </transition>
    <div class="main ps-3 pe-3">
      <h3 class="sign text-center pt-5 pb-3">Đăng nhập</h3>
      <form @submit="onSubmit">
        <input
          class="field"
          type="email"
          v-model="email"
          placeholder="Email"
          required
          oninvalid="this.setCustomValidity('Vui lòng nhập đúng cú pháp Email')"
          oninput="this.setCustomValidity('')"
        />
        <input
          class="field"
          type="password"
          v-model="password"
          placeholder="Mật khẩu"
          required
          minlength="6"
          oninvalid="this.setCustomValidity('Mật khẩu từ 6 ký tự')"
          oninput="this.setCustomValidity('')"
        />
        <button type="submit" class="my-btn mt-4">Đăng nhập</button>
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
      email: "",
      password: "",
      showLoginFail: false,
    };
  },

  methods: {
    toggleModal() {
      this.showLoginFail = !this.showLoginFail;
    },

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
        this.showLoginFail = true;
        this.password = "";
      }
    },
  },
  async created() {
    const token = TokenStorage.ACCESS_TOKEN;
    if (token === undefined) {
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
.wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper::before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(148, 179, 236, 0.5);
  pointer-events: none;
}

.main {
  width: 400px;
  border-radius: 1.5em;
  background: #fff;
}

.sign {
  color: #4b2354;
  font-weight: bold;
}

form {
  display: flex;
  flex-direction: column;
}

.notification {
  color: #4b2354;
  font-weight: bold;
}
.field {
  color: #4b2354;
  letter-spacing: 1px;
  padding: 15px 20px;
  border-radius: 20px;
  outline: none;
  border: 2px solid rgba(0, 0, 0, 0.02);
  margin: auto;
  text-align: center;
  margin-top: 20px;
  font-weight: bold;

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
  border-radius: 5em;
  color: #fff;
  background: #bd59d4;
  outline: none;
  border: none;
  padding: 15px 35px;
  margin: auto;

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

.my-btn:hover {
  background-color: #4b2354;
  box-shadow: 0 10px 30px 0px rgba(189, 89, 212, 0.8);
  -moz-box-shadow: 0 10px 30px 0px rgba(189, 89, 212, 0.8);
  -webkit-box-shadow: 0 10px 30px 0px rgba(189, 89, 212, 0.8);
  -o-box-shadow: 0 10px 30px 0px rgba(189, 89, 212, 0.8);
  -ms-box-shadow: 0 10px 30px 0px rgba(189, 89, 212, 0.8);
}

.register {
  text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
  color: #8c55aa;
  text-decoration: none;
}
</style>
