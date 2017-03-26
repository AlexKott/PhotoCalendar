import React from 'react';
import { Link } from 'redux-little-router';

import IconCalendar from '../svg/IconCalendar.jsx';
import IconQuestion from '../svg/IconQuestion.jsx';
import IconClose from '../svg/IconClose.jsx';

export default function Header({
    isCalendarActive,
    isAboutActive,
    title,
    onCloseAbout
    }) {
    const iconSize = "40px";
    return (
        <div className="header">
            {!isCalendarActive &&
                <button
                    className="button header__button header__button--calendar"
                    onClick={() => onShowCalendar()}
                ><IconCalendar size={iconSize} /></button>
            }
            <h1 className="header__title">{title}</h1>
            {isAboutActive
                ? <button
                    onClick={onCloseAbout}
                    className="button header__button header__button--info"
                ><IconClose size={iconSize} /></button>
                : <Link
                    href="/about"
                    className="button header__button header__button--info"
                ><IconQuestion size={iconSize} /></Link>
            }
        </div>
    );
}
