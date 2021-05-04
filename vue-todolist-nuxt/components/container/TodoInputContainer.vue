<template>
  <div>
    <todo-input @storeAddTodo="storeAddTodo"></todo-input>
  </div>
</template>

<script>
import TodoInput from '../TodoInput';
// 스토어에서 해당 액션이름 import
import {ADD_TODO} from "~/store/todos";

export default {
  components: {
    TodoInput
  },
  methods: {

    // 넘겨줄 함수, 해당 todo값을 input값으로 받아 새로운 item 생성
    storeAddTodo(todo) {
      this.$store.dispatch({
        type: 'todos/' + ADD_TODO,
        todo,
      });
    }
  }
}
</script>

<style></style>
