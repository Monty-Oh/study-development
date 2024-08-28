<template>
  <div class="buttons-wrapper">
    <button @click="onClickOpenModal">등록</button>
    <button @click="onClickDelete">삭제</button>
  </div>
</template>

<script>
import { DELETE } from "../../store/holiday";

export default {
  methods: {
    // 삭제 버튼 클릭
    onClickDelete() {
      // 체크된 데이터들에 대해 삭제 액션을 디스패치한다.
      this.$store.dispatch({
        type: DELETE
      })
    },
    // Modal을 여는 부모컴포넌트로부터 온 이벤트 발생
    onClickOpenModal() {
      this.$emit('onClickOpenModal');
    }
  }
}
</script>

<style scoped>

</style>
