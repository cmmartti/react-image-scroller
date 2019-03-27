import React from 'react';
import {css, cx} from 'emotion';

export function ImageScrollerContainer({
    innerRef,
    className,
    innerProps,
    children,
}) {
    return (
        <div
            ref={innerRef}
            className={cx({
                [className]: true,
                [css`
                    height: 25em;
                    background: hsla(0, 0%, 50%, 0.2);
                    border-radius: 0.4rem;

                    max-height: 100vw;
                    overflow-y: hidden;
                    position: relative;
                `]: true,
            })}
            {...innerProps}
        >
            {children}
        </div>
    );
}

export function ImageWrapper({
    innerProps,
    children,
    index,
    isCurrent,
    isNext,
    isPrevious,
}) {
    return (
        <div
            className={cx({
                'image-wrapper': true,
                'image-wrapper--current': isCurrent,
                'image-wrapper--next': isNext,
                'image-wrapper--previous': isPrevious,
                [css`
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
                `]: true,
                [css`
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
                `]: isNext || isPrevious,
            })}
            {...innerProps}
        >
            {children}
        </div>
    );
}

export function IndexButton({
    innerProps,
    index,
    isCurrent,
    isNext,
    isPrevious,
}) {
    return (
        <button
            className={cx({
                'index-button': true,
                'index-button--current': isCurrent,
                'index-button--next': isNext,
                'index-button--previous': isPrevious,
                [css`
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
                `]: true,
                [css`
                    background: black;
                    min-width: 2em;
                    min-height: 2em;
                    margin: 0 0.25em;
                `]: isCurrent,
                [css`
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
                `]: isNext || isPrevious,
            })}
            title={index}
            {...innerProps}
        >
            {isCurrent && index}
        </button>
    );
}

export function IndexButtonsContainer({innerProps, children}) {
    return (
        <div
            className={cx({
                'index-buttons-container': true,
                [css`
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
                `]: true,
            })}
            {...innerProps}
        >
            {children}
        </div>
    );
}

export function NavButton({innerProps, isPrevious, isNext, isDisabled}) {
    const title = isPrevious ? 'Previous' : 'Next';
    return (
        <button
            disabled={isDisabled}
            className={cx({
                [css`
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
                `]: true,
                [css`
                    left: 0;
                `]: isPrevious,
                [css`
                    right: 0;
                `]: isNext,
                'nav-button': true,
                'nav-button--previous': isPrevious,
                'nav-button--next': isNext,
                'nav-button--disabled': isDisabled,
            })}
            title={title}
            aria-label={title}
            {...innerProps}
        >
            {isPrevious && '◄'}
            {isNext && '►'}
        </button>
    );
}

export function NavButtonsContainer({innerProps, children}) {
    return (
        <div
            className={cx({
                'nav-buttons-container': true,
                [css`
                    display: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                `]: true,
            })}
            {...innerProps}
        >
            {children}
        </div>
    );
}

export function ScrollContainer({
    innerRef,
    innerProps,
    children,
    hideScrollbar,
}) {
    return (
        <div
            ref={innerRef}
            className={cx({
                'scroll-container': true,
                [css`
                    display: flex;
                    overflow-x: scroll;
                    overflow-y: hidden;
                    height: 100%;
                    -webkit-overflow-scrolling: touch;
                `]: true,
                [css`
                    ::-webkit-scrollbar {
                        display: none;
                    }
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                `]: hideScrollbar,
            })}
            {...innerProps}
        >
            {children}
        </div>
    );
}

export default {
    IndexButton,
    IndexButtonsContainer,
    ImageWrapper,
    ImageScrollerContainer,
    NavButtonsContainer,
    NavButton,
    ScrollContainer,
};
