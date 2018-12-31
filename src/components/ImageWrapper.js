import React from 'react';
import {css, cx} from 'emotion';

const base = css`
    flex: 0 0 auto;
    max-height: 100%;
    max-width: 100%;
    height: 100%;
    width: auto;
    position: relative;

    &:first-child {
        border-radius: 0.4em 0 0 0.4em;
    }
    &:last-child {
        border-radius: 0 0.4em 0.4em 0;
    }

    img {
        height: 100%;
        width: auto;
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
    }
`;

const nextOrPrevious = css`
    &:hover::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 2;
        background-color: hsla(0, 0%, 21%, 0.15);
        pointer-events: none;
    }
`;

const ImageWrapper = props => {
    const {innerProps, children, index, isCurrent, isNext, isPrevious} = props;

    return (
        <div
            className={cx({
                'image-wrapper': true,
                'image-wrapper--current': isCurrent,
                'image-wrapper--next': isNext,
                'image-wrapper--previous': isPrevious,
                [base]: true,
                [nextOrPrevious]: isNext || isPrevious,
            })}
            {...innerProps}
        >
            {children}
        </div>
    );
};

export default ImageWrapper;
