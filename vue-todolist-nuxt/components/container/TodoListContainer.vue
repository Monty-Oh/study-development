<template>
  <todo-list
    :count="TodoItemsLength"
    :todoItems="fixedTodoItems"
    @storeChangeSelected="storeChangeSelected"
    @storeRemoveTodo="storeRemoveTodo"
    @storeToggleChecked="storeToggleChecked"
  ></todo-list>
</template>

<script>
import TodoList from "../TodoList";

// 리스트를 vuex getter로 받아오기 위한 메소드
import {mapGetters} from 'vuex';

// 스토어에서 해당 액션이름 import
import {CHANGE_SELECTED, DELETE_TODO, TOGGLE_CHECKED} from "~/store/todos";

export default {

  components: {
    TodoList
  },

  methods: {
    // store의 removeTodo 커밋 메소드
    storeRemoveTodo: function (id) {
      this.$store.dispatch({
        type: 'todos/' + DELETE_TODO,
        id,
      })
    },

    // store의 TOGGLE_CHECKED
    storeToggleChecked: function (id) {
      this.$store.dispatch({
        type: 'todos/' + TOGGLE_CHECKED,
        id
      })
    },

    // store의 현재 select 변경
    storeChangeSelected: function (selected) {
      this.$store.dispatch({
        type: 'todos/' + CHANGE_SELECTED,
        selected
      })
    }
  },

  computed: {
    // 수정된 TodoItems를 받아온다.
    ...mapGetters({
      fixedTodoItems: 'todos/fixedTodoItems',
    }),

    // 받아오는 수정된 TodoItems의 값에 따라 바뀌는 상태값.
    TodoItemsLength() {
      return this.fixedTodoItems.length;
    },
  }
}
</script>

<style>

</style>
