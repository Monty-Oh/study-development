export const CHANGE_TARGET_VALUE = 'CHANGE_VALUE'
export const INIT_STATE = 'INIT_STATE';

// 초기화하기 위한 초기상태값

const mutations = {
  // 해당되는 키값의 상태값을 value 값으로 바꾼다.
  [CHANGE_TARGET_VALUE](state, {target, value}) {
    state[target] = value;
  },

  // 모든 상태값들을 초기화한다.
  [INIT_STATE](state) {
    state.startDate = null;
    state.endDate = null;
    state.normalHoliday = false;
    state.deliverHoliday = false;
  }
}

export default mutations;
