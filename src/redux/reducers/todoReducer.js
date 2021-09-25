import {
  ADD_TODO,
  SET_FILTER,
} from '../actions';

import { generateID } from '../../helpers/idGenerator';
import { generateDate } from '../../helpers/dateGenerator';

const INITIAL_STATE = {
  todos: [],
  filter: '',
};

const todoReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case ADD_TODO:
      return {
        todos: [
          ...state.todos,
          {
            id: generateID(),
            title: action.payload.title,
            description: action.payload.description,
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
