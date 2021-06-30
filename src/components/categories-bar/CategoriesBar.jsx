import React, { useContext } from 'react';
import styles from './CategoriesBar.module.css';
import { HomeContext } from '../../context/homeContext';
import { MenuContext } from '../../context/menuContext';

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
    const { activeCategory, fetchVideosByCategory } = useContext(HomeContext);
    const { isMenuOpen } = useContext(MenuContext);

    const handleOnClick = (category) => {
        fetchVideosByCategory(category);
    };

    return (
        <div
            className={
                isMenuOpen
                    ? styles.categories
                    : `${styles.categories} ${styles.closed}`
            }
        >
            {categories.map((category, index) => {
                return (
                    <span
                        onClick={() => handleOnClick(category)}
                        key={index}
                        style={
                            activeCategory === category
                                ? {
                                      backgroundColor: '#ffffff',
                                      color: '#000000',
                                  }
                                : null
                        }
                    >
                        {category}
                    </span>
                );
            })}
        </div>
    );
};

export default CategoriesBar;
