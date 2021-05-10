const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_MENU_TOGGLE':
            return { ...state, isMenuOpen: !action.payload };
        case 'SET_ISLOADING':
            return { ...state, isLoading: true };
        case 'SET_HOME_VIDEOS':
            return {
                ...state,
                homeVideos:
                    state.activeCategory === action.payload.category
                        ? [...state.homeVideos, ...action.payload.videos]
                        : action.payload.videos,
                homeVideosNextPageToken: action.payload.token,
                activeCategory: action.payload.category,
                watchVideoId: '',
                categoryId: '',
                searchedVideos: [],
                searchedVideosNextPageToken: '',
                searchedKeyword: '',
                likedVideos: [],
                likedVideosNextPageToken: '',
                subscribedChannels: [],
                subscribedChannelsNextPageToken: '',
                channelSubscriptionStatus: false,
                commentList: [],
                relatedVideos: [],
                isLoading: false,
            };
        case 'SET_SEARCHED_VIDEOS':
            console.log(action.payload.token);
            return {
                ...state,
                searchedVideos:
                    state.searchedKeyword === action.payload.input
                        ? [...state.searchedVideos, ...action.payload.videos]
                        : action.payload.videos,
                searchedVideosNextPageToken: action.payload.token,
                searchedKeyword: action.payload.input,
                homeVideos: [],
                homeVideosNextPageToken: '',
                likedVideos: [],
                likedVideosNextPageToken: '',
                subscribedChannels: [],
                subscribedChannelsNextPageToken: '',
                channelSubscriptionStatus: false,
                commentList: [],
                relatedVideos: [],
                isLoading: false,
            };
        case 'SET_WATCH_VIDEO':
            return {
                ...state,
                watchVideo: action.payload.watchVideo,
                watchVideoId: action.payload.watchVideoId,
                categoryId: action.payload.categoryId,
                homeVideos: [],
                homeVideosNextPageToken: '',
                searchedVideos: [],
                searchedVideosNextPageToken: '',
                searchedKeyword: '',
                likedVideos: [],
                likedVideosNextPageToken: '',
                subscribedChannels: [],
                subscribedChannelsNextPageToken: '',
                channelSubscriptionStatus: false,
                commentList: [],
                relatedVideos: [],
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
                homeVideo: [],
                homeVideosNextPageToken: '',
                searchedVideos: [],
                searchedVideosNextPageToken: '',
                searchedKeyword: '',
                likedVideos: [],
                likedVideosNextPageToken: '',
                subscribedChannels: [],
                subscribedChannelsNextPageToken: '',
                channelSubscriptionStatus: false,
                commentList: [],
                relatedVideos: [],
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
                homeVideos: [],
                homeVideosNextPageToken: '',
                searchedVideos: [],
                searchedVideosNextPageToken: '',
                searchedKeyword: '',
                likedVideos: [],
                likedVideosNextPageToken: '',
                channelSubscriptionStatus: false,
                commentList: [],
                relatedVideos: [],
                isLoading: false,
            };
        case 'SET_LIKED_VIDEOS':
            return {
                ...state,
                likedVideos:
                    state.accessToken === action.payload.accessToken
                        ? [...state.likedVideos, ...action.payload.likedVideos]
                        : action.payload.likedVideos,
                likedVideosNextPageToken: action.payload.nextPageToken,
                homeVideos: [],
                homeVideosNextPageToken: '',
                searchedVideos: [],
                searchedVideosNextPageToken: '',
                searchedKeyword: '',
                subscribedChannels: [],
                subscribedChannelsNextPageToken: '',
                channelSubscriptionStatus: false,
                commentList: [],
                relatedVideos: [],
                isLoading: false,
            };
        default:
            throw new Error('No action type found');
    }
};

export default reducer;
