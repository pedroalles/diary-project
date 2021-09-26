import {
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_EDIT_TASK,
  UPDATE_TASK,
  SET_FILTER,
  TOGGLE_UPDATES_TASK,
} from '../actions';

import { generateID } from '../../helpers/idGenerator';
import { generateDate } from '../../helpers/dateGenerator';

// { id: generateID(), title: 'tarefa 1', description: 'descrição 1', createdAt: '123', updates: [{ description: '', updatedAt: 'hoje' }]; },
// { id: generateID(), title: 'tarefa 1', description: 'descrição 1', createdAt: '123', updates: []; }

const INITIAL_STATE = {
  tasks: [],
  filter: '',
};

const tasksReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case ADD_TASK:
      const { title, description } = action.payload;
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: generateID(),
            title: title,
            description: description,
            createdAt: generateDate(),
            isEditing: false,
            isHidden: true,
            updates: [],
          }
        ]
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };

    case TOGGLE_EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ?
            { ...task, isEditing: !task.isEditing } : { ...task, isEditing: false })
      };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === action.payload.id ?
          {
            ...task,
            title: action.payload.title,
            description: action.payload.description
          } : { ...task }
        )
      };

    case TOGGLE_UPDATES_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ?
            { ...task, isHidden: !task.isHidden } : { ...task })
      };

    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };

    default:
      return state;
  }
};

export default tasksReducer;
