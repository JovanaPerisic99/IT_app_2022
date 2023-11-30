import React from 'react';
import {Link} from 'react-router-dom';
import './Button.css';

const STYLES = ['btn--primary', 'btn--outline', 'btn--inverse'];
const SIZES = ['btn--small','btn--medium', 'btn--large'];

export const Button = ({pathTo,children, onClick, buttonStyle, buttonSize}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[1];

    if(!pathTo){
        return (
            <div className='btn-mobile' >
                <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick}>  
                    {children}
                </button>
            </div>
        );
    }
    return (
        <Link to={`${pathTo}`} className='btn-mobile' target="_top">
            <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick}>  
                {children}
            </button>
        </Link>
    )
};
