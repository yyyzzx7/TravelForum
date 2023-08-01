<!DOCTYPE html>
<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create Your Travel Idea</p>
        <button
            type="button"
            class="delete"
            @click="$emit('close')"/>
      </header>
      <section class="modal-card-body">
        <b-field label="Title">
          <b-input
              v-model="title"
              type="text"
              :value="title"
              placeholder="Your title"
              required>
          </b-input>
        </b-field>
        <b-field label="Destination">
          <b-input
              v-model="destination"
              type="text"
              :value="destination"
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
              @icon-right-click="clearDate('startDate')"
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
              @icon-right-click="clearDate('endDate')"
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
            @click="$emit('close')"/>
        <b-button
            label="Create"
            type="is-primary"
            @click="createPost"/>
      </footer>
    </div>
  </form>
</template>


<script>
import {apiCreatePost} from "@/api";

export default {
  data() {
    return {
      startDate: new Date(),
      endDate: new Date(),
      title: '',
      destination: '',
      tags: [],
    }
  },
  methods: {
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    createPost() {
      this.startDate = this.formatDate(this.startDate);
      this.endDate = this.formatDate(this.endDate);
      // console.log(this.title, this.destination, this.startDate, this.endDate, this.tags);
      apiCreatePost(this.title, this.destination, this.startDate, this.endDate, this.tags)
          .then(res => {
            if (res.status === 200) {
              alert("Create Post Success")
              this.$emit('close');
            } else {
              alert("Create Post Failed")
            }
          })
          .catch(() => {
          })
    },
    clearDate(componentName) {
      if (componentName === 'startDate')
        this.startDate = null;
      if (componentName === 'endDate')
        this.endDate = null
    },
  }
}
</script>


<style>
.modal-card {
  height: 600px;
  width: 600px;
  overflow: visible;
}

.modal-card-body {
  overflow: visible;
}
</style>
