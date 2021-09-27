export const ADD_TASK = 'ADD_TASK';
export const SET_FILTER = 'SET_FILTER';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_EDIT_TASK = 'TOGGLE_EDIT_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const TOGGLE_UPDATES_TASK = 'TOGGLE_UPDATES_TASK';
export const ADD_UPDATE = 'ADD_UPDATE';
export const DELETE_UPDATE = 'DELETE_UPDATE';

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: id,
});

export const setFilter = ({ mode, filter }) => ({
  type: SET_FILTER,
  payload: { mode, filter },
});

export const toggleEditTask = (id) => ({
  type: TOGGLE_EDIT_TASK,
  payload: id,
});

export const updateTask = (task) => ({
  type: UPDATE_TASK,
  payload: task,
});

export const toggleUpdateTask = (id) => ({
  type: TOGGLE_UPDATES_TASK,
  payload: id,
});

export const addUpdate = ({ id, description }) => ({
  type: ADD_UPDATE,
  payload: { id, description },
});

export const deleteUpdate = ({ idTask, idUpdate }) => ({
  type: DELETE_UPDATE,
  payload: { idTask, idUpdate },
});
