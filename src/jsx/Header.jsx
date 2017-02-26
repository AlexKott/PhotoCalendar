import React from 'react';
import IconCalendar from './svg/IconCalendar.jsx';
import IconQuestion from './svg/IconQuestion.jsx';
import IconClose from './svg/IconClose.jsx';

class Header extends React.Component {
    render() {
        const iconSize = "40px";
        return(
            <div className="header">
                {!this.props.isCalendarActive &&
                    <button
                        className="button header__button header__button--calendar"
                        onClick={() => this.props.showCalendar()}
                    ><IconCalendar size={iconSize} /></button>}
                <h1 className="header__title">{this.props.title}</h1>
                <button
                    className="button header__button header__button--info"
                    onClick={() => this.props.toggleAbout()}
                >{this.props.isAboutActive ? <IconClose size={iconSize} /> : <IconQuestion size={iconSize} />}</button>
            </div>
        )
    }
}

export default Header;
