import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import { addTask } from '../redux/actions';

const Form = styled.form`
  /* width: 80%; */
  /* margin: auto; */
  input, button {
    font-size: 1.2rem;
    margin-left: 2px;
    padding: 4px;
  }
  input:nth-child(1) {
    /* margin-right: 2px; */
    /* width: 35%; */
  }
  input:nth-child(2) {
    /* margin-right: 2px; */
    /* width: 55%; */
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
      <button type="submit">+</button>
    </Form>
  );
};

export default TaskForm;
