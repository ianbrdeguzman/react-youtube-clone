import React, { createContext, useReducer } from 'react';

const MenuContext = createContext();

const initialState = {
    isMenuOpen: true,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'MENU_TOGGLE':
            return {
                ...state,
                isMenuOpen: action.payload,
            };
        default:
            return { ...state };
    }
};

const MenuProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MenuContext.Provider value={{ ...state, dispatch }}>
            {children}
        </MenuContext.Provider>
    );
};

export { MenuContext, MenuProvider };
