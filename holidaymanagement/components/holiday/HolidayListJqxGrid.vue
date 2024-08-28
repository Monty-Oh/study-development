<template>
  <div>
    <client-only>
      <JqxGrid
        :width="'100%'"
        :source="dataAdapter"
        :columns="columns"
        :pageable="true"
        :altrows="true"
        :pageSize="5"
        :autoHeight="true"
        :editable="true"
        @cellvaluechanged="onChange"
        @celldoubleclick="onClickRow"
        ref="holidayGrid"
      />
      <!--      :sortable="true"-->
    </client-only>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import {CHANGE} from "@/store/holiday"

export default {
  data() {
    return {
      // beforeCreate의 this.source와 연결됨.
      dataAdapter: new jqx.dataAdapter(this.source, {
        // load가 성공했을 때
        loadComplete: function (data) {
          console.log("data is Loaded")
        },

        // load가 실패했을 때
        loadError: function (xhr, status, error) {
          console.log("load error")
        }
      }),

      // 테이블에 대한 정보
      columns: [
        {text: '체크', columntype: 'checkbox', datafield: 'check', width: 50},
        {text: '기간', datafield: 'begDt', width: 150, editable: false, cellsformat: 'yyyy-MM-dd'},
        {text: '휴일명', datafield: 'holdyNm', width: 130, editable: false},
        {text: '등록자', datafield: 'createdBy', width: 120, editable: false},
        {text: '등록일시', datafield: 'createdAt', width: 200, editable: false, cellsformat: 'yyyy-MM-dd hh:mm'},
        {text: '휴일유형', datafield: 'holdyTpCd', width: 130, editable: false},
        // 숨겨진 값들
        {datafield: 'holdySn', hidden: true},
        {datafield: 'lastModifiedAt', hidden: true},
        {datafield: 'lastModifiedBy', hidden: true},
      ]
    }
  },

  // store로부터 holidayList를 가져온다. 이는 watch가 지켜보게 된다.
  computed: {
    ...mapGetters({
      holidayList: 'holiday/holidayList'
    })
  },

  // 데이터 변화를 감지, 특정 로직을 수행한다.
  watch: {
    // holidayList에 대한 변화가 감지된다면, methods의 reBindData 메소드가 실행된다.
    holidayList: 'reBindData',
  },

  beforeCreate() {
    // JqxGrid 설정
    this.source = {
      // 초기값 데이터. 조회 버튼을 누르기 전까지는 ㅣㅂ어있다.
      localdata: [],

      // 필드에 대한 정보
      datafields: [
        {name: 'check', type: "bool", map: '0'},
        {name: 'begDt', type: 'date', map: '1'},
        {name: 'holdyNm', type: 'string', map: '2'},
        {name: 'createdBy', type: 'string', map: '3'},
        {name: 'createdAt', type: 'date', map: '4'},
        {name: 'holdyTpCd', type: 'string', map: '5'},

        // 숨겨진 값들. 갖고있다가 나중에 CRUD 작업때 쓴다.
        {name: 'holdySn', type: 'number', map: '6'},
        {name: 'lastModifiedAt', type: 'date', map: '7'},
        {name: 'lastModifiedBy', type: 'string', map: '8'},
      ],
      datatype: 'array'
    }
  },

  methods: {
    // 행을 클릭했을 때 이벤트. 행에 대한 수정 할 수 있는 창이 뜨게끔 한다. Modal사용
    onClickRow(e) {
      this.$emit('onClickJqxGridRow', e.args.row.bounddata);
    },

    // JpxGrid change 이벤트
    onChange() {
      // ref로 지정해둔 Grid에서 rows를 가져온다.
      const rows = this.$refs.holidayGrid.getrows()

      // 가져온 rows로 대체한다.
      this.$store.dispatch({
        type: CHANGE,
        values: rows,
      })
      /*
      * 체크된 rows만을 찾아서 바꾼다 -> 탐색에 대한 시간이 걸림
      * 그냥 전부다 교체해버린다 -> 탐색에 대한 시간이 걸리지 않지만,
      * 데이터가 많아지면 어찌될지 모르겠음. 현재는 2번을 선택.
      */
    },

    // store와의 데이터를 다시 바인딩한다. watch.holidayList에서 쓰인다.
    reBindData() {
      // store에서 getters를 통해 holidayList를 호출한다.
      this.source.localdata = this.$store.getters["holiday/holidayList"]
      // 새로운 데이터로 업데이트한다.
      this.$refs.holidayGrid.updatebounddata('data')
      // 선택한 행을 초기화한다.(focus 초기화)
      this.$refs.holidayGrid.selectrow(0)
    }
  }
}
</script>

<style scoped></style>
