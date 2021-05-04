<template>
  <div id="app">
    <TodoHeader />
    <TodoInputContainer />
    <TodoListContainer />
    <TodoFooterContainer />
  </div>
</template>

<script>
// 사용할 컴포넌트들 import
import TodoHeader from "./components/TodoHeader";
import TodoInputContainer from "./container/TodoInputContainer";
import TodoListContainer from "./container/TodoListContainer";
import TodoFooterContainer from "./container/TodoFooterContainer";

export default {
  // 자식 컴포넌트 요소들
  components: {
    TodoHeader,
    TodoInputContainer,
    TodoListContainer,
    TodoFooterContainer
  }
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
