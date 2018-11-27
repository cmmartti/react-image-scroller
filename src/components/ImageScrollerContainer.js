import React from 'react';
import {css} from 'emotion';

const className = css`
    height: 25em;
    background: hsla(0, 0%, 50%, 0.2);
    border-radius: 0.4rem;

    max-height: 100vw;
    overflow-y: hidden;
    position: relative;
`;

const ImageScrollerContainer = props => {
    const {innerRef, innerProps, children} = props;

    return (
        <div ref={innerRef} {...innerProps} className={className}>
            {children}
        </div>
    );
};

export default ImageScrollerContainer;
