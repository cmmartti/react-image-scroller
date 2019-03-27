import React, {useRef, useState, useEffect} from 'react';

import defaultComponents from './components';

const FULLY_VISIBLE = 'FULLY_VISIBLE';
const PARTIALLY_VISIBLE = 'PARTIALLY_VISIBLE';
const NOT_VISIBLE = 'NOT_VISIBLE';

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

export default function ImageScroller({children, components = {}, ...props}) {
    const mainRef = useRef(null);
    const scrollContainerRef = useRef(null);

    // Track the indices of relevant images
    const [status, setStatus] = useState({
        previous: null,
        current: [],
        next: null,
    });

    useEffect(() => {
        let hideScrollbarCounter = 0;
        function hideScrollbar() {
            const scrollContainer = scrollContainerRef.current;
            const main = mainRef.current;

            if (scrollContainer && main) {
                const offset = main.clientHeight - scrollContainer.clientHeight;

                // Initial offset may be 0 in some browsers, so try more than once
                hideScrollbarCounter += 1;
                if (offset === 0 && hideScrollbarCounter <= 3) {
                    setTimeout(hideScrollbar, 10);
                } else {
                    scrollContainer.style.height = `calc(100% + ${offset}px)`;
                }
            }
        }

        hideScrollbar();
    }, []);

    useEffect(() => {
        // IntersectionObservers only report what's _changed_, so keep a list
        const intersectionRatios = new Map();
        const observer = new IntersectionObserver(observerCallback, {
            root: scrollContainerRef.current,
            threshold: [0, 0.98],
        });
        Array.from(scrollContainerRef.current.children).forEach(image => {
            observer.observe(image);
        });

        function observerCallback(entries) {
            // Update the current intersectionRatio of each entry
            for (const entry of entries) {
                intersectionRatios.set(
                    parseInt(entry.target.getAttribute('data-image-id'), 10),
                    entry.intersectionRatio
                );
            }

            // Update the status
            const items = Array.from(scrollContainerRef.current.children);
            const visibilityList = items.map(item => {
                let imageIndex = item.getAttribute('data-image-id');
                imageIndex = parseInt(imageIndex, 10);
                const ratio = intersectionRatios.get(imageIndex);
                let visibility;
                if (ratio > 0.98) {
                    visibility = FULLY_VISIBLE;
                } else if (ratio === 0) {
                    visibility = NOT_VISIBLE;
                } else visibility = PARTIALLY_VISIBLE;
                return {
                    index: imageIndex,
                    visibility,
                };
            });
            setStatus(getStatus(visibilityList));
        }
    }, []);

    useEffect(() => {
        function handleKeyPress(event) {
            if (mainRef.current.contains(event.target)) {
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
    });

    function next() {
        scrollTo(status.next, {position: 'nearest'});
    }
    function previous() {
        scrollTo(status.previous, {position: 'nearest'});
    }
    function scrollTo(imageIndex, options = {}) {
        if (imageIndex === undefined || imageIndex === null) {
            return;
        }

        const scrollContainer = scrollContainerRef.current;
        const main = mainRef.current;
        const element = scrollContainer.children[imageIndex];

        const {position = 'center'} = options;

        // Option A: Center the image
        if (position === 'center') {
            const margin = (main.offsetWidth - element.offsetWidth) / 2;
            scrollContainer.scrollTo({
                top: 0,
                left: element.offsetLeft - margin,
                behavior: 'smooth',
            });
        }

        // Option B: Fit in as many images as possible
        else if (position === 'nearest') {
            // Determine the direction to look first
            let step;
            if (status.current.length > 0) {
                step = imageIndex > status.current[0] ? -1 : 1;
            } else {
                step = imageIndex > status.previous ? -1 : 1;
            }

            // Look back and ahead to see if any other images will fit too
            const backWidth = fit(element.offsetWidth, step);
            const aheadWidth = fit(element.offsetWidth + backWidth, -step);

            const width = element.offsetWidth + backWidth + aheadWidth;
            const margin = (main.offsetWidth - width) / 2;
            scrollContainer.scrollTo({
                top: 0,
                left:
                    element.offsetLeft -
                    (step === 1 ? aheadWidth : backWidth) -
                    margin,
                behavior: 'smooth',
            });

            function fit(initialWidth, step) {
                let width = 0;
                while (true) {
                    const adjacentElement =
                        scrollContainer.children[imageIndex + step];
                    if (!adjacentElement) break;

                    const adjacentWidth = adjacentElement.offsetWidth;
                    if (
                        initialWidth + width + adjacentWidth <
                        main.offsetWidth
                    ) {
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

    // Merge custom components with default components
    const {
        IndexButton,
        IndexButtonsContainer,
        ImageWrapper,
        ImageScrollerContainer,
        NavButtonsContainer,
        NavButton,
        ScrollContainer,
    } = {
        ...defaultComponents,
        ...components,
    };

    const images = React.Children.toArray(children);
    return (
        <ImageScrollerContainer
            innerRef={mainRef}
            innerProps={{
                tabIndex: 0,
            }}
            {...props}
        >
            <NavButtonsContainer>
                <NavButton
                    isPrevious
                    isDisabled={status.previous === null}
                    innerProps={{
                        onClick: previous,
                    }}
                />
                <NavButton
                    isNext
                    isDisabled={status.next === null}
                    innerProps={{
                        onClick: next,
                    }}
                />
            </NavButtonsContainer>

            <IndexButtonsContainer className="index-buttons-container">
                {images.map((image, imageIndex) => (
                    <IndexButton
                        key={imageIndex}
                        index={imageIndex + 1}
                        image={image}
                        isCurrent={status.current.includes(imageIndex)}
                        isNext={status.next === imageIndex}
                        isPrevious={status.previous === imageIndex}
                        innerProps={{
                            onClick: () => scrollTo(imageIndex),
                        }}
                    />
                ))}
            </IndexButtonsContainer>

            <ScrollContainer
                innerRef={scrollContainerRef}
                className="scroll-container"
            >
                {images.map((image, imageIndex) => (
                    <ImageWrapper
                        key={imageIndex}
                        index={imageIndex + 1}
                        isCurrent={status.current.includes(imageIndex)}
                        isNext={status.next === imageIndex}
                        isPrevious={status.previous === imageIndex}
                        innerProps={{
                            'data-image-id': imageIndex,
                            onClick: event => {
                                event.preventDefault();
                                if (status.current.includes(imageIndex)) {
                                    scrollTo(imageIndex, {position: 'centre'});
                                } else {
                                    scrollTo(imageIndex, {position: 'nearest'});
                                }
                            },
                        }}
                    >
                        {image}
                    </ImageWrapper>
                ))}
            </ScrollContainer>
        </ImageScrollerContainer>
    );
}
