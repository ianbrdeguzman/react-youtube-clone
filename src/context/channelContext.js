import React, { createContext, useReducer } from 'react';
import request from '../helpers/axios';

const ChannelContext = createContext();

const initialState = {
    loading: false,
    subsLoading: false,
    details: null,
    videos: [],
    subscriptionStatus: null,
    error: null,
    channels: [],
    nextPageToken: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANNEL_DETAILS_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'CHANNEL_DETAILS_SUCCESS':
            return {
                ...state,
                loading: false,
                details: action.payload,
            };
        case 'CHANNEL_DETAILS_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'CHANNEL_VIDEOS_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'CHANNEL_VIDEOS_SUCCESS':
            return {
                ...state,
                loading: false,
                videos: action.payload,
            };
        case 'CHANNEL_VIDEOS_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'CHANNEL_SUBSCRIPTION_STATUS_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'CHANNEL_SUBSCRIPTION_STATUS_SUCCESS':
            return {
                ...state,
                loading: false,
                subscriptionStatus: true,
            };
        case 'CHANNEL_SUBSCRIPTION_STATUS_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'CHANNEL_SUBSCRIBE_REQUEST':
            return {
                ...state,
                subsLoading: true,
            };
        case 'CHANNEL_SUBSCRIBE_SUCCESS':
            return {
                ...state,
                subsLoading: false,
                subscriptionStatus: true,
            };
        case 'CHANNEL_SUBSCRIBE_FAIL':
            return {
                ...state,
                subsLoading: false,
                error: action.payload,
            };
        case 'CHANNEL_SUBSCRIPTIONS_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'CHANNEL_SUBSCRIPTIONS_SUCCESS':
            return {
                ...state,
                loading: false,
                channels:
                    localStorage.getItem('accessToken') ===
                    action.payload.accessToken
                        ? [...state.channels, ...action.payload.channels]
                        : action.payload.channels,
            };
        case 'CHANNEL_SUBSCRIPTIONS_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'CHANNEL_UNSUBSCRIBE_REQUEST':
            return {
                ...state,
                subsLoading: true,
            };
        case 'CHANNEL_UNSUBSCRIBE_SUCCESS':
            return {
                ...state,
                subsLoading: false,
                channels: state.channels.filter(
                    (channel) => channel.id !== action.payload
                ),
            };
        case 'CHANNEL_UNSUBSCRIBE_FAIL':
            return {
                ...state,
                subsLoading: false,
                error: action.payload,
            };
        default:
            return { ...state };
    }
};

const ChannelProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchDetails = async (channelId) => {
        dispatch({ type: 'CHANNEL_DETAILS_REQUEST' });
        try {
            const { data } = await request('/channels', {
                params: {
                    part: 'snippet,statistics,contentDetails',
                    id: channelId,
                },
            });
            dispatch({
                type: 'CHANNEL_DETAILS_SUCCESS',
                payload: data.items[0],
            });
        } catch (error) {
            dispatch({ type: 'CHANNEL_DETAILS_FAIL', payload: error.message });
        }
    };

    const fetchVideos = async (channelId) => {
        dispatch({ type: 'CHANNEL_VIDEOS_REQUEST' });
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
                type: 'CHANNEL_VIDEOS_SUCCESS',
                payload: data.items,
            });
        } catch (error) {
            dispatch({ type: 'CHANNEL_VIDEOS_FAIL', payload: error.message });
        }
    };

    const fetchSubscriptionStatus = async (channelId) => {
        dispatch({ type: 'CHANNEL_SUBSCRIPTION_STATUS_REQUEST' });
        try {
            const { data } = await request('/subscriptions', {
                params: {
                    part: 'snippet',
                    forChannelId: channelId,
                    mine: true,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
            });
            if (data) {
                dispatch({ type: 'CHANNEL_SUBSCRIPTION_STATUS_SUCCESS' });
            }
        } catch (error) {
            dispatch({
                type: 'CHANNEL_SUBSCRIPTION_STATUS_FAIL',
                payload: error.response.data,
            });
        }
    };

    const subscribeToChannel = async (channelId) => {
        dispatch({ type: 'CHANNEL_SUBSCRIBE_REQUEST' });
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
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
            });

            dispatch({ type: 'CHANNEL_SUBSCRIBE_SUCCESS' });
        } catch (error) {
            dispatch({
                type: 'CHANNEL_SUBSCRIBE_FAIL',
                payload: error.message,
            });
        }
    };

    const unsubscribeToChannel = async (id) => {
        dispatch({ type: 'CHANNEL_UNSUBSCRIBE_REQUEST' });
        try {
            await request.delete('/subscriptions', {
                params: {
                    id,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
            });

            dispatch({
                type: 'CHANNEL_UNSUBSCRIBE_SUCCESS',
                payload: id,
            });
        } catch (error) {
            dispatch({
                type: 'CHANNEL_UNSUBSCRIBE_FAIL',
                payload: error.message,
            });
        }
    };

    const fetchSubscribedChannels = async () => {
        if (!state.nextPageToken)
            dispatch({ type: 'CHANNEL_SUBSCRIPTIONS_REQUEST' });
        try {
            const { data } = await request('/subscriptions', {
                params: {
                    part: 'snippet,contentDetails',
                    maxResults: 6,
                    mine: true,
                    pageToken: state.subscribedChannelsNextPageToken,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
            });

            dispatch({
                type: 'CHANNEL_SUBSCRIPTIONS_SUCCESS',
                payload: {
                    channels: data.items,
                    nextPageToken: data.nextPageToken,
                },
            });
        } catch (error) {
            dispatch({
                type: 'CHANNEL_SUBSCRIPTIONS_FAIL',
                payload: error.message,
            });
        }
    };

    return (
        <ChannelContext.Provider
            value={{
                ...state,
                fetchDetails,
                fetchVideos,
                fetchSubscriptionStatus,
                subscribeToChannel,
                fetchSubscribedChannels,
                unsubscribeToChannel,
            }}
        >
            {children}
        </ChannelContext.Provider>
    );
};

export { ChannelContext, ChannelProvider };
