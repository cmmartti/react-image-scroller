import React from 'react';
import {css} from 'emotion';

const className = css`
    position: absolute;
    bottom: 0;
    padding: 1em;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    z-index: 3;
    pointer-events: none;
    width: 100%;
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
