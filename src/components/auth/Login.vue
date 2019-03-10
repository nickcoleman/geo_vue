<template>
  <div class="login container">
    <form class="card-panel" @submit.prevent="login">
      <h2 class="center deep-purple-text">Login</h2>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password">
      </div>
      <div class="red-text center" v-if="feedback">{{feedback}}</div>
      <div class="field">
        <button class="btn deep-purple">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        this.feedback = null;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(({ user }) => {
            // returns cred which contains user
            this.$router.push({ name: "GMap" });
          })
          .catch(err => {
            this.feedback = err.message;
          });
      } else {
        this.feedback = "Email and password is required";
      }
    }
  }
};
</script>

<style>
.login {
  max-width: 400px;
  margin-top: 60px;
}
.login h2 {
  font-size: 2.4em;
}
.login .field {
  margin-bottom: 16px;
}
</style>