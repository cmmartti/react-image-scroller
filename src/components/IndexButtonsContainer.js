import React from 'react';
import {css, cx} from 'emotion';

const base = css`
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 1em;
    /* left: 50%;
    transform: translateX(-50%); */
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
        <div className={cx('index-buttons-container', base)} {...innerProps}>
            {children}
        </div>
    );
};

export default IndexButtonsContainer;
