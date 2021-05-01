import React, { useContext } from 'react';
import styles from './CategoriesBar.module.css';
import { AppContext } from './Context';

const categories = [
    'All',
    'React js',
    'CSS Module',
    'Youtube API',
    'useContext',
    'useReducer',
    'Firebase',
    'Firebase Auth',
    'Axios js',
    'Coding',
    'Web dev',
    'SASS',
    'Gatsby',
    'Redux',
    'Styled Components',
    'Material UI',
    'API',
    'HTML5',
    'CSS3',
];

const CategoriesBar = () => {
    const { activeCategory, isMenuOpen, fetchVideosByCategory } = useContext(
        AppContext
    );

    const handleOnClick = (keyword) => {
        fetchVideosByCategory(keyword);
    };

    return (
        <div
            className={
                isMenuOpen
                    ? styles.categories
                    : `${styles.categories} ${styles.closed}`
            }
        >
            {categories.map((keyword, index) => {
                return (
                    <span
                        onClick={() => handleOnClick(keyword)}
                        key={index}
                        style={
                            activeCategory === keyword
                                ? {
                                      backgroundColor: '#ffffff',
                                      color: '#000000',
                                  }
                                : null
                        }
                    >
                        {keyword}
                    </span>
                );
            })}
        </div>
    );
};

export default CategoriesBar;
