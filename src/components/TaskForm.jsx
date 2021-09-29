import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import { addTask } from '../redux/actions';

const Form = styled.form`
  input, button {
    font-size: 1.2rem;
    margin-left: 2px;
    padding: 4px;
  }
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  vertical-align: middle;
  color: #6565d6;
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
      <Button type="submit">
        <i className="fas fa-plus-circle fa-lg"></i>
      </Button>
    </Form>
  );
};

export default TaskForm;
