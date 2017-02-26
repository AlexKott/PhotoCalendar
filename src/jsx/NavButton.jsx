import React from 'react';

class NavButton extends React.Component {
    render() {
        return (
            <div>
                {this.props.direction === 'left'
                    ? <button onClick={this.props.onClick} className="button button--nav button--nav-left">&#9654;</button>
                    : <button onClick={this.props.onClick} className="button button--nav">&#9654;</button>}
            </div>
        )
    }
}

export default NavButton;
