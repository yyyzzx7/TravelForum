<!DOCTYPE html>
<template>
  <div>
    <template>
      <div class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" href="/#">Back</a>
        </div>
      </div>
    </template>
    <template>
      <div id="Wrapper">
        <div class="content">
          <div id="main">
            <div class="sep20"></div>
            <div class="box">
              <section class="modal-card-body">
                <b-field label="E-Mail">
                  <b-input v-model="email" placeholder="E-Mail" required></b-input>
                </b-field>
                <b-field label="Username">
                  <b-input v-model="username" placeholder="Username" required></b-input>
                </b-field>
                <b-field label="Password">
                  <b-input type="password" password-reveal placeholder="Your password" required v-model="password"></b-input>
                </b-field>
                <b-field label="Confirmed Password">
                  <b-input type="password" password-reveal placeholder="Confirm Your password" required
                           v-model="password2"></b-input>
                </b-field>
              </section>
              <footer class="modal-card-foot">
                <button class="button is-primary" @click="register">Sign Up</button>
              </footer>
            </div>
          </div>
        </div>
        <div class="c"></div>
        <div class="sep20"></div>
      </div>
    </template>
  </div>
</template>


<script>
import {apiUserRegister} from "@/api";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password2: "",
    };
  },
  methods: {
    register() {
      apiUserRegister(this.username, this.password, this.password2, this.email)
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              this.$buefy.snackbar.open({
                message: 'Sign up successful!',
                type: 'is-success',
                position: 'is-top',
                duration: 2000,
                queue: false,
                actionText: 'OK',
                indefinite: false,
                onAction: () => {
                  console.log('OK');
                }
              });
              this.$router.push('./');
            }
          })
          .catch(() => {
            this.$buefy.snackbar.open({
              message: 'Please try again.',
              type: 'is-danger',
              position: 'is-top',
              duration: 2000,
              queue: false,
              actionText: 'OK',
              indefinite: false,
              onAction: () => {
                console.log('OK');
              }
            });
            // alert("failed");
          });
    }
  }
};
</script>


<style>
.box {
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(175, 175, 175, 0.1);
  border-bottom: 1px solid #e2e2e2;
}

.header {
  padding: 10px;
  font-size: 15px;
  line-height: 120%;
  text-align: left;
  border-bottom: 1px solid #e2e2e2;
  overflow: auto;
}

a:active,
a:link,
a:visited {
  color: #778087;
  text-decoration: none;
  word-break: break-word;
}

.fr {
  float: right;
  text-align: right;
}

.sep20 {
  height: 10px;
}

.inner {
  padding: 10px;
  font-size: 14px;
  line-height: 150%;
  text-align: left;
}

div {
  display: block;
}

:root {
  --box-background-color: #fff;
  --box-background-alt-color: #f9f9f9;
  --box-background-hover-color: #fafafa;
  --box-foreground-color: #000;
  --box-border-color: #e2e2e2;
  --box-border-radius: 3px;
}

#Wrapper {
  text-align: center;
  background-color: #000000;
  background-repeat: repeat-x;
}

body {
  padding: 0;
  margin: 0;
  font-family: helvetica neue, luxi sans, dejavu sans, segoe ui,
  hiragino sans gb, microsoft yahei, sans-serif;
}

.sep20 {
  height: 20px;
}

.content {
  min-width: 400px;
  max-width: 500px;
  margin: 0 auto;
}
</style>
