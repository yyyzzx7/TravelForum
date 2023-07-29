<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-6">
      <article class="tile is-child ">
        <div class="box" style="margin: 10px; width: auto" v-for="(post, index) in posts" :key="index">
          <article class="media">
            <div class="media-content">
              <div>
                <p>{{ post.username }}</p>
                <strong style="font-size: 25px">Title: {{ post.title }}</strong>
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
      </article>
    </div>
  </div>
</template>


<script>
import {getAllPost} from "@/api";

export default {
  data() {
    return {
      posts: [
        {
          comment_count: 0,
          destination: "https://www.baidu.com",
          start_date: "2020-05-01",
          end_date: "2020-05-02",
          tags: [],
          title: "test",
          username: "guo",
          post_id: 0,
        }
      ]
    };
  },
  mounted() {
    // get all post after mounted
    getAllPost()
        .then(res => {
          const resultData = res.data.data;
          console.log(resultData);
          this.posts = resultData.posts;
        })
        .catch(() => {
        });
  },

  methods: {
    accessPostDetail(index) {
      this.$router.push({
        path: '/PostDetail',
        query: {
          post_id: this.posts[index].post_id
        }
      });
    }
  },

};
</script>

<style scoped>

.tile.is-ancestor {
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
}
</style>