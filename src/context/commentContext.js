import React, { createContext, useReducer } from 'react';
import request from '../helpers/axios';

const CommentContext = createContext();

const initialState = {
    loading: false,
    comments: [],
    videoId: null,
    error: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'COMMENT_GET_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'COMMENT_GET_SUCCESS':
            return {
                ...state,
                loading: false,
                comments: action.payload,
            };
        case 'COMMENT_GET_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'COMMENT_ADD_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'COMMENT_ADD_SUCCESS':
            return {
                ...state,
                comments: [action.payload, ...state.comments],
            };
        case 'COMMENT_ADD_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

const CommentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchCommentsOfVideoById = async (id) => {
        dispatch({ type: 'COMMENT_GET_REQUEST' });
        try {
            const { data } = await request('/commentThreads', {
                params: {
                    part: 'snippet',
                    videoId: id,
                },
            });
            dispatch({
                type: 'COMMENT_GET_SUCCESS',
                payload: data.items,
            });
        } catch (error) {
            dispatch({ type: 'COMMENT_GET_FAIL', payload: error.message });
        }
    };

    const addCommentToVideo = async (id, comment) => {
        dispatch({ type: 'COMMENT_ADD_REQUEST' });
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
            const { data } = await request.post('/commentThreads', obj, {
                params: {
                    part: 'snippet',
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
            });

            dispatch({ type: 'COMMENT_ADD_SUCCESS', payload: data });
        } catch (error) {
            dispatch({ type: 'COMMENT_ADD_FAIL', payload: error.message });
        }
    };

    return (
        <CommentContext.Provider
            value={{ ...state, fetchCommentsOfVideoById, addCommentToVideo }}
        >
            {children}
        </CommentContext.Provider>
    );
};

export { CommentContext, CommentProvider };
