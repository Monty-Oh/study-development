<template>
  <TodoList
      :count="TodoItemsLength"
      :todoItems="fixedTodoItems"
      @storeChangeSelected="storeChangeSelected"
      @storeRemoveTodo="storeRemoveTodo"
      @storeToggleChecked="storeToggleChecked"
  />
</template>

<script>
import TodoList from "../components/TodoList";
import {mapGetters} from 'vuex';
import {CHANGE_SELECTED, DELETE_TODO, TOGGLE_CHECKED} from "../store/todos";

export default {

  components: {
    TodoList
  },

  methods: {
    // store의 removeTodo 커밋 메소드
    storeRemoveTodo: function (id) {
      this.$store.dispatch({
        type: DELETE_TODO,
        id,
      })
    },

    // store의 TOGGLE_CHECKED
    storeToggleChecked: function (id) {
      this.$store.dispatch({
        type: TOGGLE_CHECKED,
        id
      })
    },

    // store의 현재 select 변경
    storeChangeSelected: function (selected) {
      this.$store.dispatch({
        type: CHANGE_SELECTED,
        selected
      })
    }
  },

  computed: {
    ...mapGetters([
      'fixedTodoItems',
    ]),
    TodoItemsLength() {
      return this.fixedTodoItems.length;
    },
  }
}
</script>

<style>

</style>
