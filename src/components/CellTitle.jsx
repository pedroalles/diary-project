import React from 'react';
// import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  editTitle,
  toggleUpdateTask,
} from '../redux/actions';

import { TableRowCell, Input } from './TaskTable';

const CellTitle = ({ mode, task }) => {

  const { title } = useSelector(state => state.tasksReducer.edit[mode]);

  const dispatch = useDispatch();

  const handleChange = ({ target: { value } }) => {
    dispatch(editTitle({ mode: mode, title: value }));
  };

  return (
    <TableRowCell
      title
      onClick={ task.isEditing ? null : () => dispatch(toggleUpdateTask(task.id)) }
    >
      {
        task.isEditing ?
          <Input
            type="text"
            id="title"
            value={ title }
            onChange={ handleChange }
            placeholder="Update your title"
          />
          :
          task.title
      }
    </TableRowCell >
  );
};

export default CellTitle;
