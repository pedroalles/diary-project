import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import { setFilter } from '../redux/actions';

const InputSearch = styled.input`
  margin-right: 2px;
  font-size: 1.2rem;
  padding: 4px;
  width: 200px;
`;

const SearchBar = ({ mode }) => {

  const dispatch = useDispatch();
  const filter = useSelector(state => state.tasksReducer.filter);

  const handleChange = ({ target: { value } }) => dispatch(setFilter({ mode: mode, filter: value }));

  return (
    <InputSearch
      mode={ mode }
      type="text"
      placeholder="Search"
      value={ filter[mode] }
      onChange={ handleChange }
    />
  );
};

export default SearchBar;
