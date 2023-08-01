<!DOCTYPE html>
<template>
  <div id="user-home">
    <UserTopBar></UserTopBar>
    <UserPost></UserPost>
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

