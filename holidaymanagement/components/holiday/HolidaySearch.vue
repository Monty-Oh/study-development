<template>
  <div>
    <div class="holiday-search">
      <div class="holiday-date">
        <div class="box-wrapper">
          <div class="text-box">
            조회년월
          </div>
          <div class="input-box">
            <input v-model="startDate" type="date" @change="onChange('startDate')">
            ~
            <input v-model="endDate" type="date" @change="onChange('endDate')">
          </div>
        </div>
      </div>
      <div class="holiday-type">
        <div class="box-wrapper">
          <div class="text-box">
            휴일유형
          </div>
          <div class="input-box">
            <button @click="onClickEveryHoliday">전체</button>
            <input type="checkbox" v-model="normalHoliday" @change="onChange('normalHoliday')"> 일반휴일
            <input type="checkbox" v-model="deliverHoliday" @change="onChange('deliverHoliday')"> 배송휴일
          </div>
        </div>
      </div>
    </div>
    <holiday-search-buttons @onClickSearch="onClickSearch" @onClickInit="onClickInit"></holiday-search-buttons>
  </div>
</template>
<script>
// store와 관련된 작업은 현재 컴포넌트에서 한다.
// 이벤트 발생과 관련된 메소드는 자식컴포넌트 HolidaySearchButtons로 넘긴다.
import HolidaySearchButtons from "./HolidaySearchButtons";

// store에 dispatch할 actions를 import한다.
import * as holidayActions from '../../store/holiday';
import * as searchActions from "../../store/search";

export default {
  // 컴포넌트 선언
  components: {
    HolidaySearchButtons,
  },

  // 사용할 데이터 필드, 시작날짜, 끝 날짜, 일반휴일, 배송휴일
  data() {
    return {
      startDate: null,
      endDate: null,
      normalHoliday: false,
      deliverHoliday: false,
    }
  },

  methods: {
    // store의 search 모듈의 해당 target의 키값에 value를 넣는다.
    onChange(target) {
      this.$store.dispatch({
        type: searchActions.CHANGE_VALUE,
        target,
        // data 안에 들어있는 상태값을 키값으로 호출
        value: this[target],
      })
    },

    // 전체 버튼 클릭 이벤트
    onClickEveryHoliday() {
      // 전체를 클릭하면 모두 true로 바꾸고 이를 반영한다.
      this.deliverHoliday = true;
      this.normalHoliday = true;
      this.onChange('deliverHoliday');
      this.onChange('normalHoliday');
    },

    // 조회 버튼 클릭 이벤트, HolidaySearchButtons컴포넌트로 넘긴다.
    onClickSearch() {
      // holiday/index.js 로 만들어둔 type로 dispatch한다.
      this.$store.dispatch({
        type: holidayActions.SEARCH,
      })
    },

    // input버튼
    onClickInit() {
      // holidayList에 담겨있는 리스트들을 모두 비워낸다.
      this.$store.dispatch({
        type: holidayActions.INIT,
      });

      // search에 담겨있는 상태값들을 모두 비워낸다.
      this.$store.dispatch({
        type: searchActions.INIT,
      })

      // 현재 컴포넌트가 가지고 있는 상태값들도 모두 초기화시킨다.
      this.startDate = null;
      this.endDate = null;
      this.normalHoliday = false;
      this.deliverHoliday = false;
    }
  }
}
</script>

<style scoped>
.holiday-search {
  border: 2.3px solid black;
  width: 100%;
  /*height: 2.5rem;*/
  text-align: center;
  display: block;
}

.holiday-date {
  display: inline-block;
  width: 49%;
}

.holiday-type {
  display: inline-block;
  width: 49%;
}

.box-wrapper {
  display: block;
}

.text-box {
  height: 100%;
  display: inline-block;
  text-align: left;
  padding: 5px 20px 5px 5px;
}

.input-box {
  display: inline-block;
}
</style>
