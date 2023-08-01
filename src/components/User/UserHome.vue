<template>
  <div id="user-home">
    <UserTopBar/>
    <UserPost/>
  </div>
</template>

<script>
import UserTopBar from "@/components/User/UserTopBar.vue";
import UserPost from "@/components/User/UserPost.vue";

export default {
  components: {
    UserTopBar,
    UserPost,
  }
};
</script>

