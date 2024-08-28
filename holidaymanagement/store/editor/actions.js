export const CHANGE = "CHANGE";
export const INIT = "INIT";

import {CHANGE_KEY_VALUE, INITIALIZE} from './mutations';

const actions = {
  // 키-값을 바꾸는 액션. 받은 데이터 그대로 mutations에 넘긴다.
  // 비동기 작업 할 일이 없음.
  [CHANGE](context, {data}) {
    context.commit({
      type: CHANGE_KEY_VALUE,
      data,
    });
  },

  // 상태값 초기화 시키는 액션. 비동기작업 없음.
  [INIT](context) {
    context.commit({
      type: INITIALIZE
    })
  }
}

export default actions;
