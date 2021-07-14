import { createSlice } from '@reduxjs/toolkit'
import {
  getTodo as getTodoService,
  addTodo as addTodoService,
  setCheck,
  deleteTodo,
  deleteChecked,
} from "../../services/todoService";

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    inProgress: false,
    error: '',
    todo: [],
  },
  reducers: {
    toggleInProgress: (state, action = false) => {
      state.inProgress = action.payload;
    },
    toggleError: (state, action = '') => {
      state.error = action.payload;
    },
    getTodo: (state, action) => {
      state.todo = action.payload;
    },
    addTodo: (state, action) => {
      state.todo = state.todo.push(action.payload);
    }
  }
})

const { toggleInProgress, toggleError, getTodo } = todoSlice.actions

export const getTodoAction = () =>  async dispatch => {
  dispatch(toggleInProgress(true));

  try {
    const todo = await getTodoService();

    setTimeout(() => {
      dispatch(getTodo(todo));
    }, 500);

    dispatch(toggleInProgress());
  } catch (err) {
    dispatch(toggleError('Error: ' + err));
    dispatch(toggleInProgress());

    setTimeout(() => {
      dispatch(toggleError());
    }, 3000);
  }
};

export const addTodoAction = title =>  async dispatch => {
  dispatch(toggleInProgress(true));

  try {
    const newTodoStructure = {
      id: Math.floor(Math.random() * 1000000000 ),
      title,
      check: false,
      date: new Date().toISOString(),
    }

    const todo = await addTodoService(newTodoStructure);
    dispatch(getTodo(todo));

    dispatch(toggleInProgress());
  } catch (err) {
    dispatch(toggleError('Error: ' + err));
    dispatch(toggleInProgress());

    setTimeout(() => {
      dispatch(toggleError());
    }, 3000);
  }
};

export const setCheckAction = id =>  async dispatch => {
  dispatch(toggleInProgress(true));

  try {
    const todo = await setCheck(id);
    dispatch(getTodo(todo));

    dispatch(toggleInProgress());
  } catch (err) {
    dispatch(toggleError('Error: ' + err));
    dispatch(toggleInProgress());

    setTimeout(() => {
      dispatch(toggleError());
    }, 3000);
  }
};

export const deleteTodoAction = id =>  async dispatch => {
  dispatch(toggleInProgress(true));

  try {
    const todo = await deleteTodo(id);
    dispatch(getTodo(todo));

    dispatch(toggleInProgress());
  } catch (err) {
    dispatch(toggleError('Error: ' + err));
    dispatch(toggleInProgress());

    setTimeout(() => {
      dispatch(toggleError());
    }, 3000);
  }
};

export const deleteCheckedAction = () =>  async dispatch => {
  dispatch(toggleInProgress(true));

  try {
    const todo = await deleteChecked();
    dispatch(getTodo(todo));

    dispatch(toggleInProgress());
  } catch (err) {
    dispatch(toggleError('Error: ' + err));
    dispatch(toggleInProgress());

    setTimeout(() => {
      dispatch(toggleError());
    }, 3000);
  }
};

export default todoSlice.reducer
