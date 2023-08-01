<template>
  <div id="app">
    <section>
      <nav class="navbar is-light" role="navigation" aria-label="main navigation">
        <div class="navbar-brand"></div>
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" href="/#">Home</a>
            <a class="navbar-item" @click="userHome">My Ideas</a>
          </div>
        </div>
      </nav>
    </section>

    <section class="content-wrapper">
      <div class="content">
        <section class="right-mashup">
          <!--        Picture Mashup        -->
          <section>
            <div class="sep20"></div>
            <div class="mashup-box">
              <div class="post-cell">
                <div class="post-info-name">View from</div>
                <div class="post-info">{{ post.destination }}</div>
              </div>
              <div class="mashup-pic">
                <b-carousel :autoplay="true" indicator-custom :indicator-inside="false">
                  <b-carousel-item v-for="(picUrl, index) in cityPictureList" :key="index">
                    <a>
                      <img :src="picUrl" style="width: 100%; height: 180px; object-fit: cover;" alt=""/>
                    </a>
                  </b-carousel-item>
                </b-carousel>
              </div>
            </div>
          </section>
          <!--        Weather Mashup        -->
          <section>
            <div class="sep20"></div>
            <div class="mashup-box">
              <div class="post-cell">
                <div class="post-info-name">Weather from</div>
                <div class="post-info">{{ post.destination }}</div>
              </div>
              <div class="mashup-weather">
                <LineChart :chart-data="cityWeather"/>
              </div>
            </div>
          </section>
        </section>

        <section class="main">
          <section id="post-main">
            <div class="sep20"/>
            <div class="box">
              <div class="header">
                <p class="author">Author: {{ post.username }}</p>
                <h1>{{ post.title }}</h1>
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
                <b-button
                    type="is-light"
                    v-for="(tag, index) in post.tags.split('|')"
                    :key="index"
                    class="tag-button"
                >
                  {{ tag }}
                </b-button>
              </div>
            </div>
          </section>
          <!--        Comment List        -->
          <section id="post-comment">
            <div class="sep20"/>
            <div class="box">
              <div class="cell">
                <strong>Comment</strong>
              </div>
              <div class="cell" v-for="(comment, index) in comments" :key="index">
                <table>
                  <tbody>
                  <tr>
                    <td class="avatar">
                      <img :src="require(`@/assets/user1.jpg`)" alt="null"/>
                    </td>
                    <td style="width: 2px; vertical-align: top"/>
                    <td style="width: auto; vertical-align: top; align-content: start">
                      <strong>{{ comment.username }}</strong>
                      <p>{{ comment.content }}</p>
                      <p>{{ comment.created_at }}</p>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <!--     Add a new comment     -->
          <section id="create-comment">
            <!--        <div class="right-bar" v-if="$store.state.isLogin"></div>-->
            <!--            <div class="box" v-show="!$store.state.isLogin">-->
            <div class="sep20"/>
            <div class="box" v-if="$store.state.isLogin">
              <div class="cell">
                <strong>Add a new comment</strong>
                <div class="fr">↑ Mind Your Language and Use Polite Expressions</div>
              </div>
              <div class="cell">
                <form>
                <textarea
                    v-model="newCommentText"
                    name="content"
                    maxlength="255"
                    style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 80px;"
                ></textarea>
                  <div class="sep10"></div>
                  <b-button type="is-success" class="super normal button" @click="createComment">Commit</b-button>
                </form>
              </div>
            </div>
            <div class="box" v-else>
              <h1>Please log in </h1>
            </div>
            <div class="sep20"/>
          </section>
        </section>
      </div>
    </section>

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
  </div>
</template>


<script>
import {apiCreateComment, apiGetAllPostDetail, apiGetTravelPicture, apiGetTravelWeather} from "@/api";
import LineChart from '../LineChart.vue'

