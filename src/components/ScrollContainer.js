import React from 'react';
import {css} from 'emotion';

// -webkit-overflow-scrolling: touch;

const className = css`
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
        <div ref={innerRef} className={className} {...innerProps}>
            {children}
        </div>
    );
};

export default ScrollContainer;
