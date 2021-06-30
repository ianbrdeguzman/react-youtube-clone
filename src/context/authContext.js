import React, { createContext, useReducer } from 'react';
import firebase from 'firebase/app';
import auth from '../firebase';

const AuthContext = createContext();

const initialState = {
    accessToken: null,
    userProfile: null,
};

const reducer = (state, action) => {
    switch (action.type) {
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
        default:
            return {
                ...state,
            };
    }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

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
        <AuthContext.Provider value={{ ...state, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
