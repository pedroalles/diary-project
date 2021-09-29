import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addUpdate } from '../redux/actions';

import { SearchBar } from '.';

import styled from 'styled-components';

import TableRowCellActions from './TableRowCellActions';
import CellDescription from './CellDescription';

import { setSortColumn } from '../helpers/setSort';
import { sortColumn } from '../helpers/sortColumn';

import { Button } from './TaskTable';

const TableUpdates = styled.div`
  font-size: 1.2rem;
  width: 100%;
  margin: auto;

  .container {
    background-color: #ebebeb;
    padding: 5px;
    border: 1px solid black;
    border-radius: 5px;
    margin: 10px;
  }

  .row {
    transition: 0.5s;
  }

  .row:hover {
    --row-border-rad-px : 5px;
    --row-border-px : 1px;

    div:nth-child(1) {
    padding: 10px;
    }

    height: 40px;
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

  .noupdates {
    width: 60%;
    text-align: center;
    color: black;
    font-size: 1.2rem;
    margin: 10px auto;
  }

`;

const UpdatesRow = styled.div`
  display: flex;
  height: 35px;
  align-items: center;

  div {
    padding: 4px;
  }

  div:nth-child(1) {
    width: 50%;
  }
  div:nth-child(2) {
    width: 35%;
    text-align: center;
  }
  div:nth-child(3) {
    text-align: center;
    width: 15%;
    display: flex;
    justify-content: space-evenly;
  }

`;

const UpdatesHeader = styled.div`
  display: flex;
  background-color: #161616;
  color: white;
  padding: 5px;
  align-items: center;
  div:nth-child(1) {
    text-align: center;
    width: 50%;

  }
  div:nth-child(2) {
    width: 35%;
    text-align: center;
  }
  div:nth-child(3) {
    text-align: center;
    width: 15%;
  }
`;

// const Button = styled.button`
//   border: none;
//   background: none;
//   vertical-align: middle;
//   color: ${props => props.del ? "#be4040" : "#6565d6"};
// `;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  /* height: 200px; */

  input:nth-child(1) {
    font-size: 1.2rem;
    padding: 4px;
    width: 300px;
    margin: 5px 5px 5px 0px;
  }

  input:nth-child(2) {
    margin: 5px 0px 5px 0px;
  }
`;

const TableRowUpdates = ({ task }) => {


  const dispatch = useDispatch();
  const [newUpdate, setNewUpdate] = useState({ id: '', description: '' });

  const sortCol = useSelector(state => state.tasksReducer.sort.update);
  const filter = useSelector(state => state.tasksReducer.filter.update);

  let updates = task.updates;

  if (filter) {
    const lowFilter = filter.toLowerCase();
    updates = updates
      .filter(({ description, createdAt }) =>
        description.toLowerCase().includes(lowFilter) ||
        createdAt.toLowerCase().includes(lowFilter));
  }

  updates = sortColumn(sortCol, updates);

  const handleChange = ({ target: { name, value } }) => {
    setNewUpdate({ id: task.id, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUpdate(newUpdate));
    setNewUpdate({ id: '', description: '' });
  };

  return (
    <TableUpdates>

      <div className="container" hidden={ task.isHidden }>

        <Header>
          <form onSubmit={ handleSubmit }>
            <input
              type="text"
              name="description"
              value={ newUpdate.description }
              onChange={ handleChange }
              placeholder="Update Description"
            />
            <Button add type="submit">
              <i className="fas fa-plus-circle fa-2x"></i>
            </Button>
          </form>

          <SearchBar mode="update" />

        </Header>

        { !task.updates.length ? <p className="noupdates">No updates</p> :

          <div >

            <UpdatesHeader>
              <div 
              onClick={ () => setSortColumn('description', 'update', dispatch, sortCol) }
              className="row-content"
              >
              Description</div>
              <div 
              onClick={ () => setSortColumn('createdAt', 'update', dispatch, sortCol) }
              className="row-content"
              >
              Created At</div>
              <div>Actions</div>
            </UpdatesHeader>

            <div >
              { updates.map((update) => (

                <UpdatesRow className="row" key={ update.id }>

                  <CellDescription task={ { taskObj: task, updateObj: update } } mode="update" />

                  <div>{ update.createdAt }</div>

                  <TableRowCellActions task={ { taskObj: task, updateObj: update } } mode="update" />

                </UpdatesRow>
              )) }
            </div>
          </div>
        }
      </div>

    </TableUpdates >
  );
};

export default TableRowUpdates;
