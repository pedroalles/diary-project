import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addUpdate, deleteUpdate } from '../redux/actions';

import { SearchBar } from '.';

import styled from 'styled-components';

const TableUpdates = styled.div`
  font-size: 1.2rem;
  width: 50%;
  margin: auto;

  .container {
    background-color: #cccccc;
    padding: 5px;
    border: 1px solid black;
    border-radius: 5px;
    margin: 10px;
  }

  .row:nth-child(odd) {
    background-color: #afafaf;
  }
  .row:nth-child(even) {
    background-color: #919191;
  }

  p {
    width: 60%;
    margin: 10px auto;
    text-align: center;
    color: black;
    font-size: 1.2rem;
  }

`;

const UpdatesRow = styled.div`
  display: flex;
  height: 30px;
  align-items: center;

  div {
    padding: 5px;
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
  }
`;

const UpdatesHeader = styled.div`
  display: flex;
  background-color: black;
  color: white;
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

const Button = styled.button`
  border: none;
  background: none;
  vertical-align: middle;
  color: ${props => props.del ? "#be4040" : "#6565d6"};
`;

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

  const filter = useSelector(state => state.tasksReducer.filter.update);

  let updates = task.updates;

  if (filter) {
    const lowFilter = filter.toLowerCase();
    updates = updates
      .filter(({ description, createdAt }) =>
        description.toLowerCase().includes(lowFilter) ||
        createdAt.toLowerCase().includes(lowFilter));
  }


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
            <Button
              type="submit"
            >
              <i className="fas fa-plus-circle fa-lg"></i>
            </Button>
          </form>

          <SearchBar mode="update" />

        </Header>

        { !task.updates.length ? <p>No updates</p> :

          <div >

            <UpdatesHeader>
              <div>
                Description
              </div>
              <div>
                Created At
              </div>
              <div>
                Actions
              </div>
            </UpdatesHeader>

            { updates.map((update) => (

              <UpdatesRow className="row" key={ update.id }>
                <div>
                  { update.description }
                </div>
                <div>
                  { update.createdAt }
                </div>
                <div>
                  <Button
                    del
                    onClick={ () => dispatch(deleteUpdate({ idTask: task.id, idUpdate: update.id })) }
                  >
                    <i className="fas fa-trash fa-lg"></i>
                  </Button>
                </div>
              </UpdatesRow>

            )) }
          </div>
        }
      </div>

    </TableUpdates >
  );
};

export default TableRowUpdates;
