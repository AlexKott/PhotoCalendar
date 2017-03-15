import React from 'react';

class NavButton extends React.Component {
    render() {
        const classNames = `button button--nav button--nav-${this.props.direction}`;
        return (
            <button onClick={this.props.onClick} className={classNames}>&#9654;</button>
        )
    }
}

export default NavButton;
