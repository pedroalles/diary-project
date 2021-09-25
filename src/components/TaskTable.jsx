import React from 'react';

import { useSelector } from 'react-redux';

import styled from 'styled-components';

const Table = styled.table`
  width: 80%;
  margin: auto;

  tbody {
    tr:nth-child(odd) {
      background-color: #00ce6e;
    }
    tr:nth-child(even) {
      background-color: #00ce6e8b;
    }
    tr:hover {
      background-color: #ffffff;
      color: #2e2e2e
    }
  }
`;

const TheadRow = styled.tr`
  background-color: #2e2e2e ;
  color: white;
`;

const TheadCell = styled.td`
  padding: 4px;
  text-align: center;
  width: ${props => props.title ? "25%" : props.description ? "35%" : "20%"};
`;

const TbodyCell = styled.td`
  text-align: ${props => props.center ? "center" : "justify"};
  padding: 4px;
`;

const TaskTable = () => {
  const todos = useSelector(state => state.todoReducer.todos);

  return (
    <Table>

      <thead>
        <TheadRow>
          <TheadCell>Title</TheadCell>
          <TheadCell description>Description</TheadCell>
          <TheadCell>Created At</TheadCell>
          <TheadCell>Updated At</TheadCell>
        </TheadRow>
      </thead>

      <tbody>
        { todos.map((todo) => (
          <tr>
            <TbodyCell>{ todo.title }</TbodyCell>
            <TbodyCell>{ todo.description }</TbodyCell>
            <TbodyCell center>{ todo.createdAt }</TbodyCell>
            <TbodyCell center>{ !todo.updates.length ? 'No updates' : todo.updates[0].updatedAt }</TbodyCell>
          </tr>
        )) }
      </tbody>

    </Table>
  );
};

export default TaskTable;