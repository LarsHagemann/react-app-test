import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { store } from './app/store';
import { Provider } from 'react-redux';
import CodeInputAndController from './features/code-input-and-control/code-input-and-control';
import './features/console/console.module'
import CustomConsole from './features/console/console.module';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render((
  <React.StrictMode>
    <Provider store={store}>
      <div className='first'><CodeInputAndController editor_id={0} /></div>
      <div className='second'><CodeInputAndController editor_id={1} /></div>
      <div className='third'><CodeInputAndController editor_id={2} /></div>
      <div className='fourth'><CodeInputAndController editor_id={3} /></div>
      <div className='console'><CustomConsole /></div>
    </Provider>
  </React.StrictMode>
));
