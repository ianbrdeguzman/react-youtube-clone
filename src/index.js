import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProvider } from './components/shared/context';
import { AuthProvider } from './context/authContext';
import { MenuProvider } from './context/menuContext';
import { HomeProvider } from './context/homeContext';
import { ChannelProvider } from './context/channelContext';

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <MenuProvider>
                <HomeProvider>
                    <ChannelProvider>
                        <AppProvider>
                            <App />
                        </AppProvider>
                    </ChannelProvider>
                </HomeProvider>
            </MenuProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
