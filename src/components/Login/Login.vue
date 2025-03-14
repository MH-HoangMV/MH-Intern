<template>
  <section class="login-container">
    <div class="login-inner" ref="container-login">
      <div class="circle circle-one"></div>
      <div class="form-container">
        <img
          src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
          alt="illustration"
          class="illustration"
        />
        <h1 class="opacity">LOGIN</h1>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(onSubmit)">
            <p class="auth-message" v-if="!isAuthorized">
              Email or password is incorrect
            </p>
            <ValidationProvider
              name="email"
              rules="email|required"
              v-slot="{ errors }"
            >
              <input
                type="text"
                placeholder="EMAIL"
                v-model="email"
                default="viethoangmai@gmail.com"
              />
              <span class="err-message">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              name="password"
              rules="passwordStrength|required"
              v-slot="{ errors }"
            >
              <input
                type="password"
                placeholder="PASSWORD"
                v-model="password"
                ref="ip-password"
              />
              <span class="err-message">{{ errors[0] }}</span>
            </ValidationProvider>
            <button @submit.prevent="handleSubmit(onSubmit)" class="opacity">
              SUBMIT
            </button>
          </form>
        </ValidationObserver>
        <div class="register-forget opacity">
          <a href="">REGISTER</a>
          <a href="">FORGOT PASSWORD</a>
        </div>
      </div>
      <div class="circle circle-two"></div>
    </div>
    <div class="theme-btn-container"></div>
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { emailSchema, passwordSchema } from "@/utils/validate/Login";
extend("passwordStrength", {
  validate(value) {
    try {
      passwordSchema.validateSync(value);
      return true;
    } catch (err) {
      return err.message;
    }
  },
  message: "Password is invalid",
});
extend("email", {
  validate(value) {
    try {
      emailSchema.validateSync(value);
      return true;
    } catch (err) {
      return err.message;
    }
  },
  message: "Please, enter a valid email address.",
});

extend("required", {
  ...required,
  message: "This field is required",
});

export default {
  name: "LoginPage",

  data() {
    return {
      timer: null,
      email: "vhm@gmail.com",
      password: "12345678H",
      isAuthorized: true,
    };
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  methods: {
    onSubmit() {
      if (this.email === "vhm@gmail.com" && this.password === "12345678H") {
        localStorage.setItem("access", true);
        this.$router.go(0);
      } else {
        this.isAuthorized = false;
      }
    },
  },

  mounted() {
    const refLogin = this.$refs["container-login"];
    this.timer = setTimeout(() => {
      refLogin.style.translate = "0% 0%";
    }, 0);
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: var(--color);
}

h1 {
  font-size: 2.5rem;
}
.login-container {
  background: #cccccc1e;
}
.login-inner {
  position: relative;
  translate: 0% 50%;
  transition: all 0.2s linear;
  width: 400px;
  margin: 0 auto;
  margin-top: 100px;
}
.form-container {
  border: 1px solid hsla(0, 0%, 65%, 0.158);
  box-shadow: 0 0 36px 1px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  backdrop-filter: blur(20px);
  z-index: 99;
  padding: 2rem;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
}

.err-message,
.auth-message {
  color: rgb(228, 71, 71);
  font-size: 1.3rem;
  position: relative;
  z-index: 1;
}
.auth-message {
  margin: 10px 0;
  font-size: 1.6rem;
}

.login-container form input {
  display: block;
  padding: 10px;
  width: 100%;
  margin: 2rem 0;
  color: var(--color);
  outline: none;
  background-color: #9191911f;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  letter-spacing: 0.8px;
  font-size: 15px;
  backdrop-filter: blur(15px);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
}

.login-container form input:focus {
  box-shadow: 0 0 16px 1px rgba(0, 0, 0, 0.2);
  animation: wobble 0.3s ease-in;
  -webkit-animation: wobble 0.3s ease-in;
}

.login-container form button {
  background-color: var(--primary-color);
  color: #d8c7c7;
  display: block;
  padding: 13px;
  border-radius: 5px;
  outline: none;
  font-size: 18px;
  letter-spacing: 1.5px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.1s ease-in-out;
  border: none;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  -webkit-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  -ms-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
}

.login-container form button:hover {
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.15);
  transform: scale(1.02);
  -webkit-transform: scale(1.02);
  -moz-transform: scale(1.02);
  -ms-transform: scale(1.02);
  -o-transform: scale(1.02);
}

.circle {
  width: 8rem;
  height: 8rem;
  background: var(--primary-color);
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  position: absolute;
}

.illustration {
  position: absolute;
  top: -25%;
  right: -2px;
  width: 70%;
}

.circle-one {
  top: 0;
  left: 0;
  z-index: -1;
  transform: translate(-45%, -45%);
  -webkit-transform: translate(-45%, -45%);
  -moz-transform: translate(-45%, -45%);
  -ms-transform: translate(-45%, -45%);
  -o-transform: translate(-45%, -45%);
}

.circle-two {
  bottom: 0;
  right: 0;
  z-index: -1;
  transform: translate(45%, 45%);
  -webkit-transform: translate(45%, 45%);
  -moz-transform: translate(45%, 45%);
  -ms-transform: translate(45%, 45%);
  -o-transform: translate(45%, 45%);
}

.register-forget {
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
}
.opacity {
  opacity: 0.6;
}

.theme-btn-container {
  position: absolute;
  left: 0;
  bottom: 2rem;
}

.theme-btn {
  cursor: pointer;
  transition: all 0.3s ease-in;
}

.theme-btn:hover {
  width: 40px !important;
}

@keyframes wobble {
  0% {
    transform: scale(1.025);
    -webkit-transform: scale(1.025);
    -moz-transform: scale(1.025);
    -ms-transform: scale(1.025);
    -o-transform: scale(1.025);
  }
  25% {
    transform: scale(1);
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
  }
  75% {
    transform: scale(1.025);
    -webkit-transform: scale(1.025);
    -moz-transform: scale(1.025);
    -ms-transform: scale(1.025);
    -o-transform: scale(1.025);
  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
  }
}
</style>
