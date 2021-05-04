<template>
  <div>
    <user-profile></user-profile>
  </div>
</template>

<script>
import UserProfile from "@/components/UserProfile";
import {mapGetters} from "vuex";

export default {
  components: {
    UserProfile
  },
  created() {
    this.$store.dispatch({
      type: "FETCH_USER",
      id: this.$route.params.id,
    });
  },
  // computed: {
  //   ...mapGetters([
  //     'fetchedUser',
  //   ])
  // }
}
</script>

<style scoped></style>
