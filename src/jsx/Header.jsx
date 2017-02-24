import React from 'react';
import IconCalendar from './svg/IconCalendar.jsx';

class Header extends React.Component {
    render() {
        return(
            <div className="header">
                {!this.props.isCalendarActive &&
                    <button
                        className="button button--header"
                        onClick={() => this.props.showCalendar()}
                    ><IconCalendar /></button>}
                <h1 className="header__title">{this.props.title}</h1>
                <button className="button button--header button--header-info">i</button>
            </div>
        )
    }
}

export default Header;
