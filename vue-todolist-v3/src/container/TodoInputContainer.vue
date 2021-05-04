<template>
  <div>
    <TodoInput @storeAddTodo="storeAddTodo"/>
  </div>
</template>

<script>
import TodoInput from '../components/TodoInput';
import {ADD_TODO} from "../store/todos";

export default {
  components: {
    TodoInput
  },
  methods: {
    storeAddTodo(todo) {
      this.$store.commit({
        type: ADD_TODO,
        todo,
      });
    }
  }
}
</script>

<style></style>
