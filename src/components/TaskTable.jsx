import React, { useState } from 'react';

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
      background-color: #b1b1b1;
    }
    tr:nth-child(even) {
      background-color: #999999;
    }
    tr {
      color: #161616;
      transition: 0.4s;

      td:nth-child(5) {
        display: flex;
        justify-content: space-evenly;
      }
      td{
        transition: inherit;
      }
    }
    tr:hover {
      --td-boredr-px : 5px;
      /* background-color: white; */
      background-color: #2b2b2b;
      color: #161616;
      /* height: 42px; */

      td:nth-child(1) {
        height: 45px;
        border-top-left-radius: var(--td-boredr-px);
        border-bottom-left-radius: var(--td-boredr-px);
        border-left: 1px solid #161616;
      }

      td:nth-last-child(1) {
        height: 45px;
        border-top-right-radius: var(--td-boredr-px);
        border-bottom-right-radius: var(--td-boredr-px);
        border-right: 1px solid #161616;
      }

      td {
        background-color: white;
        /* padding: 5px; */
        font-size: 1.2rem;
        /* border-top: 1px solid #161616; */
        border-bottom: 1px solid #161616;
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
  width: 100%;
`;

const Button = styled.button`
  /* width: 30px; */
  /* height: 30px; */
  border: none;
  background: none;
  color: ${props => props.save ? "#128826" : props.edit ? "#d14d00" : "#be4040"};
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
        { tasks.map((task, index) => (
          <tr key={ index }>

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
                <Button save onClick={ () => handleSave(task) }><i className="fas fa-save fa-2x"></i></Button>
                :
                <Button edit onClick={ () => handleEdit(task) }><i className="fas fa-pencil-alt fa-2x"></i></Button>
              }

              <Button delete onClick={ () => dispatch(deleteTask(task.id)) }><i className="fas fa-trash fa-2x"></i></Button>

            </TbodyCell>
          </tr>
        )) }
      </tbody>

    </Table >
  );
};

export default TaskTable;