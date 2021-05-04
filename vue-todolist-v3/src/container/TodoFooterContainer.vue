<template>
  <TodoFooter
    @storeClearTodos="storeClearTodos"
    @storeDeleteChecked="storeDeleteChecked"
  />
</template>

<script>
import TodoFooter from "../components/TodoFooter";
import {CLEAR_TODOS, DELETE_CHECKED} from "../store/todos";

export default {
  components: {
    TodoFooter
  },
  methods: {
    storeClearTodos: function () {
      this.$store.commit({
        type: CLEAR_TODOS
      })
    },

    storeDeleteChecked: function() {
      this.$store.commit({
        type: DELETE_CHECKED
      })
    }
  }
}
</script>

<style>

</style>
