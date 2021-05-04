const getters = {
    fixedTodoItems: state => {
        let result = [];
        if (state.selected === 'all') {
            result = result.concat(state.todoItems);
        } else if (state.selected === 'checked') {
            result = result.concat(state.todoItems.filter((item) => item.checked))
        } else if (state.selected === 'notChecked') {
            result = result.concat(state.todoItems.filter((item) => !item.checked))
        }
        return result;
    },
}

export default getters
