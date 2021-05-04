<template>
  <div>
    <p v-for="(item, index) in fetchedJobs" :key="index">
      <a :href="item.url">{{ item.title }}</a>
      <small>{{ item.domain }}</small>
    </p>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters([
      'fetchedJobs'
    ]),
  },
  created() {
    this.$store.dispatch({
      type: 'FETCH_STATE',
      menu: 'jobs',
    })
  },
}
</script>

<style scoped>

</style>