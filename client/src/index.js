import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import store from './reduxStore'

import { Provider } from 'react-redux'
//import MyContext from './components/Context'


   
    ReactDOM.render(
        <React.StrictMode>
            
                <Provider store={store}>
                    <App />
                </Provider>
             
        </React.StrictMode>,
        document.getElementById('root')
    );


//  renderEntireTree(store);
//  store.subscribe(() => renderEntireTree(store));
window.store=store


