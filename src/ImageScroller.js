import React from 'react';
import {cx} from 'emotion';

import {defaultComponents} from './components/index';

export default class ImageScroller extends React.Component {
    static defaultProps = {
        components: {},
    };
    state = {
        previous: null,
        current: [],
        next: null,
    };
    mainRef = React.createRef();
    scrollContainerRef = React.createRef();

    // ----------------------
    // Lifecycle

    constructor(props) {
        super(props);
        this.cacheComponents(props.components);
    }

    componentDidMount() {
        this.hideScrollbar();
        this.createIntersectionObserver();
        window.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress);
    }

    cacheComponents = components => {
        this.components = defaultComponents({components});
    };

    handleKeyPress = event => {
        if (this.mainRef.current.contains(event.target)) {
            switch (event.key) {
                // case 'ArrowDown':
                case 'ArrowRight':
                    event.preventDefault();
                    this.next();
                    break;
                // case 'ArrowUp':
                case 'ArrowLeft':
                    event.preventDefault();
                    this.previous();
                    break;
                default:
                    break;
            }
        }
    };

    hideScrollbarCounter = 0;
    hideScrollbar = () => {
        const scrollContainer = this.scrollContainerRef.current;
        const main = this.mainRef.current;

        if (scrollContainer && main) {
            const offset = main.clientHeight - scrollContainer.clientHeight;

            // Initial offset may be 0, so try up to three times, 10 ms apart
            this.hideScrollbarCounter += 1;
            if (offset === 0 && this.hideScrollbarCounter <= 3) {
                setTimeout(this.hideScrollbar, 10);
            } else {
                scrollContainer.style.height = `calc(100% + ${offset}px)`;
            }
        }
    };

    createIntersectionObserver = () => {
        // IntersectionObservers only report what's _changed_, so keep a list
        this.intersectionRatios = new Map();
        const observer = new IntersectionObserver(this.observerCallback, {
            root: this.scrollContainerRef.current,
            threshold: [0, 0.98],
        });
        Array.from(this.scrollContainerRef.current.children).forEach(image => {
            observer.observe(image);
        });
    };
    observerCallback = entries => {
        entries.forEach(entry => {
            this.intersectionRatios.set(
                parseInt(entry.target.getAttribute('data-image-id'), 10),
                entry.intersectionRatio
            );
        });

        function getSummary(items) {
            let previous = null;
            const current = [];
            let next = null;

            let prevItem;
            items.forEach(item => {
                // There may be any number of FULLY_VISIBLE items.
                if (item.status === 'FULLY_VISIBLE') {
                    current.push(item.index);
                }

                // There can only be two simultaneous PARTIALLY_VISIBLE items.
                // If they are adjacent, there can be no FULLY_VISIBLE items.
                // So these two items are 'previous' and 'next'.
                else if (
                    item.status === 'PARTIALLY_VISIBLE' &&
                    prevItem &&
                    prevItem.status === 'PARTIALLY_VISIBLE'
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

        const items = Array.from(this.scrollContainerRef.current.children);
        const statusList = items.map(item => {
            let imageIndex = item.getAttribute('data-image-id');
            imageIndex = parseInt(imageIndex, 10);
            const ratio = this.intersectionRatios.get(imageIndex);
            let status;
            if (ratio > 0.98) {
                status = 'FULLY_VISIBLE';
            } else if (ratio === 0) {
                status = 'NOT_VISIBLE';
            } else status = 'PARTIALLY_VISIBLE';
            return {
                index: imageIndex,
                status: status,
            };
        });

        this.setState(getSummary(statusList));
    };

    scrollTo = (imageIndex, options = {}) => {
        if (imageIndex === undefined || imageIndex === null) {
            return;
        }
        const {position = 'centre'} = options;

        const scrollContainer = this.scrollContainerRef.current;
        const main = this.mainRef.current;
        const element = scrollContainer.children[imageIndex];

        // Always centre the image
        if (position === 'centre') {
            const margin = (main.offsetWidth - element.offsetWidth) / 2;
            scrollContainer.scrollTo({
                top: 0,
                left: element.offsetLeft - margin,
                behavior: 'smooth',
            });
        }

        // Fit in as many images as possible
        else if (position === 'nearest') {
            function fit(initialWidth, step) {
                let width = 0;
                while (true) {
                    const adjacentElement =
                        scrollContainer.children[imageIndex + step];
                    let adjacentWidth;
                    if (adjacentElement) {
                        adjacentWidth = adjacentElement.offsetWidth;
                    } else {
                        break;
                    }
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

            let step;
            if (this.state.current.length > 0) {
                step = imageIndex > this.state.current[0] ? -1 : 1;
            } else {
                step = imageIndex > this.state.previous ? -1 : 1;
            }

            // Look back and ahead to see if any other images will fit too
            const backWidth = fit(element.offsetWidth, step);
            const aheadWidth = fit(element.offsetWidth + backWidth, -step);

            let leftWidth;
            if (step === 1) {
                leftWidth = aheadWidth;
            } else {
                leftWidth = backWidth;
            }

            const width = element.offsetWidth + backWidth + aheadWidth;
            const margin = (main.offsetWidth - width) / 2;
            scrollContainer.scrollTo({
                top: 0,
                left: element.offsetLeft - leftWidth - margin,
                behavior: 'smooth',
            });
        }
    };
    next = () => {
        this.scrollTo(this.state.next, {position: 'nearest'});
    };
    previous = () => {
        this.scrollTo(this.state.previous, {position: 'nearest'});
    };
    onClick = imageIndex => {
        return event => {
            event.preventDefault();
            if (this.state.current.includes(imageIndex)) {
                this.scrollTo(imageIndex, {position: 'centre'});
            } else {
                this.scrollTo(imageIndex, {position: 'nearest'});
            }
        };
    };

    render() {
        const {previous, current, next} = this.state;
        const images = React.Children.toArray(this.props.children);

        const {
            IndexButton,
            IndexButtonsContainer,
            ImageWrapper,
            ImageScrollerContainer,
            NavButtonsContainer,
            NavButton,
            ScrollContainer,
        } = this.components;

        return (
            <ImageScrollerContainer
                innerRef={this.mainRef}
                innerProps={{
                    tabIndex: 0,
                }}
                className={this.props.className}
            >
                <NavButtonsContainer>
                    <NavButton
                        isPrevious
                        isDisabled={previous === null}
                        innerProps={{
                            onClick: this.previous,
                        }}
                    />
                    <NavButton
                        isNext
                        isDisabled={next === null}
                        innerProps={{
                            onClick: this.next,
                        }}
                    />
                </NavButtonsContainer>

                <IndexButtonsContainer className="index-buttons-container">
                    {images.map((image, imageIndex) => (
                        <IndexButton
                            key={imageIndex}
                            index={imageIndex + 1}
                            image={image}
                            isCurrent={current.includes(imageIndex)}
                            isNext={next === imageIndex}
                            isPrevious={previous === imageIndex}
                            innerProps={{
                                onClick: () => this.scrollTo(imageIndex),
                            }}
                        />
                    ))}
                </IndexButtonsContainer>

                <ScrollContainer
                    innerRef={this.scrollContainerRef}
                    className="scroll-container"
                >
                    {images.map((image, imageIndex) => (
                        <ImageWrapper
                            key={imageIndex}
                            index={imageIndex + 1}
                            isCurrent={current.includes(imageIndex)}
                            isNext={next === imageIndex}
                            isPrevious={previous === imageIndex}
                            innerProps={{
                                'data-image-id': imageIndex,
                                onClick: this.onClick(imageIndex),
                            }}
                        >
                            {image}
                        </ImageWrapper>
                    ))}
                </ScrollContainer>
            </ImageScrollerContainer>
        );
    }
}
