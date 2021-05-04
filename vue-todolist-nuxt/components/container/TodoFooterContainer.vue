<template>
  <todo-footer
    @storeClearTodos="storeClearTodos"
    @storeDeleteChecked="storeDeleteChecked"
  ></todo-footer>
</template>

<script>
import TodoFooter from "../TodoFooter";
// 스토어에서 해당 액션이름 import
import {CLEAR_TODOS, DELETE_CHECKED} from "~/store/todos";

export default {
  components: {
    TodoFooter
  },
  methods: {

    // 넘겨줄 함수, 리스트 모두 삭제
    storeClearTodos: function () {
      this.$store.dispatch({
        type: 'todos/' + CLEAR_TODOS
      })
    },

    // 넘겨줄 함수, CHECKED 되어있는 리스트 삭제
    storeDeleteChecked: function() {
      this.$store.dispatch({
        type: 'todos/' + DELETE_CHECKED
      })
    }
  }
}
</script>

<style>

</style>
