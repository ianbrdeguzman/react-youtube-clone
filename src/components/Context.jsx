import React, { createContext, useReducer } from 'react';

const AppContext = createContext();

const defaultState = {
    isMenuOpen: true,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_MENU_TOGGLE':
            return { ...state, isMenuOpen: !action.payload };
        default:
            throw new Error('No action type found');
    }
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const onMenuClick = () => {
        console.log('clicked');
        dispatch({ type: 'SET_MENU_TOGGLE', payload: state.isMenuOpen });
    };

    return (
        <AppContext.Provider value={{ ...state, onMenuClick }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
