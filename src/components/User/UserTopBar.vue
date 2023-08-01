<!DOCTYPE html>
<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand"></div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="/#">Home</a>
        <a class="navbar-item" @click="userHome">My Ideas</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
    };
  },
  methods: {
    userHome() {
      this.$router.push("/UserHome");
    }
  }
};
</script>
