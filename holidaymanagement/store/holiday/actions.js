import {CHANGE_HOLIDAY_LIST} from './mutations';

export const SEARCH = 'SEARCH';
export const INIT = 'INIT';
export const CHANGE = 'CHANGE';
export const DELETE = 'DELETE';
export const ADD_HOLDY = 'ADD_HOLDY';
export const EDIT_HOLDY = 'EDIT_HOLDY';

// 비동기 작업 actions
const actions = {

  // SEARCH 버튼을 클릭했을 때. startDate, endDate가 null인지에 따라 달라짐.
  async [SEARCH](context) {
    try {
      // 비동기작업!! 작업에 필요한 기능들은 모두 api로 호출

      // 서버로부터 데이터를 전송 요청함. 응답의 data에 있는 holidatyList를 꺼낸다.
      // const result = (await this.$axios.get('/apis/holdy')).data.holidayList;

      // 필터링 작업을 한다.
      // let nextHolidayList = loadDBJson(result, this.state.search);

      const result = await this.$axios.get(`/apis/holdy?startDate=${this.state.search.startDate}&endDate=${this.state.search.endDate}&normalHoliday=${this.state.search.normalHoliday}&deliverHoliday=${this.state.search.deliverHoliday}`);
      //가져온 데이터를 바로 store 의 state 에 저장한다.
      context.commit({
        type: CHANGE_HOLIDAY_LIST,
        result: result.data.holidayList,
      });

    } catch (e) {
      console.error('actions/SEARCH 에러');
      console.error(e);
    }
  },

  // holidayList 초기화
  [INIT](context) {
    // 빈 배열을 state 에 저장한다.
    context.commit({
      type: CHANGE_HOLIDAY_LIST,
      result: [],
    })
  },

  // state.holiday change 이벤트. 전달받은 values 배열을 state 에 저장한다.
  [CHANGE](context, {values}) {
    context.commit({
      type: CHANGE_HOLIDAY_LIST,
      result: values,
    })
  },

  // checked 된 상태값들에 대해 DB에 삭제 요청을 한다. 성공했을 때 mutations로 넘어감.
  async [DELETE](context) {
    // 클라이언트에만 있는 상태값 속성중 하나인 'check' 때문에
    // 클라이언트에서 제거해야할 데이터를 제거하고 나머지를 저장 요청을 보낸다.

    // 1. holidayList에서 check가 true이면서 배송휴일들은 모두 삭제시켜버린다.
    let nextData = context.state.holidayList.filter((holiday) =>
      !(holiday.check && holiday.holdyTpCd === '배송휴일'));

    // 2. 남은 holidayList에서 check가 true(일반휴일)인 요소들은 이름을 ''로 만들고 check를 푼다.
    nextData = nextData.map((holiday) => (holiday.check) ? {
        begDt: holiday.begDt,
        holdyNm: '',
        createdBy: holiday.createdBy,
        createdAt: holiday.createdAt,
        holdyTpCd: holiday.holdyTpCd,
        holdySn: holiday.holdySn,
        lastModifiedAt: holiday.lastModifiedAt,
        lastModifiedBy: holiday.lastModifiedBy,
      } :
      // 만약 아니라면 그대로 넣는다.
      {
        begDt: holiday.begDt,
        holdyNm: holiday.holdyNm,
        createdBy: holiday.createdBy,
        createdAt: holiday.createdAt,
        holdyTpCd: holiday.holdyTpCd,
        holdySn: holiday.holdySn,
        lastModifiedAt: holiday.lastModifiedAt,
        lastModifiedBy: holiday.lastModifiedBy,
      }
    );

    /*
    * 비동기 작업(db 삭제 요청)
    * 일반휴일은 휴일명만 사라지고,
    * 배송휴일은 data까지 사라진다.
    * 뽑아낸 checkedHolidays의 휴일 유형에 따라 다른 로직을 수행하는 백엔드가 있어야함
    * 여기서는 프론트부분에서 처리.
    */
    // 새로운 holdyList로 저장 요청을 보낸다.
    await this.$axios.post('/apis/holdy', {
      data: nextData,
    })

    // 완료 됐다면 새로운 데이터를 다시 받아와서 그대로 저장한다.
    const result = await this.$axios.get(`/apis/holdy?startDate=${this.state.search.startDate}&endDate=${this.state.search.endDate}&normalHoliday=${this.state.search.normalHoliday}&deliverHoliday=${this.state.search.deliverHoliday}`);

    // 받아온 데이터로 store에 저장한다.
    context.commit({
      type: CHANGE_HOLIDAY_LIST,
      result: result.data.holidayList
    });
  },

  // 휴일 생성 이벤트 발생.
  async [ADD_HOLDY](context, {begDt, holdyTpCd, holdyNm, createdAt}) {
    // holdyTpCd가 일반휴일이면 이미 있는지 체크(일반휴일 or ''), 배송휴일이면 이미 일반휴일이 있는지 체크.
    try {
      // 전달받은 데이터들로 휴일 생성 요청을 보낸다.
      const result = await this.$axios.post('/apis/holdy/item', {
        data: {
          begDt: new Date(begDt),
          holdyTpCd,
          holdyNm,
          createdAt,
          createdBy: 'monty_addTest'
        }
      })
      // 이미 일반 배송 휴일이 있을 때와 같은 에러일 경우 status 202를 받는다.
      if (result.status === 202)
        return [true, result.data];
      else if(result.status === 200) {

        // 문제가 발생하지 않았다면, 조건에 맞는 조회를 다시 요청한다.
        const result = await this.$axios.get(`/apis/holdy?startDate=${this.state.search.startDate}&endDate=${this.state.search.endDate}&normalHoliday=${this.state.search.normalHoliday}&deliverHoliday=${this.state.search.deliverHoliday}`);
        context.commit({
          type: CHANGE_HOLIDAY_LIST,
          result: result.data.holidayList,
        });
        // 문제 미발생 시 false 리턴
        return [false];
      }
    } catch (e) {
      console.log('vuex ADD_HOLDY Error');
      console.error(e);
    }
  },

  // 수정 비동기 작업
  async [EDIT_HOLDY](context, {holdyNm, holdySn, holdyTpCd}) {
    // 테스트용
    const lastModifiedBy = 'monty_fix_test';
    console.log('here');
    try {
      // 전달받은 데이터들로 수정 요청과 함께 데이터를 보낸다.
      const result = await this.$axios.put('/apis/holdy/item', {
        data: {
          lastModifiedBy,
          holdyNm,
          holdySn,
          holdyTpCd,
        }
      });

      // 요청은 제대로 처리했으나 문제가 발생했을 때
      if (result.status === 202)
        return [true, result.data];

      else if(result.status === 200) {
        // 제대로 처리됐다면 store에 저장
        const result = await this.$axios.get(`/apis/holdy?startDate=${this.state.search.startDate}&endDate=${this.state.search.endDate}&normalHoliday=${this.state.search.normalHoliday}&deliverHoliday=${this.state.search.deliverHoliday}`);

        context.commit({
          type: CHANGE_HOLIDAY_LIST,
          result: result.data.holidayList,
        });
        return [false];
      }

    } catch (e) {
      console.log('holiday/EDIT_HOLDY error')
      console.error(e);
    }
  }
}

export default actions;
