<!DOCTYPE html>
<template>
  <section id="forum-home">
    <TopBar></TopBar>
    <HomeTitle></HomeTitle>
    <AllPost></AllPost>
  </section>
</template>


<script>
import TopBar from "./ForumTopBar.vue";
import AllPost from "./AllPost.vue";
import HomeTitle from "./HomeTitle.vue";


export default {
  components: {
    TopBar,
    HomeTitle,
    AllPost,
  }
};
</script>

