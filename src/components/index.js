import IndexButton from './IndexButton';
import IndexButtonsContainer from './IndexButtonsContainer';
import ImageScrollerContainer from './ImageScrollerContainer';
import ImageWrapper from './ImageWrapper';
import NavButton from './NavButton';
import ScrollContainer from './ScrollContainer';

const components = {
    IndexButton,
    IndexButtonsContainer,
    ImageWrapper,
    ImageScrollerContainer,
    NavButton,
    ScrollContainer,
};

export const defaultComponents = props => ({
    ...components,
    ...props.components,
});
