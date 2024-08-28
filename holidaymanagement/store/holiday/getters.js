const getters = {
  // 객체 형태의 holiday를 배열로 바꿔서 return
  holidayList: state => {
    // 객체 상태의 HolidayList요소들을 배열 형식으로 바꿔서 출력한다.
    return state.holidayList.map((holiday) => {
      return [
        // 체크가 되어있다면 체크 그대로 출력하고, 만약 체크에 대한 정보가 없다면
        // false로 초기화시켜서 return 한다.
        holiday.check ? holiday.check : false,
        new Date(holiday.begDt),
        holiday.holdyNm,
        holiday.createdBy,
        new Date(holiday.createdAt),
        holiday.holdyTpCd,
        holiday.holdySn,
        holiday.lastModifiedAt,
        holiday.lastModifiedBy,
      ]
    }).sort((a, b) => a[1] - b[1]);
  },
}

export default getters;
