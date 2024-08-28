
// 가상 DB 서버가 있다는 가정하의 작업들.
// 쿼리문과 조건을 붙여서 날리면 답이 온다는 가정으로 만듬.
// 정리된 데이터가 return
export function filterData(holidayList, {startDate, endDate, normalHoliday, deliverHoliday}) {
  let result = filterByDate(startDate, endDate, holidayList);
  return filterByType(normalHoliday, deliverHoliday, result);
}

/*
* 분리해든 function들
*/

// 날짜를 기준으로 필터링.
export function filterByDate(startDate, endDate, result) {
  let nextHolidayList = [];

  // 1차 필터링. date를 기준으로 필터링

  // 둘 다 비어있을 때. 모두 가져온다.
  if (startDate === 'null' && endDate === 'null') {
    nextHolidayList = result;
  }
  // endDate가 비어있을 때. startDate 이후는 모두 불러온다.
  else if (endDate === 'null' && startDate !== 'null') {
    const formattedStartDate = new Date(startDate);

    // startDate보다 큰 요소들을 필터링함.
    nextHolidayList = result.filter((holiday) =>
      formattedStartDate <= new Date(holiday.begDt));
  }

  // startDate가 비어있을 때 endDate 이전은 모두 불러온다.
  else if (startDate === 'null' && endDate !== 'null') {
    const formattedEndDate = new Date(endDate);

    // endDate보다 작은 요소를 필터링함
    nextHolidayList = result.filter((holiday) =>
      new Date(holiday.begDt) <= formattedEndDate);
  }
  // 둘다 데이터 값이 있을 때 사이를 불러온다.
  else {
    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);

    // startDate <= 요소들 <= endDate 필터링함.
    nextHolidayList = result.filter((holiday) =>
      formattedStartDate <= new Date(holiday.begDt) && new Date(holiday.begDt) <= formattedEndDate);
  }

  return nextHolidayList;
}

// 타입을 기준으로 필터링
export function filterByType(normalHoliday, deliverHoliday, result) {
  normalHoliday = normalHoliday === 'true';
  deliverHoliday = deliverHoliday === 'true';
  //1: 일반휴일 2: 배송휴일
  let nextHolidayList = [];
  // 일반휴일만 체크
  if (normalHoliday && !deliverHoliday) {
    nextHolidayList = result.filter((holiday) => holiday.holdyTpCd === '일반휴일');
  }
  // 배송휴일만 체크
  else if (!normalHoliday && deliverHoliday) {
    nextHolidayList = result.filter((holiday) => holiday.holdyTpCd === '배송휴일');
  }
  // 모두 체크거나 모두 아니거나.
  else {
    nextHolidayList = result;
  }

  return nextHolidayList;
}
