import {
  ADD_TODO,
  SET_FILTER,
} from '../actions';

import { generateID } from '../../helpers/idGenerator';
import { generateDate } from '../../helpers/dateGenerator';

// { id: generateID(), title: 'tarefa 1', description: 'descrição 1', createdAt: '123', updates: [{ description: '', updatedAt: 'hoje' }]; },
// { id: generateID(), title: 'tarefa 1', description: 'descrição 1', createdAt: '123', updates: []; }

const INITIAL_STATE = {
  todos: [],
  filter: '',
};

const todoReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case ADD_TODO:
      const { title, description } = action.payload;
      return {
        todos: [
          ...state.todos,
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

    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };

    default:
      return state;
  }
};

export default todoReducer;
