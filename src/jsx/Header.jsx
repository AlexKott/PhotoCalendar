import React from 'react';

class Header extends React.Component {
    render() {
        return(
            <div className="header">
                {!this.props.isCalendarActive && <button className="button" onClick={() => this.props.showCalendar()}>Show Calendar</button>}
                <h1 className="header__title">{this.props.title}</h1>
            </div>
        )
    }
}

export default Header;
