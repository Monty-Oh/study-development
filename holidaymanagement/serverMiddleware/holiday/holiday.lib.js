// testDB.json 데이터 작업 라이브러리. [상태코드, 데이터] 값으로 통일함.
// add, delete, update에 관한 데이터들


// add 작업을 하고 완료된 데이터를 return 한다.
export const AddHoldy = function (holidayList, {begDt, holdyTpCd, holdyNm, createdAt, createdBy}) {
  let nextHolidayList = [...holidayList]
  let result = [];
  if (holdyTpCd === '일반휴일') {
    result = checkEmptyNormalHoliday(nextHolidayList, begDt, holdyNm);
  } else if (holdyTpCd === '배송휴일') {
    result = checkEmptyDeliverHoliday(nextHolidayList, begDt);
  }
  if (result[0] === 200) {
    nextHolidayList = nextHolidayList.concat({
      begDt,
      holdyNm,
      createdBy,
      createdAt,
      holdyTpCd,

      // 임시추가
      holdySn: 100,
      lastModifiedAt: createdAt,
      lastModifiedBy: createdBy
    });
    return nextHolidayList;
  }
  return result;
}


// 일반휴일일 경우 체크함. 비어있는 일반휴일이 있는지, 이미 있는지..
function checkEmptyNormalHoliday(holidayList, begDt, holdyNm) {
  // 내보낼 새로운 HolidayList.
  let nextHolidayList = [...holidayList];
  // 복사한 holidayList에 대해 작업한다.
  for (let i = 0; i < nextHolidayList.length; i++) {
    // 만약 기간이 같고, 일반휴일이 이미 있을때
    if (begDt === nextHolidayList[i].begDt && nextHolidayList[i].holdyTpCd === '일반휴일') {
      // 하지만 휴일명이 빈 string ('') 라면, 이미 지웠지만 남아있는 데이터.
      if (nextHolidayList[i].holdyNm === '') {
        // 이름만 새롭게 바꿔주고 return 한다.
        nextHolidayList[i].holdyNm = holdyNm;
        return nextHolidayList;
      } else if (nextHolidayList[i].holdyNm !== '') {
        return [202, '이미 등록된 일반휴일이 있습니다.']
      }
    }
  }
  // 모두 통과하면 새롭게 데이터를 넣는다.
  return [200, 'addNew'];
}

// 배송휴일인 경우 체크하는 함수.
function checkEmptyDeliverHoliday(holidayList, begDt) {
  // 1. 먼저 이미 배송휴일이 있는지부터 검사한다.
  for (let i = 0; i < holidayList.length; i++) {
    if (holidayList[i].begDt === begDt && holidayList[i].holdyTpCd === '배송휴일')
      return [202, '이미 등록된 배송휴일이 있습니다.'];
  }

  // 2. 일반 휴일이 먼저 등록되어있는지 체크한다. 이 때 빈 문자열('')이면 안된다.
  for(let i = 0; i < holidayList.length; i++) {
    if(holidayList[i].begDt === begDt) {
      // 기간이 같고, 일반휴일이며, 삭제한 흔적('')이 없어야 새로운 데이터로 추가한다.
      if(holidayList[i].holdyTpCd === '일반휴일' && holidayList[i].holdyNm !== '') {
        return [200, 'addNew']
      }
    }
  }

  // 모두 거치지 않았다면. 등록되어 있는 일반휴일이 없는 것이다.
  return [202, '먼저, 해당날짜로 등록된 일반휴일이 있어야합니다.']
}


// 수정 로직
// 1. 만약 찾은 holdySn의 holdyTpCd 값이 다르면 복잡해진다.
// 1-1. 일반휴일 -> 배송휴일 일 경우, 못바꾼다.
// 1-2. 배송휴일 -> 일반휴일 일 경우, 기존 일반휴일을 찾아 holdyNm과 modifiedAt을 바꾼다.
// 2. 만약 holdySn와 holdyTpCd의 값이 같다면, modifedAt, holdyNm만 바꿔준다.
export function EditHolidayList(holidayList, lastModifiedBy, holdyNm, holdySn, holdyTpCd) {
  let target = null;
  // 바꿔야할 타겟을 탐색.
  for(let i = 0; i < holidayList.length; i++) {
    if(holidayList[i].holdySn === holdySn) {
      target = holidayList[i];
      break;
    }
  }

  // 만약 휴일 유형 변경이 없다면 그냥 바꿔달라는대로 바꾸면 된다.
  if(target.holdyTpCd === holdyTpCd) {
    return EditHolidayList_SameHoldyTpCd(holidayList, holdySn, holdyNm)
  }
  // 만약 다른 경우
  else {
    // 일반 -> 배송의 경우 막는다.
    if(holdyTpCd === '배송휴일')
      return [202, '일반휴일에서 배송휴일로 변경은 불가합니다. 일반 휴일을 따로 추가해주세요'];
    // 배송 -> 일반
    else
      return EditHolidayList_ChangeDeliverToNormal(holidayList, holdySn, holdyNm, target.begDt)
  }
}

// 만약 배송 -> 일반의 경우
function EditHolidayList_ChangeDeliverToNormal(holidayList, holdySn, holdyNm, begDt) {
  // 1. 일반배송을 찾는다. ''일때와 데이터값이 있을떄로 나뉨.
  // 1-1. ''일때 덮어씌운다. 기존은 삭제
  // 1-2. ''이 아니라면 return error
  let normal = searchNormalHoldyByBegDt(holidayList, begDt);
  if(normal[1].holdyNm === '') {
    let nextHolidayList = holidayList.map((item) => item.holdySn !== holdySn);
    nextHolidayList = nextHolidayList.map((item) => {
      if(normal[1].begDt === begDt) {
        return {
          ...normal[1],
          holdySn,
          holdyNm,
          lastModifiedAt: new Date(),
          lastModifiedBy: 'monty_fix_test'
        }
      }
      else return item;
    });
    return [200, nextHolidayList];
  }
  else {
    return [202, '이미 일반 휴일이 존재합니다.'];
  }
}

// 해당 holidayList 안에 begDt가 같은 일반 휴일이 있는지 체크. 있으면 [true, 해당 데이터]
// 없다면 [false]
function searchNormalHoldyByBegDt(holidayList, begDt) {
  for(let i = 0; i < holidayList.length; i++) {
    if(holidayList[i].begDt === begDt && holidayList[i].holdyTpCd === '일반휴일')
      return [true, holidayList[i]];
  }
  return [false]
}

function EditHolidayList_SameHoldyTpCd(holidayList, holdySn, holdyNm) {
    const nextHolidayList = holidayList.map((holdy) => {
      if(holdy.holdySn === holdySn)
        return {
          ...holdy,
          holdyNm,
          lastModifiedAt: new Date(),
          lastModifiedBy: 'monty_fix_test',
        }
      else return holdy;
    });
    return [200, nextHolidayList];
}
