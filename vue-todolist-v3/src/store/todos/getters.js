const getters = {
  doneTodos: state => state.todoItems.filter((todo) => !todo.checked),
}

export default getters
