import React from 'react';
import {css} from 'emotion';

const className = css`
    position: absolute;
    bottom: 1em;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    z-index: 3;
    pointer-events: none;
`;

const IndexButtonsContainer = props => {
    const {innerProps, children} = props;

    return (
        <div className={className} {...innerProps}>
            {children}
        </div>
    );
};

export default IndexButtonsContainer;
