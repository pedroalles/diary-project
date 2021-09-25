import React from 'react';

import { Provider } from 'react-redux';

import TaskForm from './components/TaskForm';

import store from './redux/store';

function App() {
  return (
    <Provider store={ store }>
      <TaskForm />
    </Provider>
  );
}

export default App;
