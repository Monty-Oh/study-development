export const CHANGE_KEY_VALUE = 'CHANGE_KEY_VALUE';
export const INITIALIZE = 'INITIALIZE';

const mutations = {

  // 키-값에 해당되는 데이터들을 받아서 상태저장.
  [CHANGE_KEY_VALUE](state, {
    // 일일이 하나씩 저장한다.
    data:
      {holdyNm, begDt, holdySn, holdyTpCd, createdAt, createdBy, lastModifiedAt, lastModifiedBy}
  }) {
    state.holdyNm = holdyNm;
    state.begDt = begDt;
    state.holdySn = holdySn;
    state.holdyTpCd = holdyTpCd;
    state.createdAt = createdAt;
    state.createdBy = createdBy;
    state.lastModifiedAt = lastModifiedAt;
    state.lastModifiedBy = lastModifiedBy;
  },

  // 상태값 초기화
  [INITIALIZE](state) {
    state.holdyNm = '';
    state.begDt = null;
    state.holdySn = '';
    state.holdyTpCd = '';
    state.createdAt = null;
    state.createdBy = '';
    state.lastModifiedAt = null;
    state.lastModifiedBy = '';
  }
}

export default mutations;