export default {
  components: {
    LineChart
  },
  data() {
    return {
      post_id: 0,
      post: {
        comment_count: 0,
        destination: "",
        start_date: "2020-05-01",
        end_date: "2020-05-02",
        tags: [],
        title: "test",
        username: "guo",
        post_id: 0,
      },
      comments: [
        {
          comment_id: 0,
          content: "comment test",
          username: "yu",
          created_at: "2020-05-01",
        }
      ],
      cityPictureList: [],
      cityWeather: {
        labels: [],
        datasets: [
          {
            label: 'Min',
            backgroundColor: '#88cffc',
            data: []
          },
          {
            label: 'Max',
            backgroundColor: '#f36b6b',
            data: []
          }
        ]
      },
      newCommentText: "",
    };
  },

  // initialize the data
  mounted() {
    this.post_id = this.$route.query.post_id;
    console.log("post_id: " + this.post_id);
    this.loadData();
  },

  methods: {
    async loadData() {
      try {
        const postDetailResponse = await apiGetAllPostDetail(this.post_id);
        const resultData = postDetailResponse.data.data;
        this.comments = resultData.comments;
        this.post = resultData.post_detail;
        console.log("destination: " + this.post.destination)

        // After get postID, then getTravelPicture
        const travelPictureResponse = await apiGetTravelPicture(this.post.destination);
        this.cityPictureList = travelPictureResponse.data.data;
        console.log("cityPictures: " + JSON.stringify(this.cityPictureList));

        // After get postID, then getTravelWeather
        const weatherResponse = await apiGetTravelWeather(this.post.destination);
        this.cityWeather.labels = weatherResponse.data.date.map((dateStr) => {
          const dateObj = new Date(dateStr);
          const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // 月份从0开始，因此要+1，并且保证两位数字
          const day = String(dateObj.getDate()).padStart(2, '0'); // 保证日期是两位数字
          return `${month}-${day}`;
        });
        this.cityWeather.datasets[0].data = weatherResponse.data.temp_min;
        this.cityWeather.datasets[1].data = weatherResponse.data.temp_max;
        console.log("cityWeather: " + JSON.stringify(this.cityWeather));

      } catch (error) {
        alert("Failed to load data");
      }
    },
    userHome() {
      this.$router.push("/UserHome");
    },
    createComment() {
      // Get user input
      console.log(this.newCommentText);
      apiCreateComment(this.post_id, this.newCommentText)
          .then(res => {
            if (res.status === 200) {
              this.comments.push({
                content: this.newCommentText,
                username: this.$store.state.loginUsername,
                comment_id: null,
              })
              console.log("new comment: " + this.newCommentText);
              console.log("comments: " + this.comments)
              this.newCommentText = "";
            }
          })
          .catch({});
    }
  }
};
</script>

<style scoped>
textarea {
  -webkit-writing-mode: horizontal-tb !important;
  text-rendering: auto;
//color: -internal-light-dark-color(black, white); letter-spacing: normal; word-spacing: normal; text-transform: none; text-indent: 0; text-shadow: none; display: inline-block; text-align: start; -webkit-appearance: textarea;
//background-color: -internal-light-dark-color(white, black); -webkit-rtl-ordering: logical; flex-direction: column; resize: both; cursor: text; white-space: pre-wrap; overflow-wrap: break-word; margin: 0; font: 400 13.3333px Arial;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(169, 169, 169);
  border-image: initial;
  padding: 2px;
  width: 720px;
}

form {
  display: block;
  margin-top: 0;
}

.right-mashup {
  width: 300px;
  float: right;
  display: flex;
  flex-direction: column;
}

.sep20 {
  height: 20px;
}

.sep10 {
  height: 10px;
}

.content-wrapper {
  background-color: #e2e2e2;
  background-repeat: repeat-x, repeat-x;
  text-align: center;
}

.content {
  min-width: 600px;
  max-width: 1100px;
  margin: 0 auto;
}

.main {
  width: auto;
  margin: 0 320px 0 20px;
}

.box {
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e2e2e2;
}

.mashup-box {
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e2e2e2;
  border-radius: 5px;
  padding: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mashup-pic {
  height: 220px;
  width: 280px;
}

.mashup-weather {
  height: 200px;
  width: 280px;
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

.post-cell {
  padding: 10px;
  font-size: 14px;
  line-height: 120%;
  text-align: left;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
}

.table {
  display: table;
  border-collapse: separate;
  border-color: grey;
}

.tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
}

.tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}

.fr {
  float: right;
  text-align: right;
}

.h1 {
  font-size: 24px;
  font-weight: 500;
  line-height: 100%;
  margin: 0 0 0 0;
  padding: 0;
}

.author {
  color: #999;
}

.bottom {
  border-top: 1px solid rgba(0, 0, 0, 0.22);
  background-color: var(--box-background-color);
  text-align: center;
  color: #999;
  padding: 0 10px;
}

:root {
  --box-background-color: #fff;
  --box-background-alt-color: #f9f9f9;
  --box-background-hover-color: #fafafa;
  --box-foreground-color: #000;
  --box-border-color: #e2e2e2;
  --box-border-radius: 3px;
}

.inner {
  padding: 10px;
  font-size: 14px;
  line-height: 150%;
  text-align: left;
}

strong {
  font-weight: bold;
}

a.dark:active,
a.dark:link,
a.dark:visited {
  color: gray;
  text-decoration: none;
}

a:active,
a:link,
a:visited {
  color: #778087;
  text-decoration: none;
  word-break: break-word;
}

a {
  color: #000;
}

.avatar {
  width: 48px;
  vertical-align: top;
  align-self: center;
}

.tag-button {
  margin-right: 5px;
  font-size: 12px;
}

.post-info {
  margin: 5px 5px 5px 5px;
}

.post-info-name {
  margin: 5px 5px 5px 5px;
  font-weight: bold;
}

.is-active .al img {
  border: 10px solid #fff;
  filter: grayscale(0%);
}

.al img {
  border: 10px solid transparent;
  filter: grayscale(100%);
}

</style>