<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h3>휴일 등록</h3>
              <hr>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div>
                현재 날짜 : {{todayDate}}
              </div>
              <div>
                <div v-if="isAdd">
                  기간 : <input v-model='inputBegDt' type="date">
                </div>
                <div v-else>
                  기간 : {{formatDate(inputBegDt)}}
                </div>
                <div>
                  휴일 유형 :
                  <input class="modal-radio" type="radio" id="normal" value="일반휴일" v-model="inputHoldyTpCd">
                  <label for="normal">일반휴일</label>
                  <input class="modal-radio" type="radio" id="delivery" value="배송휴일" v-model="inputHoldyTpCd">
                  <label for="delivery">배송휴일</label>
                </div>
                <!-- 한글 입력 시 v-model 경우 입력문제가 발생하기에, v-bind와 v-on:change를 같이 쓰기를 권장함. -->
                휴일명 :
                <textarea
                  class="textarea-holdy-nm"
                  v-model="inputHoldyNm"
                  :inputHoldyNm="inputHoldyNm"
                  :placeholder="inputHoldyNm"
                  @change="onChangeTextArea"
                ></textarea>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="onClickCloseModal">
                닫기
              </button>
              <button class="modal-default-button" @click="onClickSaveButton">
                저장
              </button>
            </slot>
            <div v-if="!isAdd">
              <p>등록자: {{editorState.createdBy}}</p>
              <p>등록일: {{formatDateHour(editorState.createdAt)}}</p>
              <p>수정자: {{editorState.lastModifiedBy}}</p>
              <p>수정일: {{formatDateHour(editorState.lastModifiedAt)}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex';
import {ADD_HOLDY, EDIT_HOLDY} from "../../store/holiday";

export default {
  // 휴일에 대한 정보를 props로 받아오는 경우, 휴일을 수정하는 경우
  // 휴일에 대한 정보를 받아오지 않는 경우, 휴일을 새로 생성하는 경우
  // props: ['inputBegDt'],
  data() {
    return {
      // 현재 Modal의 목적. 수정인지 추가인지를 출력.
      isAdd: true,

      // 만약 수정모드라면 null이 아닌 특정값이 있다. 이 id값으로 수정요청을 보낸다.
      isEditholdySn: null,

      // input 데이터들
      inputBegDt: null,
      inputCreatedAt: null,
      inputHoldyTpCd: '일반휴일',
      inputHoldyNm: '',

      // 화면상에 출력할 날짜. modal에서만 쓰임.
      todayDate: '',
    }
  },

  // store eidtor에 들어있는 상태값들을 받는다.
  computed: {
    ...mapGetters({
      editorState: 'editor/editInfo',
    }),
  },

  created() {
    // 오늘의 날짜를 만든다.
    this.todayDate = this.formatDate(new Date());

    // 만약 store에서 editor 데이터를 가져왔다면, data값들을 모두 해당 상태값으로 바꾼다.
    if (this.editorState.begDt !== null) {
      this.inputBegDt = this.editorState.begDt
      this.inputHoldyTpCd = this.editorState.holdyTpCd
      this.inputCreatedAt = this.editorState.createdAt
      this.inputHoldyNm = this.editorState.holdyNm
      this.isEditholdySn = this.editorState.holdySn
      // 이 때 수정모드이므로 isAdd 데이터는 false이다.
      this.isAdd = false;
    }
  },

  methods: {
    // modal 닫는 이벤트
    onClickCloseModal() {
      // 부모컴포넌트로부터 받은 이벤트 실행
      this.$emit('onClickCloseModal');
    },

    // textArea 변경 이벤트
    onChangeTextArea(e) {
      // v-model시 한글입력은 버그 발생. v-bind와 v-on을 직접 지정
      this.inputHoldyNm = e.target.value;
    },

    // 저장 클릭 시 이벤트 발생. 입력값이 제대로 들어와 있는지 검사한다.
    // 만약 일반휴일이 지정되어있지 않은 날짜에 배송휴일을 저장하려하면 alert 뜨게 해야함.
    async onClickSaveButton() {
      if (this.inputBegDt === null || this.inputHoldyNm === '') alert('입력하지 않은 칸이 있습니다!');
      // 스토어 액션으로 new date(등록일), begDt, holdyNm, holdyTpCd, 넘긴다.
      else {
        try {
          // 등록모드 일 때
          if (this.isAdd) {
            // 서버로 요청을 보내 결과값을 받는다.
            const [error, message] =
              await this.$store.dispatch({
                type: ADD_HOLDY,
                createdAt: new Date(),
                begDt: this.inputBegDt,
                holdyNm: this.inputHoldyNm,
                holdyTpCd: this.inputHoldyTpCd,
              });

            // 만약 error라면(true) 해당 메시지를 띄운다.
            if (error) alert(message);

            // 정상적으로 처리가 되었다면 Modal을 닫는다.
            else this.onClickCloseModal();
          }
          // 수정모드 일 때
          else if (!this.isAdd) {
            //서버로부터 결과값을 받는다.
            const [error, message] =
            await this.$store.dispatch({
              type: EDIT_HOLDY,
              holdyNm: this.inputHoldyNm,
              holdyTpCd: this.inputHoldyTpCd,
              holdySn: this.isEditholdySn
            });
            // 위와 동일
            if(error) alert(message);
            else this.onClickCloseModal();
          }
        } catch (e) {
          console.log('Modal.vue - onClickSaveButton() 에러')
          console.error(e);
        }
      }
    },

    // Date 형식을 YYYY-MM-DD 형식으로 출력한다.
    formatDate(date) {
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    },

    // Date 형식을 YYYY-MM-DD MM:SS
    formatDateHour(date) {
      // 함수 재활용해서 불러온 다음 뒤에 MM:SS 만 추가적으로 붙여준다.
      return this.formatDate(date) + ' ' + date.getMinutes() + ':' + date.getSeconds();
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-radio {
  margin-left: 1rem;
}

.textarea-holdy-nm {
  width: 100%;

}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-footer {
  margin-bottom: 4rem;
}
</style>
