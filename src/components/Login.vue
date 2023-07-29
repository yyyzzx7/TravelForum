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
                <b-field label="Username">
                  <b-input v-model="username" placeholder="Username" required></b-input>
                </b-field>
                <b-field label="Password">
                  <b-input
                      type="password"
                      password-reveal
                      placeholder="Your password"
                      required
                      v-model="password"
                  ></b-input>
                </b-field>

                <b-checkbox>Remember Me</b-checkbox>
              </section>
              <footer class="modal-card-foot">
                <button class="button is-primary is-centered" @click="login">Sign In</button>
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
import {userLogin} from "@/api";

export default {
  data() {
    return {
      password: "",
      username: "",
      email: "",
    };
  },
  methods: {
    login() {
      userLogin(this.username, this.password)
          .then(res => {
            console.log(res)
            const {data} = res.data;
            if (data != null) {
              this.$store.commit("login", data.username);
              this.$router.push('./');
            } else {
              alert("User not found");
            }
          })
          .catch(() => {
            alert("User not found");
          });
    }
  }
};
</script>


<style scoped>
.box {
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
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

.cell {
  padding: 10px;
  font-size: 14px;
  line-height: 120%;
  text-align: left;
  border-bottom: 1px solid #e2e2e2;
}

.left-bar {
  width: 0;
  float: left;
}

.Rightbar {
  width: 270px;
  float: right;
  margin-right: 20px;
}

.main {
  width: auto;
  margin: 0 310px 0 20px;
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

#Top {
  text-align: center;
  background-color: var(--box-background-color);
  height: 44px;
  font-size: 15px;
  font-weight: 500;
  background-size: 44px 44px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.22);
  padding: 0 20px;
}

#Wrapper {
  text-align: center;
  background-color: #e2e2e2;
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
  max-width: 800px;
  margin: 0 auto;
}
</style>