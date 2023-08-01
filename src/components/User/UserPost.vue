<template>
  <section>

    <div class="content-wrapper">
      <div class="content">
        <div class="sep20"/>
        <b-button type="is-success" active focused @click="createPost" class="top-box">
          <p style="font-weight: bold; font-size: 20px; text-align: center; flex: 1;">
            Welcome {{ $store.state.loginUsername }}!&nbsp;&nbsp;&nbsp;&nbsp;Click here to create your travel idea!
          </p>
        </b-button>

        <div class="box" v-for="(post, i) in userPost" :key="i">
          <section class="main">
            <div class="box">
              <div class="post-cell">
                <h1>Title: {{ post.title }}</h1>
              </div>
              <div class="post-cell">
                <div class="post-info-name">Destination:</div>
                <div class="post-info">{{ post.destination }}</div>
              </div>
              <div class="post-cell">
                <div class="post-info-name">Date:</div>
                <div class="post-info">{{ post.start_date }} ~ {{ post.end_date }}</div>
              </div>
              <div class="post-cell">
                <div class="post-info-name">Tags:</div>
                <b-button type="is-light" v-for="(tag, index) in post.tags" :key="index" class="tag-button">
                  {{ tag }}
                </b-button>
              </div>
            </div>
            <!--          <div class="manage-box">-->
            <div class="buttons">
              <b-button type="is-success is-light" class="manage-button" @click="checkPost(i)">Info</b-button>
              <b-button type="is-info is-light" class="manage-button" @click="editPost(i)">Edit</b-button>
              <b-button type="is-danger is-light" class="manage-button" @click="deletePost(i)">Delete</b-button>
            </div>
          </section>
        </div>
      </div>
      <div class="c"></div>
      <div class="sep20"></div>
    </div>
    <section class="bottom">
      <div class="content">
        <div class="inner">
          <div class="sep20"></div>
          <div class="fr"></div>
          <strong>
            <a href="/" class="dark" target="_self">Home</a>
            <span class="snow"> · </span>
            <a href="/UserHome" class="dark" target="_self">My Idea</a>
          </strong>
          <div class="sep20"></div>
          <p>Travel Forum - ICOM6034 - Group L</p>
        </div>
      </div>
    </section>
  </section>
</template>


<script>
import {apiDeletePost, apiGetUserPost} from "@/api";
import CreatePostForm from "@/components/Post/CreatePostForm";
import EditPostForm from "@/components/Post/EditPostForm.vue";

export default {
  data() {
    return {
      selectId: 0,
      userPost: [
        {
          post_id: 0,
          destination: "",
          start_date: "2020-05-01",
          end_date: "2020-05-02",
          tags: [],
          title: "test",
          username: "test",
        }
      ],
    };
  },
  mounted() {
    this.getUserPost();
  },
  methods: {
    getUserPost() {
      apiGetUserPost()
          .then(res => {
            this.userPost = res.data.data;
            this.userPost.sort((a, b) => b.post_id - a.post_id);
            console.log("Execute getUserPost");
          })
          .catch(() => {
          });
    },
    createPost() {
      this.$buefy.modal.open({
        parent: this,
        component: CreatePostForm,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        events: {
          close: () => {
            this.getUserPost();  // refresh
          }
        }
      })
    },
    editPost(index) {
      this.$buefy.modal.open({
        parent: this,
        component: EditPostForm,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        props: {
          toEditData: this.userPost[index]
        },
        events: {
          close: () => {
            this.getUserPost();  // refresh
          }
        }
      });
    },
    deletePost(index) {
      // this.getUserPost();
      console.log("post_id", this.userPost[index].post_id);
      apiDeletePost(this.userPost[index].post_id)
          .then(res => {
            if (res.status === 200) {
              this.userPost.splice(index, 1);
              this.getUserPost();  // refresh
              console.log("Delete post_id", this.userPost[index].post_id);
            }
            alert("Delete Post Failed");
          })
          .catch(() => {
          });
    },
    checkPost(index) {
      this.$router.push({
        path: '/PostDetail',
        query: {
          post_id: this.userPost[index].post_id
        }
      });
    },

  }
};
</script>


<style scoped>
.content-wrapper {
  background-color: #e2e2e2;
  background-repeat: repeat-x, repeat-x;
  text-align: center;
}

.content {
  min-width: 600px;
  max-width: 800px;
  margin: 0 auto;
}

.box {
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  border-top: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
}

.top-box {
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  border-top: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  height: 50px;
  margin: 10px 0 10px 0;
  display: flex;
  align-items: center;
  width: 100%;
}

table {
  -webkit-border-horizontal-spacing: 0;
  -webkit-border-vertical-spacing: 0;
  border-top-width: 0;
  border-right-width: 0;
  border-bottom-width: 0;
  border-left-width: 0;
  width: 100%;
}

a:active,
a:link,
a:visited {
  color: #778087;
  text-decoration: none;
  word-break: break-word;
}

img[Attributes] {
  width: 18px;
  vertical-align: middle;
}

.cell {
  padding: 10px;
  font-size: 14px;
  line-height: 120%;
  text-align: left;
  border-bottom: 1px solid #e2e2e2;
}

.main {
  width: auto;
  margin: 0 200px 0 20px;
  display: contents;
  flex-direction: row;
}

.manage-box {
  width: 0;
  display: flex;
  flex-direction: row;
}

.manage-box > * {
  margin: 0 10px 0 10px;
  height: 30px;
  width: 60px;
}

.c {
  clear: both;
}

.sep20 {
  height: 10px;
}

body {
  padding: 0;
  margin: 0;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", "Segoe UI",
  "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
}

:root {
  --box-background-color: #fff;
  --box-background-alt-color: #f9f9f9;
  --box-background-hover-color: #fafafa;
  --box-foreground-color: #000;
  --box-border-color: #e2e2e2;
  --box-border-radius: 3px;
}

table {
  display: table;
  border-collapse: separate;
  border-spacing: 2px;
  border-color: grey;
}

tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
}

tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}

td[Attributes] {
  width: 110px;
  text-align: -webkit-left;
}

.post-cell {
  padding: 8px;
  font-size: 14px;
  line-height: 100%;
  text-align: left;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
}

.post-cell h1 {
  font-size: 20px;
  font-weight: bold;
  margin: 5px 5px 5px 5px;
  align-content: center;
}

.post-info {
  margin: 5px 5px 5px 5px;
}

.post-info-name {
  align-items: center;
  margin: 5px 5px 5px 5px;
  font-weight: bold;
  font-size: 14px;
}

.tag-button {
  margin-right: 5px;
  font-size: 13px;
}

.manage-button {
  font-weight: normal;
  width: 90px;
  height: 30px;
}

.bottom {
  border-top: 1px solid rgba(0, 0, 0, 0.22);
  background-color: var(--box-background-color);
  text-align: center;
  color: #999;
  padding: 0 10px;
}

</style>