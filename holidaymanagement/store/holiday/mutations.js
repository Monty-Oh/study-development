export const CHANGE_HOLIDAY_LIST = 'CHANGE_HOLIDAY_LIST'
export const SEARCH_HOLIDAY_LIST = 'SEARCH_HOLIDAY_LIST'

const mutations = {
  [CHANGE_HOLIDAY_LIST](state, {result}) {
    // holidayList의 변화가 일어날 때 마다 덮어씌운다.
    // 일일이 하나하나 지정한 이유는 grid의 다른 속성들이 같이 오기 때문.
    state.holidayList = result.map((item) => {
      return {
        holdySn: item.holdySn,
        holdyNm: item.holdyNm,
        begDt: item.begDt,
        holdyTpCd: item.holdyTpCd,
        createdAt: item.createdAt,
        createdBy: item.createdBy,
        lastModifiedAt: item.lastModifiedAt,
        lastModifiedBy: item.lastModifiedBy,

        // 체크가 없다면(DB에서 막 읽어온 참이면?) false로 지정하고 있다면 있는 그대로.
        check: item.check ? item.check : false,
      }
    });
  },
}

export default mutations;
