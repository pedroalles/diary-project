import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  editDescription,
  toggleUpdateTask,
} from '../redux/actions';

import { TableRowCell, Input } from './TaskTable';

const CellDescription = ({ mode, task }) => {

  const { description } = useSelector(state => state.tasksReducer.edit[mode]);

  const dispatch = useDispatch();

  const handleChange = ({ target: { value } }) => {
    dispatch(editDescription({ mode: mode, description: value }));
  };

  if (mode === 'task') {
    return (
      <TableRowCell
        description
        onClick={ task.isEditing ? null : () => dispatch(toggleUpdateTask(task.id)) }
      >
        {
          task.isEditing ?
            <Input
              type="text"
              id="description"
              value={ description }
              onChange={ handleChange }
              placeholder="Update your description"
            />
            :
            task.description
        }
      </TableRowCell >
    );
  }

  if (mode === 'update') {
    const { updateObj } = task;
    return (
      <TableRowCell description>
        {
          updateObj.isEditing ?
            <Input
              type="text"
              id="description"
              value={ description }
              onChange={ handleChange }
              placeholder="Update your description"
            />
            :
            updateObj.description
        }
      </TableRowCell >
    );
  }
};

export default CellDescription;
