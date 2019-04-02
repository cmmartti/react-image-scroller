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
                [css`
                    height: 28em;
                    position: relative;
                    box-sizing: border-box;
                    * {
                        box-sizing: inherit;
                    }
                `]: true,
                [className]: true,
            })}
            {...innerProps}
        >
            {children}
        </div>
    );
}

export function NavButtonsContainer({innerProps, children}) {
    return (
        <div
            className={cx({
                [css`
                    display: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                `]: true,
                'nav-buttons-container': true,
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
                    top: calc(50% - 1.25em);
                    position: absolute;

                    font-size: 1em;
                    padding: 0.75em 0.35em;
                    padding: 0;
                    line-height: 1;
                    border-radius: 0;
                    /* background: hsla(0, 0%, 50%, 0.75); */
                    /* background: none;
                    border: none; */
                    z-index: 2;
                    /* color: white; */
                    /* &:focus {
                        outline: 2px solid red;
                        &::-moz-focus-inner {
                            border: none;
                        }
                    } */
                    &[disabled] {
                        /* background: hsla(0, 0%, 50%, 0.5); */
                        color: #888;
                        /* display: none; */
                        opacity: 0.5;
                    }

                    > * {
                        height: 2em;
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
            {isPrevious && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M10 13h8V7h-8V2l-8 8 8 8v-5z" />
                </svg>
            )}
            {isNext && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M10 7H2v6h8v5l8-8-8-8v5z" />
                </svg>
            )}
        </button>
    );
}

export function IndexButtonsContainer({innerProps, children}) {
    return (
        <div
            className={cx({
                [css`
                    position: absolute;
                    bottom: 0.5em;
                    left: 0;

                    padding: 1em;
                    width: 100%;
                    pointer-events: none;
                    z-index: 3;

                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;

                    * {
                        pointer-events: auto;
                    }
                `]: true,
                'index-buttons-container': true,
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
                [css`
                    padding: 0.4em;
                    margin: 0.625em;
                    border-radius: 50%;
                    box-shadow: 1px 1px 2px hsla(0, 0%, 0%, 0.75);
                    &:focus {
                        outline: 1px dotted;
                        outline-offset: 0.25em;
                    }
                `]: true,
                [css`
                    background: hsl(0, 100%, 36%);
                `]: isCurrent,
                [css`
                    background: dimgray;
                    & + & {
                        background: hsl(0, 100%, 36%);
                    }
                `]: isNext || isPrevious,
                'index-button': true,
                'index-button--current': isCurrent,
                'index-button--next': isNext,
                'index-button--previous': isPrevious,
            })}
            title={index}
            {...innerProps}
        />
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
                [css`
                    display: flex;
                    overflow-x: scroll;
                    height: 100%;
                    /* overscroll-behavior: none; */
                    scrollbar-width: thin;
                `]: true,
                [css`
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                `]: hideScrollbar,
                'scroll-container': true,
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
                [css`
                    flex: 0 0 auto;
                    height: 100%;
                    max-width: 100%;
                    display: flex;
                    align-items: flex-start;
                    background: lightgray;
                    user-select: none;

                    /* & + & {
                        margin-left: -3em;
                    }

                    > * {
                        mask-image: linear-gradient(
                            to right,
                            rgba(0, 0, 0, 0) 0%,
                            rgba(0, 0, 0, 1) 1.5em,
                            rgba(0, 0, 0, 1) calc(100% - 1.5em),
                            rgba(0, 0, 0, 0) 100%
                        );
                    }
                    &:first-child > * {
                        mask-image: linear-gradient(
                            to right,
                            rgba(0, 0, 0, 1) calc(100% - 1.5em),
                            rgba(0, 0, 0, 0) 100%
                        );
                    }
                    &:last-child > * {
                        mask-image: linear-gradient(
                            to right,
                            rgba(0, 0, 0, 0) 0%,
                            rgba(0, 0, 0, 1) 1.5em
                        );
                    } */

                    > * {
                        flex: 0 1;
                        height: 100%;
                        width: auto;
                        max-width: 100%;
                        display: block;
                        object-fit: contain;
                    }
                `]: true,
                'image-wrapper': true,
                'image-wrapper--current': isCurrent,
                'image-wrapper--next': isNext,
                'image-wrapper--previous': isPrevious,
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
