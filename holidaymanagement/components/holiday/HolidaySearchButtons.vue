<template>
  <div class="holiday-buttons-wrapper">
    <div class="buttons-wrapper">
      <button @click="onClickSearch"><i class="fas fa-search"></i>조회</button>
      <button @click="onClickInit"><i class="fas fa-redo"></i>초기화</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 부모컴포넌트로부터 받은 메소드 이벤트 발생. 클릭 시 store의 holiday/SEARCH 액션으로 연결
    onClickSearch() {
      this.$emit('onClickSearch');
    },
    // 마찬가지로 부모 컴포넌트로부터 받은 이벤트 발생
    onClickInit() {
      this.$emit('onClickInit');
    }
  }
}
</script>

<style scoped>
  .holiday-buttons-wrapper {
    width: 100%;
    display: block;
    text-align: center;
    margin: 20px 0px 20px 0px;
  }
  .buttons-wrapper{
    display: inline-block;
  }
</style>
