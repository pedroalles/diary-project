import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import { addTask } from '../redux/actions';

import { Button } from './TaskTable';

const Form = styled.form`
  input {
    font-size: 1.2rem;
    margin-right: 4px;
    padding: 4px;
  }
`;

const TaskForm = () => {
  const [task, setTask] = useState({ title: '', description: '' });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(task));
    setTask({ title: '', description: '' });
  };

  const handleChange = ({ target: { id, value } }) => {
    setTask({ ...task, [id]: value });
  };

  return (
    <Form onSubmit={ handleSubmit }>
      <input
        type="text"
        id="title"
        value={ task.title }
        placeholder="Title"
        onChange={ handleChange }
        required
      />
      <input
        type="text"
        id="description"
        value={ task.description }
        placeholder="Description"
        onChange={ handleChange }
        required
      />
      <Button add type="submit">
        <i className="fas fa-plus-circle fa-2x"></i>
      </Button>
    </Form>
  );
};

export default TaskForm;
