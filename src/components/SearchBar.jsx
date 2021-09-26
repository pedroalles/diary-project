import React, { useEffect } from 'react';
import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import { setFilter } from '../redux/actions';

const Input = styled.input`
  margin-right: 2px;
  font-size: 1.2rem;
  padding: 4px;
  width: 200px;
`;

const SearchBar = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.tasksReducer.filter);
  const handleChange = ({ target: { value } }) => {
    dispatch(setFilter(value));
  };

  return (
    <Input
      type="text"
      placeholder="Search"
      value={ filter }
      onChange={ handleChange }
    />
  );
};

export default SearchBar;
