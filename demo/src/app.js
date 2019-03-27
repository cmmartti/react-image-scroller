import React from 'react';
import ReactDOM from 'react-dom';
import smoothscroll from 'smoothscroll-polyfill';
import 'intersection-observer';
import 'es6-symbol/implement';
import ImageScroller from 'react-image-scroller';

smoothscroll.polyfill();

function App() {
    return (
        <ImageScroller>
            <img src="images/camel.jpg" alt="Camel" />
            <img src="images/path.jpg" alt="A forest path" />
            <img src="images/canada-geese.jpg" alt="Canada geese" />
            <img src="images/bicycle-and-lake.jpg" alt="Bicycle" />
            <img src="images/flower.jpg" alt="A pink flower" />
            <img src="images/cliff-lookout.jpg" alt="Cliff lookout" />
            <img src="images/moth.jpg" alt="A moth" />
            <img src="images/snowman.jpg" alt="Snowman" />
            <img src="images/barn-loft-silhouette.jpg" alt="Barn" />
        </ImageScroller>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));
