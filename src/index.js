import React from 'react';
import ReactDom from 'react-dom';
import { DndProvider } from 'react-dnd'
import SortApp from './components/SortApp';
import Backend from 'react-dnd-html5-backend';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <DndProvider backend={Backend}>
      <SortApp />
    </DndProvider>
  )
}

ReactDom.render(
  <App />,
  document.querySelector("#root")
);