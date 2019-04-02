import React, {
    useRef,
    useState,
    useEffect,
    useLayoutEffect,
    useImperativeHandle,
} from 'react';
import './array-includes-polyfill';
import './array-from-polyfill';
import {css} from 'emotion';

const FULLY_VISIBLE = 'FULLY_VISIBLE';
const PARTIALLY_VISIBLE = 'PARTIALLY_VISIBLE';
const NOT_VISIBLE = 'NOT_VISIBLE';

export const defaultStatus = {
    previous: 0,
    current: [0],
    next: 0,
};

function getStatus(items) {
    let previous = null;
    const current = [];
    let next = null;

    let prevItem;
    items.forEach(item => {
        // There may be any number of FULLY_VISIBLE items.
        if (item.visibility === FULLY_VISIBLE) {
            current.push(item.index);
        }

        // There can only be two simultaneous PARTIALLY_VISIBLE items.
        // If they are adjacent, there can be no FULLY_VISIBLE items.
        // So these two items are 'previous' and 'next'.
        else if (
            item.visibility === PARTIALLY_VISIBLE &&
            prevItem &&
            prevItem.visibility === PARTIALLY_VISIBLE
        ) {
            previous = prevItem.index;
            next = item.index;
        }

        // Keep pushing 'previous' forward each iteration until one of
        // the above cases is true.
        else if (current.length === 0 && next === null) {
            previous = item.index;
        }

        // The item following the final FULLY_VISIBLE item is 'next'.
        else if (current.length > 0 && next === null) {
            next = item.index;
        }

        // Save this item to refer back to in the next iteration.
        prevItem = item;
    });

    return {previous, current, next};
}

