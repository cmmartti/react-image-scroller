import React from 'react';
import {css, cx} from 'emotion';

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
    left: 0;
`;

const right = css`
    right: 0;
`;

const NavButton = props => {
    const {innerProps, isPrevious, isNext, isDisabled} = props;
    const title = isPrevious ? "Scroll Left" : "Scroll Right";

    return (
        <button
            disabled={isDisabled}
            className={cx({
                [base]: true,
                [left]: isPrevious,
                [right]: isNext,
                'nav-button': true,
                'nav-button--previous': isPrevious,
                'nav-button--next': isNext,
                'nav-button--disabled': isDisabled,
            })}
            title={title}
            aria-title={title}
            {...innerProps}
        >
            {isPrevious && '◄'}
            {isNext && '►'}
        </button>
    );
};

export default NavButton;
