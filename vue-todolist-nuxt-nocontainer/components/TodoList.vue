<template>
  <section>
    total: {{ TodoItemsLength }}

    <label>
      <select v-model="selected" @change="storeChangeSelected(selected)">
        <option value="all">all</option>
        <option value="checked">checked</option>
        <option value="notChecked">not checked</option>
      </select>
    </label>

    <transition-group name="list" tag="ul">
      <li v-for="todo in fixedTodoItems" :key="todo.id" class="shadow">
        <!--check button-->
        <i
          v-if="todo.checked"
          aria-hidden="true"
          class="checkBtn fas fa-check-square"
          @click="storeToggleChecked(todo.id)"
        />
        <i
          v-else
          aria-hidden="true"
          class="checkBtn fas fa-square"
          @click="storeToggleChecked(todo.id)"
        />

        <StyledDiv :todoChecked="todo.checked">
          {{ todo.todo | formatTodos }}
        </StyledDiv>

        <span class="removeBtn" type="button" @click="storeRemoveTodo(todo.id)">
          <i aria-hidden="true" class="far fa-trash-alt"></i>
        </span>
      </li>
    </transition-group>
  </section>
</template>

<script>
// 리스트를 vuex getter로 받아오기 위한 메소드
import {mapGetters} from 'vuex';

// 스토어에서 해당 액션이름 import
import {CHANGE_SELECTED, DELETE_TODO, TOGGLE_CHECKED} from "~/store/todos";

// 스타일 컴포넌트를 만들기 위한 lib 호출
import styled from 'vue-styled-components';

// StyledDiv의 props 정의
const StyledDivProps = {
  todoChecked: Boolean
}

// Props 값에 따라 다른 CSS가 적용되는 div 컴포넌트 생성
const StyledDiv = styled('div', StyledDivProps)`
  color: ${props => props.todoChecked ? '#C8C8C8' : 'black'};
  text-decoration: ${props => props.todoChecked ? 'line-through' : 'none'};
`;


export default {
  data() {
    return {
      selected: 'all'
    }
  },

  computed: {
    // 수정된 TodoItems를 받아온다.
    ...mapGetters({
      fixedTodoItems: 'todos/fixedTodoItems',
    }),

    // 받아오는 수정된 TodoItems의 값에 따라 바뀌는 상태값.
    TodoItemsLength() {
      return this.fixedTodoItems.length;
    },
  },

  components: {
    StyledDiv
  },

  filters: {
    formatTodos: function (value) {
      if (!value) return ''
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },

  methods: {
    // store의 removeTodo 커밋 메소드
    storeRemoveTodo: function (id) {
      this.$store.dispatch({
        type: 'todos/' + DELETE_TODO,
        id,
      })
    },

    // store의 TOGGLE_CHECKED
    storeToggleChecked: function (id) {
      this.$store.dispatch({
        type: 'todos/' + TOGGLE_CHECKED,
        id
      })
    },

    // store의 현재 select 변경
    storeChangeSelected: function (selected) {
      this.$store.dispatch({
        type: 'todos/' + CHANGE_SELECTED,
        selected
      })
    }
  },
}
</script>

<style scoped>
.list-enter-active, .list-leave-active {
  transition: all 0.3s;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

ul {
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
  text-align: left;
}

li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}

.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
  cursor: pointer;
}

.removeBtn {
  margin-left: auto;
  color: #de4343;
  cursor: pointer;
}
</style>
