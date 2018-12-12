import React from 'react';
import {css, cx} from 'emotion';

const base = css`
    pointer-events: auto;
    border: none;
    color: white;
    background: hsla(0, 0%, 0%, 0.8);
    width: 1em;
    height: 1em;
    align-self: center;
    margin: 0.75em;
    border-radius: 50%;
    padding: 0em;
    font-family: serif;
    box-shadow: 0 0 2px hsla(0, 0%, 100%, 1);
`;

const current = css`
    background: black;
    min-width: 2em;
    min-height: 2em;
    margin: 0 0.25em;
`;

const nextOrPrevious = css`
    width: 1.4em;
    height: 1.4em;
    margin: 0 0.65em;

    & + &::after {
        content: '';
        display: block;
        height: 0.75em;
        width: 0.75em;
        transform: translateX(-1em);
        background: black;
        border-radius: 100%;
    }
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
            title={index}
            {...innerProps}
        >
            {isCurrent && index}
        </button>
    );
};

export default IndexButton;
