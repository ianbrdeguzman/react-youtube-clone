import React, { createContext, useReducer } from 'react';
import request from './axios';
import firebase from 'firebase/app';
import auth from '../../firebase';
import reducer from './reducer';

const AppContext = createContext();

const defaultState = {
    isMenuOpen: true,
    homeVideos: [],
    homeVideosNextPageToken: '',
    activeCategory: 'All',
    isLoading: true,
    searchedVideos: [],
    watchVideo: [],
    watchVideoId: '',
    categoryId: '',
    commentList: [],
    relatedVideos: [],
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
    subscribedChannelsNextPageToken: '',
    likedVideos: [],
    likedVideosNextPageToken: '',
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const onMenuClick = () => {
        dispatch({ type: 'SET_MENU_TOGGLE', payload: state.isMenuOpen });
    };

    const fetchHomeVideos = async () => {
        if (!state.homeVideosNextPageToken) dispatch({ type: 'SET_ISLOADING' });
        try {
            const { data } = await request('/videos', {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    chart: 'mostPopular',
                    regionCode: 'US',
                    maxResults: 20,
                    pageToken: state.homeVideosNextPageToken,
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

    const fetchLikedVideos = async () => {
        dispatch({ type: 'SET_ISLOADING' });
        try {
            const { data } = await request('/videos', {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    maxResults: 20,
                    myRating: 'like',
                    pageToken: state.likedVideosNextPageToken,
                },
                headers: {
                    Authorization: `Bearer ${state.accessToken}`,
                },
            });

            dispatch({
                type: 'SET_LIKED_VIDEOS',
                payload: {
                    likedVideos: data.items,
                    nextPageToken: data.nextPageToken,
                    accessToken: state.accessToken,
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
                    pageToken: state.homeVideosNextPageToken,
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
                payload: data.items,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCommentsOfVideoById = async (id) => {
        try {
            const { data } = await request('/commentThreads', {
                params: {
                    part: 'snippet',
                    videoId: id,
                },
            });
            dispatch({
                type: 'SET_COMMENT_LIST',
                payload: data.items,
            });
        } catch (error) {
            console.log(error);
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

    const likeAVideo = async (videoId) => {
        try {
            const response = await request.post('/rate', {
                params: {
                    id: videoId,
                    rating: 'like',
                },
                headers: {
                    Authorization: `Bearer ${state.accessToken}`,
                },
            });

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const dislikeAVideo = async (videoId) => {
        try {
            const response = await request.post('/rate', {
                params: {
                    id: videoId,
                    rating: 'dislike',
                },
                headers: {
                    Authorization: `Bearer ${state.accessToken}`,
                },
            });

            console.log(response);
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
        dispatch({ type: 'SET_ISLOADING' });
        try {
            const { data } = await request('/subscriptions', {
                params: {
                    part: 'snippet,contentDetails',
                    maxResults: 6,
                    mine: true,
                    pageToken: state.subscribedChannelsNextPageToken,
                },
                headers: {
                    Authorization: `Bearer ${state.accessToken}`,
                },
            });

            dispatch({
                type: 'SET_SUBSCRIBED_CHANNELS',
                payload: {
                    channels: data.items,
                    nextPageToken: data.nextPageToken,
                    accessToken: state.accessToken,
                },
            });
        } catch (error) {
            console.log(error);
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
            console.log(response);
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
                fetchHomeVideos,
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
                fetchLikedVideos,
                likeAVideo,
                dislikeAVideo,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
