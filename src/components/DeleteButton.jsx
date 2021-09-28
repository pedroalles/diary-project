import React from 'react';

import { useDispatch } from 'react-redux';
import {
  deleteTask,
  deleteUpdate,
} from '../redux/actions';

import { Button } from './TaskTable';

const DeleteButton = ({ mode, task }) => {

  const dispatch = useDispatch();

  const handleClick = () => {

    if (mode === 'task') {
      console.log('entrou em task delete');
      dispatch(deleteTask(task.id));
    }

    if (mode === 'update') {
      console.log('entrou em update delete');
      const { taskObj, updateObj } = task;
      dispatch(deleteUpdate({ idTask: taskObj.id, idUpdate: updateObj.id }));
    }
  };

  return (
    <Button
      del
      onClick={ handleClick }
    >
      <i className="fas fa-trash fa-2x"></i>
    </Button>
  );

};


export default DeleteButton;
