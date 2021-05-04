<template>
  <section>
    total: {{ count }}
    <transition-group name="list" tag="ul">
      <li v-for="todo in todoItems" :key="todo.id" class="shadow">
        <!--check button-->
        <i
          v-if="todo.checked"
          aria-hidden="true"
          class="checkBtn fas fa-check-square"
          @click="toggleChecked(todo.id)"
        />
        <i
          v-else
          aria-hidden="true"
          class="checkBtn fas fa-square"
          @click="toggleChecked(todo.id)"
        />

        <StyledDiv :todoChecked="todo.checked">
          {{ todo.todo | formatTodos }}
        </StyledDiv>

        <span class="removeBtn" type="button" @click="removeTodo(todo.id)">
          <i aria-hidden="true" class="far fa-trash-alt"></i>
        </span>
      </li>
    </transition-group>
  </section>
</template>

<script>
import styled from 'vue-styled-components';

const StyledDivProps = {
  todoChecked: Boolean
}
const StyledDiv = styled('div', StyledDivProps)`
  color: ${props => props.todoChecked ? '#C8C8C8' : 'black'};
  text-decoration: ${props => props.todoChecked ? 'line-through' : 'none'};
`;

export default {
  // 속성 검사
  props: {
    todoItems: {
      id: {
        type: Number,
        required: true,
      },
      todo: {
        type: String,
        required: true,
      },
      checked: {
        type: Boolean,
        required: true,
      }
    },
    count: {
      type: Number,
      required: true,
    }
  },

  methods: {
    removeTodo(id) {
      // index list 삭제 커밋
      this.$emit('storeRemoveTodo', id);
    },
    toggleChecked(id) {
      this.$emit('storeToggleChecked', id);
    }
  },

  filters: {
    formatTodos: function (value) {
      if (!value) return ''
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },

  components: {
    StyledDiv
  }
};

</script>

<style>
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
