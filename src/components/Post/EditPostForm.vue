<!DOCTYPE html>
<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Your Travel Idea</p>
        <button
            type="button"
            class="delete"
            @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <b-field label="Title">
          <b-input
              v-model="title"
              type="text"
              placeholder="Your title"
              required>
          </b-input>
        </b-field>
        <b-field label="Destination">
          <b-input
              v-model="destination"
              type="text"
              placeholder="Your destination"
              required>
          </b-input>
        </b-field>
        <b-field label="Start Date">
          <b-datepicker
              v-model="startDate"
              :show-week-number="false"
              :locale="undefined"
              placeholder="Click to select start date..."
              icon="calendar-today"
              :icon-right="startDate ? 'close-circle' : ''"
              icon-right-clickable
              trap-focus>
          </b-datepicker>
        </b-field>
        <b-field label="End Date">
          <b-datepicker
              v-model="endDate"
              :show-week-number="false"
              :locale="undefined"
              placeholder="Click to select end date..."
              icon="calendar-today"
              :icon-right="endDate ? 'close-circle' : ''"
              icon-right-clickable
              trap-focus>
          </b-datepicker>
        </b-field>
        <b-field label="Tags">
          <b-taginput
              v-model="tags"
              ellipsis
              icon="label"
              placeholder="Add a tag"
              aria-close-label="Delete this tag">
          </b-taginput>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button
            label="Close"
            @click="$emit('close')"></b-button>
        <b-button
            label="Edit"
            type="is-info"
            @click="editPost"></b-button>
      </footer>
    </div>
  </form>
</template>


<script>
import {apiEditPost} from "@/api";

export default {
  props: ['toEditData'],
  data() {
    return {
      postId: this.toEditData.post_id,
      title: this.toEditData.title,
      destination: this.toEditData.destination,
      startDate: new Date(this.toEditData.start_date),
      endDate: new Date(this.toEditData.end_date),
      tags: this.toEditData.tags,
    }
  },
  mounted() {
    console.log("toEditData", JSON.stringify(this.toEditData));
  },
  methods: {
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    editPost() {
      this.startDate = this.formatDate(this.startDate);
      this.endDate = this.formatDate(this.endDate);
      apiEditPost(this.postId, this.title, this.destination, this.startDate, this.endDate, this.tags)
          .then(res => {
            if (res.status === 200) {
              alert("Edit Post Success")
              this.$emit('close');
              // window.location.reload();
            } else {
              alert("Edit Post Failed")
            }
          })
          .catch(() => {
          })
    },
  }
}
</script>


<style scoped>
.modal-card {
  height: 600px;
  width: 600px;
  overflow: visible;
}

.modal-card-body {
  overflow: visible;
}
</style>
