<template>
<div class="footer-wrapper">
  <div class="footer-container">
    <span class="footer-button" @click="clearTodo">Clear ALL</span>
  </div>
  <div class="footer-container">
    <span class="footer-button" @click="removeChecked">Remove Checked</span>
  </div>
</div>
</template>

<script>
export default {
  methods: {
    clearTodo() {
      this.$emit('storeClearTodos');
    },

    removeChecked() {
      this.$emit('storeDeleteChecked');
    }
  }
};
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
