import { createSlice } from "@reduxjs/toolkit";

const initialState=[]

const todosSlice=createSlice({
    name: 'todos',
    initialState,
    reducers:{
        todoAdded:{
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(title, content, taskStatus) {
                return {
                    payload: {
                        id: Date().now(),
                        title,
                        content,
                        taskStatus,
                    }
                }
            }
        }
    }

})

export const {todoAdded} =todosSlice.actions

export default todosSlice.reducer