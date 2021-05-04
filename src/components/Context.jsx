import React, { createContext, useReducer } from 'react';
import request from './axios';
import firebase from 'firebase/app';
import auth from '../firebase';
import axios from 'axios';

const AppContext = createContext();

const defaultState = {
    isMenuOpen: true,
    popularVideos: [],
    nextPageToken: '',
    activeCategory: 'All',
    isLoading: true,
    searchedVideos: [],
    watchVideo: [],
    watchVideoId: '',
    categoryId: '',
    commentList: [],
    commentNextPageToken: '',
    relatedVideos: [],
    relatedVideosNextPageToken: '',
    accessToken: sessionStorage.getItem('accessToken')
        ? sessionStorage.getItem('accessToken')
        : null,
    userProfile: sessionStorage.getItem('userProfile')
        ? JSON.parse(sessionStorage.getItem('userProfile'))
        : null,
    channelDetails: '',
    channelVideos: [],
    channelSubscriptionStatus: false,
    subscribedChannels: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_MENU_TOGGLE':
            return { ...state, isMenuOpen: !action.payload };
        case 'SET_ISLOADING':
            return { ...state, isLoading: true };
        case 'SET_HOME_VIDEOS':
            return {
                ...state,
                popularVideos:
                    state.activeCategory === action.payload.category
                        ? [...state.popularVideos, ...action.payload.videos]
                        : action.payload.videos,
                nextPageToken: action.payload.token,
                activeCategory: action.payload.category,
                watchVideoId: '',
                categoryId: '',
                watchVideoId: '',
                relatedVideos: [],
                isLoading: false,
            };
        case 'SET_SEARCHED_VIDEOS':
            return {
                ...state,
                searchedVideos: action.payload,
                isLoading: false,
            };
        case 'SET_WATCH_VIDEO':
            return {
                ...state,
                watchVideo: action.payload.watchVideo,
                watchVideoId: action.payload.watchVideoId,
                categoryId: action.payload.categoryId,
                isLoading: false,
            };
        case 'SET_COMMENT_LIST':
            return {
                ...state,
                commentList:
                    state.watchVideoId === action.payload.watchVideoId
                        ? [...state.commentList, ...action.payload.commentList]
                        : action.payload.commentList,
                commentNextPageToken: action.payload.commentNextPageToken,
            };
        case 'SET_RELATED_VIDEOS':
            return {
                ...state,
                relatedVideos:
                    state.watchVideoId === action.payload.relatedVideoId
                        ? [
                              ...state.relatedVideos,
                              ...action.payload.relatedVideos,
                          ]
                        : action.payload.relatedVideos,
                relatedVideosNextPageToken:
                    action.payload.relatedVideosNextPageToken,
            };
        case 'SIGNIN_WITH_GOOGLE':
            return {
                ...state,
                accessToken: action.payload.accessToken,
                userProfile: action.payload.userProfile,
            };
        case 'SIGNOUT_WITH_GOOGLE':
            return {
                ...state,
                accessToken: null,
                userProfile: null,
            };
        case 'SET_CHANNEL_DETAILS':
            return {
                ...state,
                channelDetails: action.payload,
                isLoading: false,
            };
        case 'SET_VIDEOS_BY_CHANNEL':
            return {
                ...state,
                channelVideos: action.payload,
            };

        case 'SET_CHANNEL_SUBSCRIPTION_STATUS':
            return {
                ...state,
                channelSubscriptionStatus: action.payload,
            };
        case 'SET_SUBSCRIBED_CHANNELS':
            return {
                ...state,
                subscribedChannels: action.payload,
                isLoading: false,
            };
        default:
            throw new Error('No action type found');
    }
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const onMenuClick = () => {
        dispatch({ type: 'SET_MENU_TOGGLE', payload: state.isMenuOpen });
    };

    const fetchPopularVideos = async () => {
        if (!state.nextPageToken) dispatch({ type: 'SET_ISLOADING' });
        try {
            const { data } = await request('/videos', {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    chart: 'mostPopular',
                    regionCode: 'US',
                    maxResults: 20,
                    pageToken: state.nextPageToken,
                },
            });
            dispatch({
                type: 'SET_HOME_VIDEOS',
                payload: {
                    videos: data.items,
                    token: data.nextPageToken,
                    category: 'All',
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchVideosByCategory = async (keyword) => {
        try {
            const { data } = await request('/search', {
                params: {
                    part: 'snippet',
                    maxResults: 20,
                    pageToken: state.nextPageToken,
                    q: keyword,
                    type: 'video',
                },
            });
            dispatch({
                type: 'SET_HOME_VIDEOS',
                payload: {
                    videos: data.items,
                    token: data.nextPageToken,
                    category: keyword,
                },
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchVideosBySearch = async (keyword) => {
        dispatch({ type: 'SET_ISLOADING' });
        try {
            const { data } = await request('/search', {
                params: {
                    part: 'snippet',
                    maxResults: 10,
                    q: keyword,
                    type: 'video,channel',
                },
            });
            dispatch({
                type: 'SET_SEARCHED_VIDEOS',
                payload: data.items,
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchVideoById = async (id) => {
        dispatch({ type: 'SET_ISLOADING' });
        try {
            const { data } = await request('/videos', {
                params: {
                    part: 'snippet,statistics',
                    id: id,
                },
            });
            dispatch({
                type: 'SET_WATCH_VIDEO',
                payload: {
                    watchVideo: data.items,
                    watchVideoId: id,
                    categoryId: data.items[0].snippet.categoryId,
                },
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchCommentsOfVideoById = async (id) => {
        try {
            const { data } = await request('/commentThreads', {
                params: {
                    part: 'snippet',
                    videoId: id,
                    pageToken: state.commentNextPageToken,
                },
            });
            dispatch({
                type: 'SET_COMMENT_LIST',
                payload: {
                    commentList: data.items,
                    commentNextPageToken: data.nextPageToken,
                },
            });
        } catch (error) {
            console.log(error.response.data.error.message);
        }
    };

    const addCommentToVideo = async (id, comment) => {
        try {
            const obj = {
                snippet: {
                    videoId: id,
                    topLevelComment: {
                        snippet: {
                            textOriginal: comment,
                        },
                    },
                },
            };
            await request.post('/commentThreads', obj, {
                params: {
                    part: 'snippet',
                },
                headers: {
                    Authorization: `Bearer ${state.accessToken}`,
                },
            });

            setTimeout(() => fetchCommentsOfVideoById(id), 5000);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const fetchRelatedVideos = async (id, categoryId) => {
        try {
            const { data } = await request('/search', {
                params: {
                    part: 'snippet',
                    relatedToVideoId: id,
                    maxResults: 10,
                    type: 'video',
                    videoCategoryId: categoryId || state.categoryId,
                    pageToken: state.relatedVideosNextPageToken,
                },
            });
            dispatch({
                type: 'SET_RELATED_VIDEOS',
                payload: {
                    relatedVideos: data.items,
                    relatedVideosNextPageToken: data.nextPageToken,
                    relatedVideoId: id,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchChannelDetails = async (channelId) => {
        try {
            const { data } = await request('/channels', {
                params: {
                    part: 'snippet,statistics,contentDetails',
                    id: channelId,
                },
            });
            dispatch({
                type: 'SET_CHANNEL_DETAILS',
                payload: data.items[0],
            });
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const fetchChannelSubscriptionStatus = async (channelId) => {
        try {
            const { data } = await request('/subscriptions', {
                params: {
                    part: 'snippet',
                    forChannelId: channelId,
                    mine: true,
                },
                headers: {
                    Authorization: `Bearer ${state.accessToken}`,
                },
            });
            dispatch({
                type: 'SET_CHANNEL_SUBSCRIPTION_STATUS',
                payload: data.items.length !== 0,
            });
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const fetchSubscribedChannels = async () => {
        try {
            const { data } = await request('/subscriptions', {
                params: {
                    part: 'snippet,contentDetails',
                    mine: true,
                },
                headers: {
                    Authorization: `Bearer ${state.accessToken}`,
                },
            });
            console.log(data);
            // dispatch({ type: 'SET_SUBSCRIBED_CHANNELS', payload: data });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchVideosByChannel = async (channelId) => {
        try {
            const {
                data: { items },
            } = await request('/channels', {
                params: {
                    part: 'contentDetails',
                    id: channelId,
                },
            });
            const uploadPlaylistId =
                items[0].contentDetails.relatedPlaylists.uploads;

            const { data } = await request('/playlistItems', {
                params: {
                    part: 'snippet,contentDetails',
                    playlistId: uploadPlaylistId,
                    maxResults: 20,
                },
            });

            dispatch({
                type: 'SET_VIDEOS_BY_CHANNEL',
                payload: data.items,
            });
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    const subscribeToChannel = async (channelId) => {
        try {
            const obj = {
                snippet: {
                    resourceId: {
                        kind: 'youtube#channel',
                        channelId: channelId,
                    },
                },
            };

            await request.post('/subscriptions', obj, {
                params: {
                    part: 'snippet',
                },
                headers: {
                    Authorization: `Bearer ${state.accessToken}`,
                },
            });

            setTimeout(() => {
                fetchChannelSubscriptionStatus(channelId);
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl');

        try {
            const response = await auth.signInWithPopup(provider);
            const accessToken = response.credential.accessToken;
            const userProfile = {
                name: response.additionalUserInfo.profile.name,
                photoURL: response.additionalUserInfo.profile.picture,
            };
            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
            dispatch({
                type: 'SIGNIN_WITH_GOOGLE',
                payload: {
                    accessToken,
                    userProfile,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const signOut = async () => {
        try {
            auth.signOut();
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('userProfile');
            dispatch({ type: 'SIGNOUT_WITH_GOOGLE' });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                onMenuClick,
                fetchPopularVideos,
                fetchVideosByCategory,
                fetchVideosBySearch,
                fetchVideoById,
                fetchCommentsOfVideoById,
                fetchRelatedVideos,
                fetchChannelDetails,
                signInWithGoogle,
                signOut,
                addCommentToVideo,
                fetchVideosByChannel,
                fetchChannelSubscriptionStatus,
                subscribeToChannel,
                fetchSubscribedChannels,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
