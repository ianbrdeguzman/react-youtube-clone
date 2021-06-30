import React, { useContext } from 'react';
import styles from './CategoriesBar.module.css';
import { AppContext } from '../shared/context';

const categories = [
    'All',
    'React js',
    'CSS Module',
    'Youtube API',
    'React hooks',
    'useReducer and useContext',
    'Firebase',
    'Firebase Auth',
    'Axios js',
    'React Infinite Scroll',
    'React Skeleton',
    'Numeral js',
    'Moment js',
    'React icons',
    'React show more',
    'uuid js',
    'Material UI',
    'HTML5',
    'CSS3',
];

const CategoriesBar = () => {
    const { activeCategory, isMenuOpen, fetchVideosByCategory } =
        useContext(AppContext);

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
