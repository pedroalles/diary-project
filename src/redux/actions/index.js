export const ADD_TODO = 'ADD_TODO';
export const SET_FILTER = 'SET_FILTER';

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});