import React from 'react';
import {css} from 'emotion';

const base = css`
    background: hsla(0, 0%, 21%, 0.6);
    color: white;
    height: 4em;
    top: calc(50% - 2em);
    position: absolute;
    border: none;
    z-index: 2;

    &[disabled] {
        background: hsla(0, 0%, 21%, 0.3);
    }
`;

const left = css`
    ${base}
    left: 0;
`;

const right = css`
    ${base}
    right: 0;
`;

const NavButton = props => {
    const {innerProps, isPrevious, isNext, isDisabled} = props;

    return (
        <button
            disabled={isDisabled}
            className={isPrevious ? left : right}
            {...innerProps}
        >
            {isPrevious && '←'}
            {isNext && '→'}
        </button>
    );
};

export default NavButton;
