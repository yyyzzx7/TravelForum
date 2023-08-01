<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <div class="tile is-child">
        <div class="top-box">
          <p style="font-weight: bold; font-size: 20px; text-align: center; flex: 1;">
            {{ postCount }} records in total
          </p>
        </div>
        <div class="box" style="margin: 10px; width: 800px;" v-for="(post, index) in posts.slice().reverse()" :key="index">
          <article class="media">
            <div class="media-content">
              <div>
                <p>{{ post.username }}</p>
                <strong style="font-size: 25px">{{ post.title }}</strong>
              </div>
              <div>
                <strong style="font-size: 18px">Destination: {{ post.destination }}</strong>
              </div>
              <div>
                <strong style="font-size: 18px">Date: {{ post.start_date }} ~ {{ post.end_date }}</strong>
              </div>
              <nav class="level is-mobile">
                <div class="level-left">
                  <a class="level-item">
                      <span class="icon is-small">
                        <i class="fas fa-comment-dots"></i>
                      </span>
                    {{ post.comment_count }}
                  </a>
                </div>
              </nav>
            </div>
            <div class="media-right">
              <a class="navbar-item" slot="trigger" role="button">
                <b-button type="is-info" outlined @click="accessPostDetail(index)">More Info</b-button>
              </a>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {apiGetAllPost} from "@/api";

export default {
  computed: {
    posts() {
      return this.$store.state.searchResult;
    },
    postCount() {
      return this.$store.state.searchCount;
    }
  },
  // data() {
  //   return {
  //     posts: [
  //       {
  //         comment_count: 0,
  //         destination: "Default Destination",
  //         start_date: "2020-05-01",
  //         end_date: "2020-05-02",
  //         tags: [],
  //         title: "Default Title",
  //         username: "GUO",
  //         post_id: 0,
  //       }
  //     ],
  //     postCount: 0,
  //   };
  // },
  mounted() {
    // get all post after mounted
    apiGetAllPost()
        .then(res => {
          const resultData = res.data.data.posts;
          const resultCount = res.data.data.total;
          this.posts = resultData;
          this.postCount = resultCount;
          this.$store.commit("setSearchResult", resultData);
        })
        .catch(() => {
        });
  },

  methods: {
    accessPostDetail(index) {
      this.$router.push({
        path: '/PostDetail',
        query: {
          post_id: this.posts.slice().reverse()[index].post_id
        }
      });
    }
  },

};
</script>


<style scoped>
.tile.is-ancestor {
  margin: 0 0 0 0;
}

.tile.is-child {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>