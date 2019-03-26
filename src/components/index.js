import IndexButton from './IndexButton';
import IndexButtonsContainer from './IndexButtonsContainer';
import ImageScrollerContainer from './ImageScrollerContainer';
import ImageWrapper from './ImageWrapper';
import NavButtonsContainer from './NavButtonsContainer';
import NavButton from './NavButton';
import ScrollContainer from './ScrollContainer';

const components = {
    IndexButton,
    IndexButtonsContainer,
    ImageWrapper,
    ImageScrollerContainer,
    NavButtonsContainer,
    NavButton,
    ScrollContainer,
};

export const defaultComponents = props => ({
    ...components,
    ...props.components,
});
