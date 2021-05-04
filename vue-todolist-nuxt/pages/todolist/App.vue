<template>
  <div id="app">
    <link
      crossorigin="anonymous"
      href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
      rel="stylesheet"
    />
    <todo-header></todo-header>
    <todo-input-container></todo-input-container>
    <todo-list-container></todo-list-container>
    <todo-footer-container></todo-footer-container>
  </div>
</template>

<script>
// 사용할 컴포넌트들 import
import TodoHeader from "../../components/TodoHeader";
import TodoInputContainer from "../../components/container/TodoInputContainer";
import TodoListContainer from "../../components/container/TodoListContainer";
import TodoFooterContainer from "../../components/container/TodoFooterContainer";

export default {
  // 자식 컴포넌트 요소들
  components: {
    TodoHeader,
    TodoInputContainer,
    TodoListContainer,
    TodoFooterContainer
  },
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f8;
}

input {
  border-style: groove;
  width: 200px;
}

button {
  border-style: groove;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
