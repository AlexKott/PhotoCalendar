import React from 'react';
import IconCalendar from './svg/IconCalendar.jsx';
import IconQuestion from './svg/IconQuestion.jsx';
import IconClose from './svg/IconClose.jsx';

class Header extends React.Component {
    render() {
        const {
            isCalendarActive,
            isAboutActive,
            title,
            onShowCalendar,
            onShowAbout,
            onHideAbout
        } = this.props;
        const iconSize = "40px";
        return(
            <div className="header">
                {!isCalendarActive &&
                    <button
                        className="button header__button header__button--calendar"
                        onClick={() => onShowCalendar()}
                    ><IconCalendar size={iconSize} /></button>
                }
                <h1 className="header__title">{title}</h1>
                {!isAboutActive &&
                    <button
                        className="button header__button header__button--info"
                        onClick={() => onShowAbout()}
                    ><IconQuestion size={iconSize} /></button>
                }
                {isAboutActive &&
                    <button
                        className="button header__button header__button--info"
                        onClick={() => onHideAbout()}
                    ><IconClose size={iconSize} /></button>
                }
            </div>
        )
    }
}

export default Header;
