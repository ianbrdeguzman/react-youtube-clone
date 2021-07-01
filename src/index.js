import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppProvider } from './components/shared/context';
import { AuthProvider } from './context/authContext';
import { MenuProvider } from './context/menuContext';
import { HomeProvider } from './context/homeContext';
import { ChannelProvider } from './context/channelContext';
import { LikedProvider } from './context/likedContext';

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <MenuProvider>
                <HomeProvider>
                    <ChannelProvider>
                        <LikedProvider>
                            <AppProvider>
                                <App />
                            </AppProvider>
                        </LikedProvider>
                    </ChannelProvider>
                </HomeProvider>
            </MenuProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
