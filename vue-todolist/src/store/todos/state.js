// state
const state = {
  // 예시 더미 데이터
  todoItems: [
    {
      id: 0,
      todo: '0번째 테스트, checked: true',
      checked: true
    },
    {
      id: 1,
      todo: '1번째 테스트, checked: false',
      checked: false
    }
  ],
  // 다음에 올 Id
  currentId: 2,

  // 선택자
  selected: 'all',
}

export default state;
