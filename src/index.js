import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProvider } from './components/shared/context';
import { AuthProvider } from './context/authContext';
import { MenuProvider } from './context/menuContext';

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <MenuProvider>
                <AppProvider>
                    <App />
                </AppProvider>
            </MenuProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
