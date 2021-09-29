import {
  ADD_TASK,
  DELETE_TASK,

  TOGGLE_EDIT_TASK,
  EDIT_TASK,

  EDIT_UPDATE,

  TOGGLE_EDIT_UPDATE,

  EDIT_DESCRIPTION,
  EDIT_TITLE,

  TOGGLE_UPDATES_TASK,

  ADD_UPDATE,
  DELETE_UPDATE,

  SET_FILTER,
  SET_SORT,
} from '../actions';

import { generateID } from '../../helpers/idGenerator';
import { generateDate } from '../../helpers/dateGenerator';

// { id: generateID(), title: 'tarefa 1', description: 'descrição 1', createdAt: '123', updates: [{ description: '', updatedAt: 'hoje' }]; },
// { id: generateID(), title: 'tarefa 1', description: 'descrição 1', createdAt: '123', updates: []; }

const INITIAL_STATE = {
  tasks: [],
  filter: {
    task: '',
    update: ''
  },
  sort: {
    task: { by: 'createdAt', cres: true },
    update: { by: 'createdAt', cres: true }
  },
  edit: {
    task: { title: '', description: '' },
    update: { description: '' },
  }
};

const tasksReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case SET_SORT:
      return {
        ...state,
        sort: {
          ...state.sort,
          [action.payload.mode]: {
            ...action.payload.sort,
          },
        }
      };

    case EDIT_DESCRIPTION:
      return {
        ...state,
        edit: {
          ...state.edit,
          [action.payload.mode]: {
            ...state.edit[action.payload.mode],
            description: action.payload.description,
          }
        }
      };

    case EDIT_TITLE:
      return {
        ...state,
        edit: {
          ...state.edit,
          [action.payload.mode]: {
            ...state.edit[action.payload.mode],
            title: action.payload.title,
          }
        }
      };

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

    case TOGGLE_EDIT_UPDATE:
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === action.payload.idTask ? {
          ...task,
          updates: task.updates.map((update) => update.id === action.payload.idUpdate ? {
            ...update,
            isEditing: !update.isEditing,
          } :
            { ...update, isEditing: false })
        } :
          { ...task })
      };

    case DELETE_UPDATE:
      return {
        ...state,
        tasks: state.tasks.map((task) => task.id === action.payload.idTask ? {
          ...task,
          updates: task.updates.filter((update) => update.id !== action.payload.idUpdate)
        } : { ...task })
      };

    case EDIT_TASK:
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

    case EDIT_UPDATE:
      return {
        ...state,
        tasks: state.tasks.map(task => task.id === action.payload.idTask ? {
          ...task,
          updates: task.updates.map((update) => update.id === action.payload.idUpdate ? {
            ...update,
            description: action.payload.update,
          } :
            { ...update })
        } :
          { ...task })
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
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ?
            {
              ...task,
              updates: [...task.updates,
              {
                id: generateID(),
                description: action.payload.description,
                createdAt: generateDate(),
                isEditing: false,
              }]
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
