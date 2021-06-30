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

    const onMenuClick = () => {
        dispatch({ type: 'MENU_TOGGLE', payload: !state.isMenuOpen });
    };

    return (
        <MenuContext.Provider value={{ ...state, onMenuClick }}>
            {children}
        </MenuContext.Provider>
    );
};

export { MenuContext, MenuProvider };
