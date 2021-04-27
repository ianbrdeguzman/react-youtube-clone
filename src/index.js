import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProvider } from './components/Context';
import CssBaseline from '@material-ui/core/CssBaseline';

ReactDOM.render(
    <React.StrictMode>
        <AppProvider>
            <CssBaseline />
            <App />
        </AppProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
