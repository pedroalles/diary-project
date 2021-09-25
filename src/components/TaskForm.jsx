import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import { addTodo } from '../redux/actions';

const Form = styled.form`
  background-color: coral;
`;

const TaskForm = () => {
  const [task, setTask] = useState({ title: '', description: '' });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(task));
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
      />
      <input
        type="text"
        id="description"
        value={ task.description }
        placeholder="Description"
        onChange={ handleChange }
      />
      <button type="submit">+</button>
    </Form>
  );


};

export default TaskForm;
