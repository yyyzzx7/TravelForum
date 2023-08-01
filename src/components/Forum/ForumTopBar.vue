<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand"></div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="/#">Home</a>
        <a class="navbar-item" @click="userHome">My Ideas</a>
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5"></p>
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <b-input v-model="searchInput" type="text" placeholder="Find travel ideas" style="width: 300px"/>
              <b-button @click="searchPost(searchInput, searchType)">Search</b-button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <b-radio v-model="searchType" native-value="tag">Tag</b-radio>
              <b-radio v-model="searchType" native-value="destination">Destination</b-radio>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar-end" v-if="$store.state.isLogin">
        <div class="navbar-item">
          <div class="buttons">
            <b-button type="is-info" outlined @click="logout">Log Out</b-button>
          </div>
        </div>
      </div>
      <div class="navbar-end" v-if="!$store.state.isLogin">
        <div class="navbar-item">
          <div class="buttons">
            <b-button type="is-info" outlined @click="register">Sign Up</b-button>
            <!--            <b-button type="is-info" outlined @click="login">Sign In</b-button>-->
            <div class="navbar-menu">
              <div class="navbar-end">
                <b-dropdown position="is-bottom-left" aria-role="menu" trap-focus>
                  <a class="navbar-item" slot="trigger" role="button">
                    <b-button type="is-info" outlined>Sign In</b-button>
                  </a>

                  <b-dropdown-item aria-role="menu-item" :focusable="false" custom paddingless>
                    <div class="modal-card" style="width:300px;">
                      <section class="modal-card-body">
                        <b-field label="Username">
                          <b-input v-model="username" placeholder="Your username" required></b-input>
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
                      </section>
                      <footer class="modal-card-foot">
                        <b-button type="is-primary" @click="login">Sign In</b-button>
                      </footer>
                    </div>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </nav>
</template>

<script>

import {apiSearchPost, apiUserLogin} from "@/api";

export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      searchType: "tag",
      searchInput: "",
    };
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    userHome() {
      if (this.$store.state.isLogin) {
        this.$router.push("/UserHome");
      } else {
        alert("Please login first!")
      }
    },
    // login() {
    //   this.$router.push("/Login");
    // },
    register() {
      this.$router.push("/Register");
    },
    login() {
      apiUserLogin(this.username, this.password)
          .then(res => {
            const result = res.data;
            if (result.data != null) {
              console.log(result.msg);
              this.$store.commit("login", this.username);
            } else {
              console.log(result.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
    searchPost(text, type) {
      console.log(text + " : " + type);
      apiSearchPost(text, type)
          .then(res => {
            console.log(JSON.stringify(res.data));
            if (res.status === 200) {
              const searchResult = res.data.data.posts;
              const searchCount = res.data.data.total;
              console.log("searchCount: " + searchCount);
              this.$store.commit("setSearchResult", searchResult);
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }

  }
};
</script>
