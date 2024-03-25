import { createSlice } from "@reduxjs/toolkit";

const initialData = [
    { id: 1, title: 'Buy groceries', content: 'Remember to buy milk and eggs', taskStatus: 'pending' },
    { id: 2, title: 'Walk the dog', content: 'Take Fido for a stroll around the park', taskStatus: 'completed' },
    { id: 3, title: 'Finish homework', content: 'Complete math assignment and submit it online', taskStatus: 'backlog' },
    { id: 4, title: 'Call mom', content: 'Discuss weekend plans and catch up on family news', taskStatus: 'pending' }
];

const initialState = JSON.parse(localStorage.getItem("todos")) || initialData;

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoAdded: {
            reducer(state, action) {
                state.unshift(action.payload);
                localStorage.setItem("todos", JSON.stringify(state));
            },
            prepare(title, content, taskStatus) {
                return {
                    payload: {
                        id: Date.now(),
                        title,
                        content,
                        taskStatus,
                    }
                }
            }
        },
        todoUpdated(state, action) {
            const { id, title, content, taskStatus } = action.payload;
            const existingTodo = state.find(todo => todo.id === id);
            if (existingTodo) {
                existingTodo.title = title;
                existingTodo.content = content;
                existingTodo.taskStatus = taskStatus;
            }
            localStorage.setItem("todos", JSON.stringify(state));
        }
    }

})

export const { todoAdded, todoUpdated } = todosSlice.actions

export default todosSlice.reducer