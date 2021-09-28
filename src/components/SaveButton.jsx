import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  toggleEditTask,
  toggleEditUpdate,

  editTask,
  editUpdate,

  editDescription,
  editTitle,
} from '../redux/actions';

import { Button } from './TaskTable';

const SaveButton = ({ mode, task }) => {

  const edit = useSelector(state => state.tasksReducer.edit[mode]);

  const dispatch = useDispatch();

  const handleClick = () => {


    if (mode === 'task') {
      console.log('entrou em save task', edit);
      dispatch(toggleEditTask(task.id));
      dispatch(editTask({ id: task.id, ...edit }));
      dispatch(editTitle({ mode: mode, title: '' }));
      dispatch(editDescription({ mode: mode, description: '' }));
    };

    if (mode === 'update') {
      const { taskObj, updateObj } = task;
      console.log('entrou em save update', edit);

      dispatch(toggleEditUpdate({ idTask: taskObj.id, idUpdate: updateObj.id }));

      //f
      dispatch(editUpdate({
        idTask: taskObj.id,
        idUpdate: updateObj.id,
        update: edit.description,
      }));


      dispatch(editDescription({ mode: mode, description: '' }));
    }
  };

  return (
    <Button
      save
      onClick={ handleClick }
    >
      <i className="fas fa-save fa-2x"></i>
    </Button>
  );
};

export default SaveButton;
