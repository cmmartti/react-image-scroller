import React from 'react';
import {css, cx} from 'emotion';

const base = css`
    height: 25em;
    background: hsla(0, 0%, 50%, 0.2);
    border-radius: 0.4rem;

    max-height: 100vw;
    overflow-y: hidden;
    position: relative;
`;

const ImageScrollerContainer = props => {
    const {innerRef, className, innerProps, children} = props;

    return (
        <div ref={innerRef} className={cx(className, base)} {...innerProps}>
            {children}
        </div>
    );
};

export default ImageScrollerContainer;
