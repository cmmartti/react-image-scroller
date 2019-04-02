# React Image Scroller

A basic component for making scrolling galleries based on a horizontally scrolling container.

## Demo

Live demo at [cmmartti.github.io/react-image-scroller](https://cmmartti.github.io/react-image-scroller/).

## How is this any different than every other image gallery?

It doesn't try to reinvent the wheel. Rather than creating all of the functionality an image gallery needs from scratch, it builds on top of existing functionality that the browser already provides. Namely, it uses a horizontally scrolling container augmented with additional behaviour, which gives us a lot of free functionality that performs much better than a custom implementation ever could, such as native scrolling performance, scroll bars (if desired), automatic touch support, and scroll wheel support. The end product is one that is much more enjoyable to use, while most other JavaScript image galleries feel like heavy, opaque black boxes that are cumbersome to manipulate.

This component can also display multiple images side-by-side, and does not require all images to be the same size. This makes it work well for displaying odd-sized content like screenshots, or a mix of portait and landscape photographs.

Furthermore, React Image Scroller is bare bones. It does not try to include bells and whistles that can be trivially implemented if they are needed. It is simply a wrapper component that handles all the tricky calculations required for the augmented scrolling behaviour and exposes that functionality through a few instance methods (`next`, `previous`, and `scrollTo`). It also accepts a render prop called `renderWithin` that allows you (the developer) to draw whatever custom elements you need on top of the scrolling container, including next/previous arrows or index buttons.

## Browser Support

With polyfills (see below), React Image Scroller works reasonably well in all recent browsers, including Internet Explorer 11**.

** Except for the use of `object-fit: contain` on IE11, which prevents images from being stretched. Unless you plan on using this component at narrow widths with wide images on the desktop, this shouldn't be a problem.

## Installation

The easiest way to use React-Image-Scroller is to install it from NPM and include it in your own React build process. Don't forget to install any necessary polyfills (see below).

```
npm install react-image-scroller --save
```

You can also use the UMD build by including `dist/ImageScroller.js` in your page. If you use this, make sure you have already included a UMD React build.

## Polyfills

React Image Scroller uses the following browser features which are not yet available in all browsers. However, there are polyfills available that backfill the functionality:

- **[IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)** (required): Use [w3c/IntersectionObserver/polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill). Safari and Internet Explorer [do not support IntersectionObserver](https://caniuse.com/#feat=intersectionobserver).

- **Smooth scrolling** (optional): If you wish to support smooth scrolling for all browsers when navigating through the image scroller, you must include a polyfill for smooth scrolling behaviour, such as [iamdustan/smoothscroll](https://github.com/iamdustan/smoothscroll). Internet Explorer, Edge, and Safari [do not support smooth scrolling](https://caniuse.com/#feat=css-scroll-behavior).

## Usage

To use React-Image-Scroller, wrap it around a set of images or other elements. Like this:

```jsx
import ImageScroller from 'react-image-scroller';

<ImageScroller>
    <img src="1.jpg" alt="First" />
    <img src="2.jpg" alt="Second" />
    <img src="3.jpg" alt="Third" />
    <img src="4.jpg" alt="Fourth" />
    <img src="5.jpg" alt="Fifth" />
</ImageScroller>
```

## Props

- **`children`**/**`items`**: A list of elements to render. (default: `[]`)
- boolean **`hideScrollbar`**: Hide the horizontal scrollbar on the scroll container. (default: `true`)
- string **`innerClassName`**: A class name to set on the element that wraps the items. (default: `''`)
- object **`innerStyle`**: A style object to set on the element that wraps the items. (default: `{}`)
- (`status`: Status) => any **`onChange`**: A function to call whenever the status changes. Status is an object that contains the indices of items in each position:

  ```
  {
       previous: int | null;
       current: int[];
       next: int | null;
   }
  ```

- (`provided`) => ReactNode **`renderWithin`**: A function that returns a ReactNode that will be rendered inside a `div` that is absolutely positioned over the image scroller. This `div` fills the width of the image scroller, but is contained within the vertical bounds of the scrolling container, i.e., it does not overlap the scrollbar if it is present. `provided` is an object containing handy values and methods:

  ```
  {
       scrollTo: (itemIndex: int) => any;
       next: () => any;
       previous: () => any;
       items: ReactNode[];
       status: Status;
   }
  ```

- boolean **`scrollOnClick`**: Bring the item fully into view when it is clicked. (default: `true`)

- boolean **`scrollWithArrows`**: Scroll to the next/previous when the right/left arrow keys are pressed, if the image scroller contains the focus. (default: `true`)

- string **`scrollContainerClassName`**: A class name to set on the scroll container. (default: `''`)

- object **`scrollContainerStyle`**: A style object to set on the scroll container. (default: `{}`)

All other props will be passed on to the root `div`.

## Methods

You can manipulate the scroll position of the image scroller by calling these methods on the component's ref:

- **`scrollTo`**: (itemIndex: int) => any Scroll the scroll container so that the item of index `itemIndex` is positioned in the centre.
- **`next`**: () => any Scroll the scroll container to the next item, fitting in as many items in view as possible.
- **`previous`**: () => any Scroll the scroll container to the previous item, fitting in as many items in view as possible.

## Development

To run the examples locally, run:

```
npm install
npm start
```

Then open [localhost:8000](http://localhost:8000) in a browser.
