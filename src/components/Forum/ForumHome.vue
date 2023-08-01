<template>
  <div id="forum-home">
    <TopBar/>
    <HomeTitle/>
    <AllPost/>
  </div>
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

