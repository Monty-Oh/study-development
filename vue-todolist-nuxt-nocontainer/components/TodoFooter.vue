<template>
  <div class="footer-wrapper">
    <div class="footer-container">
      <span class="footer-button" @click="storeClearTodos">Clear ALL</span>
    </div>
    <div class="footer-container">
      <span class="footer-button" @click="storeDeleteChecked">Remove Checked</span>
    </div>
  </div>
</template>

<script>
// 스토어에서 해당 액션이름 import
import {CLEAR_TODOS, DELETE_CHECKED} from "~/store/todos";

export default {
  methods: {
    // 넘겨줄 함수, 리스트 모두 삭제
    storeClearTodos: function () {
      this.$store.dispatch({
        type: 'todos/' + CLEAR_TODOS
      })
    },

    // 넘겨줄 함수, CHECKED 되어있는 리스트 삭제
    storeDeleteChecked: function () {
      this.$store.dispatch({
        type: 'todos/' + DELETE_CHECKED
      })
    }
  }
}
</script>

<style scoped>
.footer-wrapper {
  display: block;
}

.footer-container {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
  display: inline-block;
}

.footer-button {
  color: #e20303;
  cursor: pointer;
}
</style>
