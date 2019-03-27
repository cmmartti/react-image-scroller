import React from 'react';
import {css, cx} from 'emotion';

const base = css`
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    height: 100%;
    -webkit-overflow-scrolling: touch;
`;
const hideScrollbarCSS = css`
    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const ScrollContainer = ({innerRef, innerProps, children, hideScrollbar}) => {
    return (
        <div
            ref={innerRef}
            className={cx('scroll-container', base, {
                [hideScrollbarCSS]: hideScrollbar,
            })}
            {...innerProps}
        >
            {children}
        </div>
    );
};

export default ScrollContainer;
