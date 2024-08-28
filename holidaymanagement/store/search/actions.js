import { CHANGE_TARGET_VALUE, INIT_STATE } from './mutations';

export const CHANGE_VALUE = 'CHANGE_VALUE';
export const INIT = 'INIT';

const actions = {

  // 키-값에 해당되는 값들을 mutations로 넘긴다. 비동기작업 없음.
  [CHANGE_VALUE](context, { target, value }) {
    context.commit({
      type: CHANGE_TARGET_VALUE,
      target,
      value
    })
  },

  // init하는 액션
  [INIT](context) {
    context.commit({
      type: INIT_STATE
    })
  }
}

export default actions;
