import React, {useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import 'es6-symbol/implement';
import 'intersection-observer';
import smoothscroll from 'smoothscroll-polyfill';
import ImageScroller, {defaultStatus} from 'react-image-scroller';
import classNames from 'classnames';

import './styles.css';

smoothscroll.polyfill();

const images = [
    <img src="images/camel.jpg" alt="Camel" />,
    <img src="images/path.jpg" alt="A forest path" />,
    <img src="images/canada-geese.jpg" alt="Canada geese" />,
    <img src="images/bicycle-and-lake.jpg" alt="Bicycle" />,
    <img src="images/flower.jpg" alt="A pink flower" />,
    <img src="images/cliff-lookout.jpg" alt="Cliff lookout" />,
    <img src="images/moth.jpg" alt="A moth" />,
    <img src="images/snowman.jpg" alt="Snowman" />,
    <img src="images/barn-loft-silhouette.jpg" alt="Barn" />,
];

function PlainScroller() {
    const [showScrollbar, setShowScrollbar] = useState(true);
    const [scrollOnClick, setScrollOnClick] = useState(true);
    const [scrollWithArrows, setScrollWithArrows] = useState(true);
    const [scrollTo, setScrollTo] = useState(0);
    const [status, setStatus] = useState(defaultStatus);
    const ref = useRef(null);

    return (
        <div>
            <fieldset>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={showScrollbar}
                            onChange={event => {
                                setShowScrollbar(event.target.checked);
                            }}
                        />{' '}
                        Show scrollbar
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={scrollOnClick}
                            onChange={event => {
                                setScrollOnClick(event.target.checked);
                            }}
                        />{' '}
                        Scroll on click
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={scrollWithArrows}
                            onChange={event => {
                                setScrollWithArrows(event.target.checked);
                            }}
                        />{' '}
                        Scroll with arrow keys (when the gallery has the focus)
                    </label>
                </div>
            </fieldset>

            <div>
                <label>
                    Scroll to:{' '}
                    <input
                        type="number"
                        value={scrollTo}
                        max={images.length - 1}
                        min={0}
                        style={{width: '3em'}}
                        onChange={e => setScrollTo(e.target.value)}
                    />{' '}
                    <button onClick={() => ref.current.scrollTo(scrollTo)}>
                        Go
                    </button>
                </label>
            </div>

            <table>
                <caption>Status</caption>
                <tbody>
                    <tr>
                        <th>Previous</th>
                        <td>{status.previous + ''}</td>
                    </tr>
                    <tr>
                        <th>Current</th>
                        <td>[{status.current.join(', ') || ' '}]</td>
                    </tr>
                    <tr>
                        <th>Next</th>
                        <td>{status.next + ''}</td>
                    </tr>
                </tbody>
            </table>

            <div>
                <button
                    disabled={status.previous === null}
                    onClick={() => ref.current.previous()}
                >
                    ← Previous
                </button>
                <button
                    disabled={status.next === null}
                    onClick={() => ref.current.next()}
                >
                    Next →
                </button>
            </div>

            <ImageScroller
                ref={ref}
                hideScrollbar={!showScrollbar}
                scrollOnClick={scrollOnClick}
                scrollWithArrows={scrollWithArrows}
                onChange={newStatus => setStatus(newStatus)}
                items={images}
            />
        </div>
    );
}

function FancyScroller() {
    const [showScrollbar, setShowScrollbar] = useState(false);
    const [useThinScrollbar, setUseThinScrollbar] = useState(true);
    const [showIndexButtons, setShowIndexButtons] = useState(true);
    const [status, setStatus] = useState(defaultStatus);

    return (
        <div>
            <fieldset>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={showScrollbar}
                            onChange={event => {
                                setShowScrollbar(event.target.checked);
                            }}
                        />{' '}
                        Show scrollbar
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={useThinScrollbar}
                            onChange={event => {
                                setUseThinScrollbar(event.target.checked);
                            }}
                            disabled={!showScrollbar}
                        />{' '}
                        Use thin scrollbar (
                        <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width">
                            Firefox only
                        </a>
                        )
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={showIndexButtons}
                            onChange={event => {
                                setShowIndexButtons(event.target.checked);
                            }}
                        />{' '}
                        Show index buttons
                    </label>
                </div>
            </fieldset>

            <div className="image-gallery">
                <ImageScroller
                    className="scroller"
                    scrollContainerClassName={classNames({
                        'scroller__scroll-container--use-thin': useThinScrollbar,
                    })}
                    innerClassName="scroller__inner"
                    hideScrollbar={!showScrollbar}
                    onChange={newStatus => setStatus(newStatus)}
                    renderWithin={({
                        scrollTo,
                        next,
                        previous,
                        items,
                        status,
                    }) => (
                        <>
                            {status.previous !== null && (
                                <button
                                    onClick={previous}
                                    className="nav-button nav-button--previous"
                                    aria-label="Previous"
                                >
                                    &lsaquo;
                                </button>
                            )}
                            {status.next !== null && (
                                <button
                                    onClick={next}
                                    disabled={status.next === null}
                                    className="nav-button nav-button--next"
                                    aria-label="Next"
                                >
                                    &rsaquo;
                                </button>
                            )}

                            {showIndexButtons && (
                                <div className="index-buttons">
                                    {items.map((item, itemIndex) => (
                                        <button
                                            key={itemIndex}
                                            onClick={() => scrollTo(itemIndex)}
                                            title={itemIndex + 1}
                                            aria-label={`Image ${itemIndex +
                                                1} of ${images.length}`}
                                            className={classNames({
                                                'index-button': true,
                                                'index-button--current': status.current.includes(
                                                    itemIndex
                                                ),
                                                'index-button--adjacent':
                                                    status.previous ===
                                                        itemIndex ||
                                                    status.next === itemIndex,
                                            })}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                >
                    {images.map((item, itemIndex) => (
                        <div
                            key={itemIndex}
                            className={classNames({
                                'image-wrapper': true,
                                'image-wrapper--scrollbar': showScrollbar,
                            })}
                        >
                            {item}
                        </div>
                    ))}
                </ImageScroller>
            </div>
        </div>
    );
}

function App() {
    return (
        <>
            <h2>Plain</h2>
            <PlainScroller />

            <h2>Fancy</h2>
            <p>
                Custom elements are added inside the image scroller using the{' '}
                <code>renderWithin</code> prop, and the images themselves are
                directly styled with CSS.
            </p>
            <FancyScroller />
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));

/*
    <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/4u5kMk5pORM"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
    />,
*/
