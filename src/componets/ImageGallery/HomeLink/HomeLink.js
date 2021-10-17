import React from 'react';
import PropTypes from 'prop-types';
import s from './HomeLink.module.css';
import { ImHome } from 'react-icons/im';

const HomeLink = ({ arr }) => {
    const { pageURL } = arr;
    return (
        <a href={pageURL} className={s.homePageUrl} target="_blank" rel="noreferrer">
            <ImHome className={s.homeIcon}/>
        </a>
    );
};

HomeLink.propTypes = {
    pageURL: PropTypes.string
};

export default HomeLink;