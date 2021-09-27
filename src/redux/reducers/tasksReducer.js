import {
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_EDIT_TASK,
  UPDATE_TASK,
  SET_FILTER,
  TOGGLE_UPDATES_TASK,
  ADD_UPDATE,
  DELETE_UPDATE,
} from '../actions';

import { generateID } from '../../helpers/idGenerator';
import { generateDate } from '../../helpers/dateGenerator';

// { id: generateID(), title: 'tarefa 1', description: 'descrição 1', createdAt: '123', updates: [{ description: '', updatedAt: 'hoje' }]; },
// { id: generateID(), title: 'tarefa 1', description: 'descrição 1', createdAt: '123', updates: []; }

const INITIAL_STATE = {
  tasks: [],
  filter: { task: '', update: '' },
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
        filter: { ...state.filter, update: '' },
        tasks: state.tasks.map(task =>
          task.id === action.payload ?
            { ...task, isHidden: !task.isHidden } : { ...task, isHidden: true })
      };

    case ADD_UPDATE:
      console.log(action.payload);
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ?
            {
              ...task,
              updates: [...task.updates, {
                id: generateID(),
                description: action.payload.description,
                createdAt: generateDate()
              }]
            } : { ...task })
      };

    case DELETE_UPDATE:
      return {
        ...state,
        tasks: state.tasks.map((task) => task.id === action.payload.idTask ? {
          ...task,
          updates: task.updates.filter((update) => update.id !== action.payload.idUpdate)
        } : { ...task })
      };

    case SET_FILTER:
      return {
        ...state,
        filter: { ...state.filter, [action.payload.mode]: action.payload.filter }
      };

    default:
      return state;
  }
};

export default tasksReducer;
