# React Image Scroller

A simple scrolling image gallery for React. Unlike every other image gallery, this one is designed to show multiple images at once, without cropping them. It is not designed to be a cinematic experience, but rather an alternative to splashing a bunch of images on screen directly. Great for screenshots and other odd-shaped content.

When used with server-side rendering and a client does not have JavaScript, React-Image-Scroller will fall back to a simple horizontally-scrolling container with a scrollbar. Otherwise, the scrollbar is automatically hidden and the scrolling container is augmented with additional behaviour, such as next/previous buttons, scroll snapping, and index buttons.

## Demo

Live demo at [cmmartti.github.io/react-image-scroller](https://cmmartti.github.io/react-image-scroller/).

To run the examples locally, run:

```
npm install
npm start
```

Then open [localhost:8000](localhost:8000) in a browser.

## Installation

The easiest way to use React-Image-Scroller is to install it from NPM and include it in your own React build process. Don't forget to install any necessary polyfills (see below).

```
npm install react-image-scroller --save
```

You can also use the UMD build by including `dist/ImageScroller.js` in your page. If you use this, make sure you have already included a UMD React build.

### Polyfills

If you are targeting browsers that don't support [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver), you must include a polyfill, such as [w3c/IntersectionObserver/polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill).

If you wish to support smooth scrolling for all browsers when navigating through the ImageScroller using the buttons or the keyboard, you must include a polyfill for smooth scrolling behaviour, such as [iamdustan/smoothscroll](https://github.com/iamdustan/smoothscroll).

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

## Customisation and Configuration

React-Image-Scroller has no configuration. However, the default base components can easily be replaced with your own, allowing you to change how they look and work. A complete example is shown at the end of this section.

A React-Image-Scroller component has the following _internal_ structure. The props shown are passed to each component, in addition to `innerProps` (see below).

```jsx
<ImageScrollerContainer innerRef>
    <NavButton isPrevious />

    <IndexButtonsContainer>
        <IndexButton index="1" image />
        <IndexButton index="2" image isPrevious />
        <IndexButton index="3" image isCurrent />
        <IndexButton index="4" image isCurrent />
        <IndexButton index="5" image isNext />
    </IndexButtonsContainer>

    <ScrollContainer innerRef>
        <ImageWrapper index="1">
            <img src="1.jpg" alt="First" />
        </ImageWrapper>
        <ImageWrapper index="2" isPrevious>
            <img src="2.jpg" alt="Second" />
        </ImageWrapper>
        <ImageWrapper index="3" isCurrent>
            <img src="3.jpg" alt="Third" />
        </ImageWrapper>
        <ImageWrapper index="4" isCurrent>
            <img src="4.jpg" alt="Fourth" />
        </ImageWrapper>
        <ImageWrapper index="5" isNext>
            <img src="5.jpg" alt="Fifth" />
        </ImageWrapper>
    </ScrollContainer>

    <NavButton isNext />
</ImageScrollerContainer>
```

Each component can be switched-out with your own by passing it into the `components` prop object, which will be merged with the default components:

```jsx
<ImageScroller components={{IndexButton: CustomIndexButton}}>
    {...images}
</ImageScroller>
```

This approach was inspired by [React-Select](https://react-select.com/components).

### Inner Props and Inner Ref

In addition to the props above, each component takes an `innerProps` prop that contains the functional properties that the component needs. `innerProps` must be spread onto the custom element.

Some components also take an `innerRef` prop that React-Image-Scroller needs in order to manage internal behaviour. This must be assigned to the `ref` property of the relevant element:

```jsx
<div ref={innerRef} {...innerProps} />
```

### Complete Example

```jsx
import ImageScroller from 'react-image-scroller';

const CustomIndexButton = props => {
    const {
        innerProps,
        index,
        image,
        isCurrent,
        isNext,
        isPrevious
    } = props;

    var symbol;
    if (isCurrent) symbol = index;
    else if (isPrevious) symbol = '◀';
    else if (isNext) symbol = '▶'
    else symbol = '◦';

    return (
        <button {...innerProps}>{symbol}</button>
    )
}

<ImageScroller components={{IndexButton: CustomIndexButton}}>
    {...images}
</ImageScroller>
```
