<template>
<div class="footerWrapper">
  <div class="footerContainer">
    <span class="footerBtn" @click="clearTodo">Clear ALL</span>
  </div>
  <div class="footerContainer">
    <span class="footerBtn" @click="removeChecked">Remove Checked</span>
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
.footerWrapper {
  display: block;
}

.footerContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
  display: inline-block;
}

.footerBtn {
  color: #e20303;
  cursor: pointer;
}
</style>
