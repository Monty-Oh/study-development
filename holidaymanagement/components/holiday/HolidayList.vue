<template>
  <div>
    <holiday-list-buttons @onClickOpenModal="onClickOpenModal"></holiday-list-buttons>
    <holiday-list-jqx-grid @onClickJqxGridRow="onClickJqxGridRow"></holiday-list-jqx-grid>
    <modal v-if="modal" @onClickCloseModal="onClickCloseModal"></modal>
  </div>
</template>

<script>
import HolidayListJqxGrid from "@/components/holiday/HolidayListJqxGrid";
import HolidayListButtons from "@/components/holiday/HolidayListButtons";
import Modal from "@/components/common/Modal";

// editor store actions dispatch 용 상수들
import {CHANGE, INIT} from "../../store/editor";


export default {
  components: {
    HolidayListJqxGrid,
    HolidayListButtons,
    Modal
  },

  data() {
    return {
      // Modal을 열고 닫는 데이터
      modal: false,
    }
  },

  methods: {
    // 모달 닫는 이벤트
    onClickCloseModal() {
      // 만약 모달을 닫는다면 editor에 들어있던 값들을 모두 초기화한다.
      this.$store.dispatch({
        type: INIT
      })
      // 모달을 닫는다.
      this.modal = false;
    },

    // 모달 여는 이벤트
    onClickOpenModal() {
      this.modal = true;
    },

    // jqxgrid 행 클릭 수정 이벤트
    onClickJqxGridRow(data) {
      // jqxGrid 행 클릭으로부터 온 데이터를 사용해 editor의 내용들을 바꾼다.
      // 이는 Modal이 열렸을 때 데이터가 바인딩 된다.
      this.$store.dispatch({
        type: CHANGE,
        data
      })
      this.onClickOpenModal();
    }
  }
}
</script>
