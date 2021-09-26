import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { deleteTask, toggleEditTask, updateTask } from '../redux/actions';

import styled from 'styled-components';

const Table = styled.table`
  width: 80%;
  margin: auto;
  /* border-collapse: collapse; */
  border-collapse: separate;
  border-spacing: 0px 0px;

  tbody {
    tr:nth-child(odd) {
      background-color: #00ce6e;
    }
    tr:nth-child(even) {
      background-color: #00ce6e8b;
    }
    tr {
      color: #161616;
      transition: 0.5s;
    }
    tr:hover {
      background-color: white;
      color: #161616;
      height: 42px;

      td:nth-child(1) {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-left: 2px solid #161616;
      }

      td:nth-last-child(1) {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border-right: 2px solid #161616;
      }

      td {
        padding: 6px;
        font-size: 1.2rem;
        border-top: 2px solid #161616;
        border-bottom: 2px solid #161616;
      }
    }
  }
`;

const TheadRow = styled.tr`
  background-color: #161616 ;
  color: white;
`;

const TheadCell = styled.td`
  font-size: 1.2rem;
  padding: 4px;
  text-align: center;
  width: ${props => props.title ? "20%" : props.description ? "30%" : props.actions ? "auto" : "20%"};
`;

const TbodyCell = styled.td`
  font-size: 1.2rem;
  padding: 4px;
  text-align: ${props => props.center ? "center" : "justify"};
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 1px 4px;
  text-align: ${props => props.center ? "center" : "justify"};
`;

const TaskTable = () => {
  const [editing, setEditing] = useState({ id: '', title: '', description: '' });
  let tasks = useSelector(state => state.tasksReducer.tasks);

  const filter = useSelector(state => state.tasksReducer.filter);
  const dispatch = useDispatch();

  if (filter) {
    const lowFilter = filter.toLowerCase();
    tasks = tasks
      .filter(({ title, description, createdAt }) =>
        title.toLowerCase().includes(lowFilter) ||
        description.toLowerCase().includes(lowFilter) ||
        createdAt.toLowerCase().includes(lowFilter));
  }

  const handleEdit = (task) => {
    setEditing({ id: task.id, title: task.title, description: task.description });
    dispatch(toggleEditTask(task.id));
  };

  const handleSave = (task) => {
    dispatch(toggleEditTask(task.id));
    dispatch(updateTask(editing));
    setEditing({ id: '', title: '', description: '' });
  };

  const handleChange = ({ target: { id, value } }) => {
    setEditing({ ...editing, [id]: value });
  };

  return (
    <Table>

      <thead>
        <TheadRow>
          <TheadCell>Title</TheadCell>
          <TheadCell description>Description</TheadCell>
          <TheadCell>Created At</TheadCell>
          <TheadCell>Updated At</TheadCell>
          <TheadCell actions>Actions</TheadCell>
        </TheadRow>
      </thead>

      <tbody>
        { tasks.map((task) => (
          <tr>
            <TbodyCell>
              { task.isEditing ?
                <Input
                  type="text"
                  id="title"
                  value={ editing.title }
                  onChange={ handleChange }
                  placeholder="Update your title"
                />
                :
                task.title
              }
            </TbodyCell>
            <TbodyCell>
              { task.isEditing ?
                <Input
                  type="text"
                  id="description"
                  value={ editing.description }
                  onChange={ handleChange }
                  placeholder="Update your description"
                />
                :
                task.description
              }
            </TbodyCell>
            <TbodyCell center>{ task.createdAt }</TbodyCell>
            <TbodyCell center>{ !task.updates.length ? 'No updates' : task.updates[0].updatedAt }</TbodyCell>

            <TbodyCell center>

              { task.isEditing ?
                <button onClick={ () => handleSave(task) }>save</button>
                :
                <button onClick={ () => handleEdit(task) }>edit</button>
              }

              <button onClick={ () => dispatch(deleteTask(task.id)) }>del</button>

            </TbodyCell>
          </tr>
        )) }
      </tbody>

    </Table>
  );
};

export default TaskTable;