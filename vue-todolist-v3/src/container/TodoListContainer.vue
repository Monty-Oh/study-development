<template>
  <TodoList
    :count="count"
    :todoItems="todoItems"
    @storeRemoveTodo="storeRemoveTodo"
    @storeToggleChecked="storeToggleChecked"
  />
</template>

<script>
import TodoList from "../components/TodoList";
import {mapState} from 'vuex';
import {DELETE_TODO, TOGGLE_CHECKED} from "../store/todos";

export default {
  components: {
    TodoList
  },
  methods: {
    // store의 removeTodo 커밋 메소드
    storeRemoveTodo: function (id) {
      this.$store.commit({
        type: DELETE_TODO,
        id,
      })
    },
    // store의 TOGGLE_CHECKED
    storeToggleChecked: function (id) {
      this.$store.commit({
        type: TOGGLE_CHECKED,
        id
      })
    }
  },
  computed: {
    // localComputed: () => 'test',
    ...mapState({
      todoItems: state => state.todos.todoItems,
      count: state => state.todos.count,
    })
  }
}
</script>

<style>

</style>
