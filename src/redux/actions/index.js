export const ADD_TASK = 'ADD_TASK';
export const SET_FILTER = 'SET_FILTER';
export const DELETE_TASK = 'DELETE_TASK';

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: id,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});