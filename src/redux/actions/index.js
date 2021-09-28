export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const TOGGLE_EDIT_TASK = 'TOGGLE_EDIT_TASK';
export const EDIT_TASK = 'EDIT_TASK';

export const TOGGLE_EDIT_UPDATE = 'TOGGLE_EDIT_UPDATE';


export const EDIT_DESCRIPTION = 'EDIT_DESCRIPTION';
export const EDIT_TITLE = 'EDIT_TITLE';


export const EDIT_UPDATE = 'EDIT_UPDATE';

export const TOGGLE_UPDATES_TASK = 'TOGGLE_UPDATES_TASK';
export const TOGGLE_UPDATES_UPDATE = 'TOGGLE_UPDATES_UPDATE';



export const ADD_UPDATE = 'ADD_UPDATE';
export const DELETE_UPDATE = 'DELETE_UPDATE';

export const SET_FILTER = 'SET_FILTER';


export const editTitle = ({ mode, title }) => ({
  type: EDIT_TITLE,
  payload: { mode, title }
});

export const editDescription = ({ mode, description }) => ({
  type: EDIT_DESCRIPTION,
  payload: { mode, description }
});


export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: id,
});

export const toggleEditTask = (id) => ({
  type: TOGGLE_EDIT_TASK,
  payload: id,
});


export const toggleEditUpdate = ({ idTask, idUpdate }) => ({
  type: TOGGLE_EDIT_UPDATE,
  payload: { idTask, idUpdate },
});


export const editTask = (task) => ({
  type: EDIT_TASK,
  payload: task,
});




export const toggleUpdateTask = (id) => ({
  type: TOGGLE_UPDATES_TASK,
  payload: id,
});

export const editUpdate = ({ idTask, idUpdate, update }) => ({
  type: EDIT_UPDATE,
  payload: { idTask, idUpdate, update }
});


export const addUpdate = ({ id, description }) => ({
  type: ADD_UPDATE,
  payload: { id, description },
});

export const deleteUpdate = ({ idTask, idUpdate }) => ({
  type: DELETE_UPDATE,
  payload: { idTask, idUpdate },
});

export const setFilter = ({ mode, filter }) => ({
  type: SET_FILTER,
  payload: { mode, filter },
});
