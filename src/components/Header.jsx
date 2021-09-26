import React from 'react';

import styled from 'styled-components';

import { TaskForm, SearchBar } from '.';

const StyledHeader = styled.header`
  /* background-color: gray; */
  display: flex;
  justify-content: space-between;
  margin: 6px auto;
  width: 80%;
`;

const Header = () => {
  return (
    <StyledHeader>
      <TaskForm />
      <SearchBar />
    </StyledHeader>
  );
};

export default Header;
