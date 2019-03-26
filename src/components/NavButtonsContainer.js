import React from 'react';
import {css, cx} from 'emotion';

const styles = css`
    display: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;

const NavButtonsContainer = props => {
    const {innerProps, children} = props;

    return (
        <div
            className={cx({
                'nav-buttons-container': true,
                [styles]: true,
            })}
            {...innerProps}
        >
            {children}
        </div>
    );
};

export default NavButtonsContainer;
