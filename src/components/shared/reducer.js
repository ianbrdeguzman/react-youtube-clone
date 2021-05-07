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
                commentList: action.payload,
            };
        case 'SET_RELATED_VIDEOS':
            return {
                ...state,
                relatedVideos: action.payload,
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
                subscribedChannels:
                    state.accessToken === action.payload.accessToken
                        ? [
                              ...state.subscribedChannels,
                              ...action.payload.channels,
                          ]
                        : action.payload.channels,
                subscribedChannelsNextPageToken: action.payload.nextPageToken,
                isLoading: false,
            };
        case 'CLEAR_SUBSCRIBED_CHANNELS':
            return {
                ...state,
                subscribedChannels: [],
                subscribedChannelsNextPageToken: '',
            };
        case 'CLEAR_SUBSCRIBED_STATUS':
            return {
                ...state,
                channelSubscriptionStatus: false,
            };
        case 'SET_LIKED_VIDEOS':
            return {
                ...state,
                likedVideos:
                    state.accessToken === action.payload.accessToken
                        ? [...state.likedVideos, ...action.payload.likedVideos]
                        : action.payload.likedVideos,
                likedVideosNextPageToken: action.payload.nextPageToken,
                isLoading: false,
            };
        case 'CLEAR_LIKED_VIDEOS':
            return {
                ...state,
                likedVideos: [],
            };
        case 'CLEAR_COMMENTS_LIST':
            return {
                ...state,
                commentList: [],
                commentListNextPageToken: '',
            };
        case 'CLEAR_RELATED_VIDEOS':
            return {
                ...state,
                relatedVideos: [],
                relatedVideosNextPageToken: '',
            };
        case 'CLEAR_HOME_VIDEOS':
            return {
                ...state,
                popularVideos: [],
                nextPageToken: '',
            };
        default:
            throw new Error('No action type found');
    }
};

export default reducer;
