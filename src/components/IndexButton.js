import React from 'react';
import {css, cx} from 'emotion';

const base = css`
    pointer-events: auto;
    border: none;
    color: white;
    background: hsla(0, 0%, 21%, 0.6);
    margin: 0 0.5em;
`;

const current = css`
    background: black;
`;

const nextOrPrevious = css`
    background: #555;
`;

const IndexButton = props => {
    const {innerProps, index, isCurrent, isNext, isPrevious} = props;

    return (
        <button
            className={cx(
                base,
                {[current]: isCurrent},
                {[nextOrPrevious]: isNext || isPrevious}
            )}
            {...innerProps}
        >
            {index}
        </button>
    );
};

export default IndexButton;
