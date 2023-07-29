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
              type="text"
              :value="title"
              placeholder="Your title"
              required>
          </b-input>
        </b-field>
        <b-field label="Destination">
          <b-input
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
              @icon-right-click="clearDate"
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
              @icon-right-click="clearDate"
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
    createPost() {
      this.$buefy.toast.open({
        message: 'Post created successfully',
        type: 'is-success'
      })
      this.$emit('close')
    }
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