export default React.forwardRef(Scroller);
function Scroller(
    {
        children,
        className = '',
        hideScrollbar = true,
        innerClassName = '',
        innerStyle = {},
        items,
        onChange = () => {},
        renderWithin = null,
        scrollOnClick = true,
        scrollWithArrows = true,
        scrollContainerClassName = '',
        scrollContainerStyle = {},
        ...props
    },
    ref
) {
    // Either `items` or `children` may be used to set scroll items (`items` has priority)
    items = items || React.Children.toArray(children);

    const mainRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const itemsContainerRef = useRef(null);

    // Track the indices of relevant items
    const [status, setStatus] = useState({
        previous: null,
        current: [],
        next: null,
    });

    useLayoutEffect(() => {
        const main = mainRef.current;
        const sc = scrollContainerRef.current;
        sc.style.overflowX = 'scroll';

        /* Manually hide the horizontal scrollbar with a hidden overflow.
           `scrollbar-width: none` is not available across-the-board at time of implementation.
        */
        if (hideScrollbar) {
            main.style.overflowY = 'hidden';
            const scrollbarWidth = main.clientHeight - sc.clientHeight;
            sc.style.height = `calc(100% + ${scrollbarWidth}px)`;
        } else {
            main.style.overflowY = '';
            sc.style.height = '100%';
        }

        /* Manually limit the height of the contents of each item wrapper. There is no
           reliable CSS solution due to some weird shenanigans with the intrinsic
           height of images, or something – I'm not quite sure. I could not find a way
           to reliably limit the width of the item wrapper to its contents
           (aka shrinkwrap). Edge/IE semi-randomly set the wrapper width to the pixel
           width of the containing img instead of following the intrinsic ratio of its
           height, and Firefox/Chrome introduced a phantom padding-right when toggling
           the scrollbar (caused by extra width).
        */
        [...itemsContainerRef.current.children].forEach(item => {
            item.style.height = `${sc.clientHeight}px`;
        });

        /* Make sure renderWithin doesn't overlap the scrollContainer's scrollbar.
           `renderWithin` is absolutely positioned, so the padding and scrollbar of the
           parent element are ignored.
        */
        [...sc.children].forEach(element => {
            element.style.maxHeight = `${sc.clientHeight}px`;
        });
    }, [hideScrollbar]);

    useEffect(() => {
        // IntersectionObservers only report what's _changed_, so keep a list
        const intersectionRatios = new Map();
        const observer = new IntersectionObserver(observerCallback, {
            root: scrollContainerRef.current,
            threshold: [0, 0.98],
        });
        [...itemsContainerRef.current.children].forEach(item => {
            observer.observe(item);
        });

        function observerCallback(entries) {
            // Update the current intersectionRatio of each entry
            entries.forEach(entry => {
                intersectionRatios.set(
                    parseInt(entry.target.getAttribute('data-item-id'), 10),
                    entry.intersectionRatio
                );
            });

            // Update the status
            const items = [...itemsContainerRef.current.children];
            const visibilityList = items.map(item => {
                let itemIndex = item.getAttribute('data-item-id');
                itemIndex = parseInt(itemIndex, 10);
                const ratio = intersectionRatios.get(itemIndex);
                let visibility;
                if (ratio > 0.98) {
                    visibility = FULLY_VISIBLE;
                } else if (ratio === 0) {
                    visibility = NOT_VISIBLE;
                } else visibility = PARTIALLY_VISIBLE;
                return {
                    index: itemIndex,
                    visibility,
                };
            });
            const newStatus = getStatus(visibilityList);
            setStatus(newStatus);
            onChange(newStatus);
        }
    }, []);

    useEffect(() => {
        function handleKeyPress(event) {
            if (scrollWithArrows && mainRef.current.contains(event.target)) {
                if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    next();
                } else if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    previous();
                }
            }
        }
        window.addEventListener('keydown', handleKeyPress);
        return function cleanUp() {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [next, previous]);

    function next() {
        scrollTo(status.next, 'nearest');
    }
    function previous() {
        scrollTo(status.previous, 'nearest');
    }

    function scrollTo(itemIndex, position = 'center') {
        if (itemIndex === undefined || itemIndex === null || itemIndex < 0) {
            return;
        }

        itemIndex = Math.min(itemIndex, items.length - 1);

        const mainWidth = mainRef.current.offsetWidth;
        const element = itemsContainerRef.current.children[itemIndex];
        if (!element) return;

        // Option A: Center the item
        if (position === 'center') {
            const margin = (mainWidth - element.offsetWidth) / 2;
            scrollContainerRef.current.scrollTo({
                top: 0,
                left: element.offsetLeft - margin, // parent element must be positioned
                behavior: 'smooth',
            });
        }

        // Option B: Fit in as many itemss as possible
        else if (position === 'nearest') {
            // Determine the direction to look first
            let step;
            if (status.current.length > 0) {
                step = itemIndex > status.current[0] ? -1 : 1;
            } else {
                step = itemIndex > status.previous ? -1 : 1;
            }

            // Look back and ahead to see if any other items will fit too
            const backWidth = fit(element.offsetWidth, step);
            const aheadWidth = fit(element.offsetWidth + backWidth, -step);

            const width = element.offsetWidth + backWidth + aheadWidth;
            const margin = (mainWidth - width) / 2;

            scrollContainerRef.current.scrollTo({
                top: 0,
                left:
                    element.offsetLeft -
                    (step === 1 ? aheadWidth : backWidth) -
                    margin,
                behavior: 'smooth',
            });
            if (element.offsetLeft === 0) {
                mainRef.current.focus();
            }

            function fit(initialWidth, step) {
                let width = 0;
                while (true) {
                    const adjacentElement =
                        itemsContainerRef.current.children[itemIndex + step];
                    if (!adjacentElement) break;

                    const adjacentWidth = adjacentElement.offsetWidth;
                    if (initialWidth + width + adjacentWidth < mainWidth) {
                        width += adjacentWidth;
                    } else {
                        break;
                    }
                    step += step;
                }
                return width;
            }
        }
    }

    useImperativeHandle(ref, () => ({next, previous, scrollTo}), [
        next,
        previous,
        scrollTo,
    ]);

    return (
        <div
            ref={mainRef}
            tabIndex={0}
            {...props}
            className={
                className +
                ' ' +
                css`
                    height: 28em;
                `
            }
        >
            <div
                ref={scrollContainerRef}
                style={scrollContainerStyle}
                className={scrollContainerClassName}
                style={{
                    height: '100%',
                    overflowX: 'scroll',
                }}
            >
                {renderWithin && (
                    <div
                        className={css`
                            position: absolute;
                            height: 100%;
                            left: 0;
                            right: 0;
                            pointer-events: none;
                            z-index: 20;
                            * {
                                pointer-events: auto;
                            }
                        `}
                    >
                        {renderWithin({
                            scrollTo,
                            next,
                            previous,
                            items,
                            status,
                        })}
                    </div>
                )}

                <div
                    ref={itemsContainerRef}
                    className={innerClassName}
                    style={{
                        display: 'flex',
                        height: '100%',
                        position: 'relative', // for measuring offset of child items
                    }}
                >
                    {items.map((item, itemIndex) =>
                        React.cloneElement(item, {
                            'data-item-id': itemIndex,
                            key: itemIndex,
                            onClick: event => {
                                if (scrollOnClick) {
                                    event.preventDefault();
                                    if (status.current.includes(itemIndex)) {
                                        scrollTo(itemIndex, 'centre');
                                    } else {
                                        scrollTo(itemIndex, 'nearest');
                                    }
                                }
                            },

                            className:
                                css`
                                    flex: 0 0 auto;
                                    height: 100%;
                                    width: auto;
                                    max-width: 100%;
                                    object-fit: contain;
                                    overflow-y: auto;
                                    display: block;
                                    user-select: none;

                                    * {
                                        /* height: 100%; */
                                        /* width: auto; */
                                        max-width: 100%;
                                        object-fit: contain;
                                    }
                                ` +
                                ' ' +
                                (item.props.className || ''),
                        })
                    )}

                    {/* {items.map((item, itemIndex) => (
                        <div
                            data-item-id={itemIndex}
                            style={{
                                flex: '0 0 auto',
                                height: '100%',
                                maxWidth: '100%',
                                dislay: 'inline-block',
                                userSelect: 'none',
                                overflowY: 'auto',
                            }}
                            key={itemIndex}
                            onClick={event => {
                                event.preventDefault();
                                if (status.current.includes(itemIndex)) {
                                    scrollTo(itemIndex, 'centre');
                                } else {
                                    scrollTo(itemIndex, 'nearest');
                                }
                            }}
                        >
                            {React.cloneElement(item, {
                                style: {
                                    maxWidth: '100%',
                                    objectFit: 'contain',
                                    ...(item.props.style || {}),
                                    height: '100%',
                                    width: 'auto',
                                    display: 'block',
                                },
                            })}
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    );
}
