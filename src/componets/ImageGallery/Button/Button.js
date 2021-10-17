import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css'

class Button extends Component {

    clickButton = this.props.buttonClick;

    render() { 
       return (
        <button type="button" className={s.loadMoreButton} onClick={this.clickButton}>Load more</button>      
        ) 
    };
};

Button.propTypes = {
    buttonClick: PropTypes.func
}

export default Button;
