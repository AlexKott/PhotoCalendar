import React from 'react';

import IconCalendar from '../svg/IconCalendar.jsx';
import IconQuestion from '../svg/IconQuestion.jsx';
import IconClose from '../svg/IconClose.jsx';

export default function Header({
    isCalendarActive,
    isAboutActive,
    title,
    onShowCalendar,
    onShowAbout,
    onHideAbout
    }) {
    const iconSize = "40px";
    return (
        <div className="header">
            {!isCalendarActive &&
                <button
                    className="button button--header button--header--left"
                    onClick={() => onShowCalendar()}
                ><IconCalendar size={iconSize} /></button>
            }
            <h1 className="header__title">{title}</h1>
            {!isAboutActive &&
                <button
                    className="button button--header"
                    onClick={() => onShowAbout()}
                ><IconQuestion size={iconSize} /></button>
            }
            {isAboutActive &&
                <button
                    className="button button--header"
                    onClick={() => onHideAbout()}
                ><IconClose size={iconSize} /></button>
            }
        </div>
    );
}
