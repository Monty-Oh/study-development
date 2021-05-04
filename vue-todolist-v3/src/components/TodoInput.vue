<template>
  <div class="inputBox shadow">
    <input
      v-model="newTodoItem"
      placeholder="Type what you have to do"
      type="text"
      v-on:keyup.enter="addTodo"
    />
    <span class="addContainer" v-on:click="addTodo">
      <i aria-hidden="true" class="addBtn fas fa-plus"></i>
    </span>

    <Modal v-if="showModal" @close="changeModal">
      <h3 slot="header">경고</h3>
      <span slot="footer" @click="changeModal">
        할 일을 입력하세요.
        <i aria-hidden="true" class="closeModalBtn fas fa-times"></i>
      </span>
    </Modal>
  </div>
</template>

<script>
import Modal from '../common/Modal';

export default {
  data() {
    return {
      showModal: false,
      newTodoItem: "",
    };
  },

  methods: {
    addTodo() {
      if (this.newTodoItem !== "") {

        // payload로 넘길 '할일'
        let todo = this.newTodoItem && this.newTodoItem.trim();
        this.$emit('storeAddTodo', todo)
        this.clearInput();
      } else {
        this.changeModal();
      }
    },
    clearInput() {
      this.newTodoItem = ''
    },
    changeModal() {
      this.showModal = !this.showModal;
    }
  },

  components: {
    Modal
  }
};
</script>

<style scoped>
input:focus {
  outline: none;
}

.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}

.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}

.addContainer {
  float: right;
  background: linear-gradient(to right, #6478fb, #8763fb);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.addBtn {
  color: white;
  vertical-align: middle;
}
</style>
