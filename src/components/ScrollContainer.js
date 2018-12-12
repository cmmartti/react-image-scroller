import React from 'react';
import {css, cx} from 'emotion';

// -webkit-overflow-scrolling: touch;

const base = css`
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    height: 100%;
    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const ScrollContainer = props => {
    const {innerRef, innerProps, children} = props;

    return (
        <div
            ref={innerRef}
            className={cx('scroll-container', base)}
            {...innerProps}
        >
            {children}
        </div>
    );
};

export default ScrollContainer;
