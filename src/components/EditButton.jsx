import React from 'react';

import { useDispatch } from 'react-redux';

import {
  toggleEditTask,
  toggleEditUpdate,

  editDescription,
  editTitle,
} from '../redux/actions';

import { Button } from './TaskTable';

const EditButton = ({ mode, task }) => {

  const dispatch = useDispatch();

  const handleClick = () => {

    if (mode === 'task') {
      dispatch(toggleEditTask(task.id));
      console.log('entrou edit task');
      dispatch(editTitle({ mode: mode, title: task.title }));
      dispatch(editDescription({ mode: mode, description: task.description }));
    };

    if (mode === 'update') {
      console.log('entrou edit update');

      const { taskObj, updateObj } = task;
      dispatch(toggleEditUpdate({ idTask: taskObj.id, idUpdate: updateObj.id }));

      dispatch(editDescription({ mode: mode, description: updateObj.description }));
    }

  };

  return (
    <Button
      edit
      onClick={ handleClick }
    >
      <i className="fas fa-pencil-alt fa-2x"></i>
    </Button>
  );
};

export default EditButton;
