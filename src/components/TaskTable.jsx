import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  toggleUpdateTask,
} from '../redux/actions';

import CellTitle from './CellTitle';
import CellDescription from './CellDescription';
import TableRowCellActions from './TableRowCellActions';
import TableRowUpdates from './TableRowUpdates';

import styled from 'styled-components';

const Table = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;

  p {
    color:white;
    text-align: center;
    margin-top: 80px;
    font-size: 2rem;
    /* vertical-align: middle; */
  }
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
    background-color: #d1d1d1;
  }
  .row:nth-child(even) {
    background-color: #bbbbbb;
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

export const TableRowCell = styled.div`
  font-size: 1.2rem;
  padding: 5px;
  vertical-align: middle;
  text-align: ${props => props.center ? "center" : "justify"};
  width: ${props => props.title ? "20%" : props.description ? "30%" : props.actions ? "10%" : "20%"};
`;

export const Input = styled.input`
  font-size: 1rem;
  padding: 1px 4px;
  text-align: ${props => props.center ? "center" : "justify"};
  width: 100%;
`;

export const Button = styled.button`
  border: none;
  background: none;
  color: ${props => props.save ? "#128826" : props.edit ? "#d14d00" : "#be4040"};
`;

const TaskTable = () => {

  let tasks = useSelector(state => state.tasksReducer.tasks);

  const filter = useSelector(state => state.tasksReducer.filter.task);
  const dispatch = useDispatch();

  if (filter) {
    const lowFilter = filter.toLowerCase();
    tasks = tasks
      .filter(({ title, description, createdAt }) =>
        title.toLowerCase().includes(lowFilter) ||
        description.toLowerCase().includes(lowFilter) ||
        createdAt.toLowerCase().includes(lowFilter));
  }

  return (

    <Table>
      { !tasks.length ?
        <p>No tasks</p> :
        <TableHeader>
          <TableHeaderCell title>Title</TableHeaderCell>
          <TableHeaderCell description>Description</TableHeaderCell>
          <TableHeaderCell>Created At</TableHeaderCell>
          <TableHeaderCell>Updated At</TableHeaderCell>
          <TableHeaderCell actions>Actions</TableHeaderCell>
        </TableHeader>
      }

      <TableBody>

        { tasks.map((task, index) => (
          <TableRow className="row" key={ index }>

            <TableRowContent className="content">
              <CellTitle
                task={ task }
                mode="task"
              />
              <CellDescription
                task={ task }
                mode="task"
              />
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
                { !task.updates.length ? 'No updates' : task.updates[task.updates.length - 1].createdAt }
              </TableRowCell>
              <TableRowCellActions
                task={ task }
                mode="task"
              />
            </TableRowContent>

            <TableRowUpdates task={ task } />

          </TableRow>
        )) }

      </TableBody>

    </Table >
  );
};

export default TaskTable;
