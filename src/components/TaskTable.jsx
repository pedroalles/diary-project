import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { deleteTask, toggleEditTask, updateTask, toggleUpdateTask } from '../redux/actions';

import styled from 'styled-components';

const Table = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const TableHeader = styled.div`
  display: flex;
  background-color: #161616 ;
  color: white;
`;

const TableHeaderCell = styled.div`
  font-size: 1.2rem;
  padding: 4px;
  text-align: center;
  width: ${props => props.title ? "20%" : props.description ? "30%" : props.actions ? "10%" : "20%"};
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;

  .row:nth-child(odd) {
    background-color: #b9b9b9;
  }
  .row:nth-child(even) {
    background-color: #8a8a8a;
  }

  .row:hover {
    --row-border-rad-px : 5px;
    --row-border-px : 1px;
    background-color: white;
    color: black;
    border-bottom: var(--row-border-px) solid #161616;
    border-left: var(--row-border-px) solid #161616;
    border-right: var(--row-border-px) solid #161616;
    border-top-left-radius: var(--row-border-rad-px);
    border-bottom-left-radius: var(--row-border-rad-px);
    border-top-right-radius: var(--row-border-rad-px);
    border-bottom-right-radius: var(--row-border-rad-px);
  }

  .content:hover {
    height: 50px;
  }

`;

const TableRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 0.5s;
`;

const TableRowContent = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  transition: inherit;

  div:nth-child(5) {
    display: flex;
    justify-content: space-evenly;
  }
`;

const TableRowUpdates = styled.div`
  display: flex;
  background-color: #0d9b38;
`;

const TableRowCell = styled.div`
  font-size: 1.2rem;
  padding: 4px;
  vertical-align: middle;
  text-align: ${props => props.center ? "center" : "justify"};
  width: ${props => props.title ? "20%" : props.description ? "30%" : props.actions ? "10%" : "20%"};
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 1px 4px;
  text-align: ${props => props.center ? "center" : "justify"};
  width: 100%;
`;

const Button = styled.button`
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

      <TableHeader>
        <TableHeaderCell title>Title</TableHeaderCell>
        <TableHeaderCell description>Description</TableHeaderCell>
        <TableHeaderCell>Created At</TableHeaderCell>
        <TableHeaderCell>Updated At</TableHeaderCell>
        <TableHeaderCell actions>Actions</TableHeaderCell>
      </TableHeader>

      <TableBody>

        { tasks.map((task, index) => (
          <TableRow className="row" key={ index }>

            <TableRowContent className="content">

              <TableRowCell
                title
                onClick={ task.isEditing ? null : () => dispatch(toggleUpdateTask(task.id)) }
              >
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
              </TableRowCell>

              <TableRowCell
                description
                onClick={ task.isEditing ? null : () => dispatch(toggleUpdateTask(task.id)) }
              >
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
              </TableRowCell>

              <TableRowCell
                center
                onClick={ task.isEditing ? null : () => dispatch(toggleUpdateTask(task.id)) }
              >
                { task.createdAt }
              </TableRowCell>

              <TableRowCell
                center
                onClick={ task.isEditing ? null : () => dispatch(toggleUpdateTask(task.id)) }
              >
                { !task.updates.length ? 'No updates' : task.updates[0].updatedAt }
              </TableRowCell>

              <TableRowCell center actions>
                { task.isEditing ?
                  <Button save onClick={ () => handleSave(task) }>
                    <i className="fas fa-save fa-2x"></i>
                  </Button>
                  :
                  <Button edit onClick={ () => handleEdit(task) }>
                    <i className="fas fa-pencil-alt fa-2x"></i>
                  </Button>
                }
                <Button delete onClick={ () => dispatch(deleteTask(task.id)) }>
                  <i className="fas fa-trash fa-2x"></i>
                </Button>
              </TableRowCell>

            </TableRowContent>

            <TableRowUpdates>
              <div hidden={ task.isHidden }>
                <ul style={ { 'list-style': 'none' } }>
                  <li>asdasdas</li>
                  <li>asdasdas</li>
                  <li>asdasdas</li>
                  <li>asdasdas</li>
                  <li>asdasdas</li>
                </ul>
              </div>
            </TableRowUpdates>

          </TableRow>
        )) }

      </TableBody>

    </Table >
  );
};

export default TaskTable;
