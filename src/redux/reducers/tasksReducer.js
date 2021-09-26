import {
  ADD_TASK,
  DELETE_TASK,
  SET_FILTER,
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
