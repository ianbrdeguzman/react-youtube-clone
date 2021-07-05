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
import { SearchProvider } from './context/searchContext';
import { VideoProvider } from './context/videoContext';
import { CommentProvider } from './context/commentContext';

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <MenuProvider>
                <HomeProvider>
                    <ChannelProvider>
                        <LikedProvider>
                            <SearchProvider>
                                <VideoProvider>
                                    <CommentProvider>
                                        <AppProvider>
                                            <App />
                                        </AppProvider>
                                    </CommentProvider>
                                </VideoProvider>
                            </SearchProvider>
                        </LikedProvider>
                    </ChannelProvider>
                </HomeProvider>
            </MenuProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
