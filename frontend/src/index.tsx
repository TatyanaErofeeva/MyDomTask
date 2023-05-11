// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
//import reportWebVitals from './reportWebVitals';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { Provider } from 'react-redux';
import browserHistory from './browser-history';
import { store } from './store';
import HistoryRouter from './components/history-router';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render( 
//   <>
//     <ToastContainer/>
//     <App />
//   </>

// );

// reportWebVitals();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
