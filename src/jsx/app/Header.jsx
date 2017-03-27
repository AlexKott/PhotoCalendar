import React from 'react';
import { Link } from 'redux-little-router';

import IconCalendar from '../svg/IconCalendar.jsx';
import IconQuestion from '../svg/IconQuestion.jsx';
import IconClose from '../svg/IconClose.jsx';
import IconComments from '../svg/IconComments.jsx';

export default function Header({
    isCalendarActive,
    isAboutActive,
    title,
    numberOfComments,
    onCloseAbout
    }) {
    const iconSize = "40px";
    return (
        <div className="header">
            {!isCalendarActive &&
                <Link
                    className="button button--header button--header--left"
                    href="/"
                ><IconCalendar size={iconSize} /></Link>
            }
            <h1 className="header__title">{title}</h1>
            {numberOfComments > 0
                ? <a href="#comments" className="button button--header">
                    <IconComments size={iconSize} /><span className="button__label">{numberOfComments}</span></a>
                : ''

            }
            {isAboutActive
                ? <button
                    onClick={onCloseAbout}
                    className="button button--header"
                ><IconClose size={iconSize} /></button>
                : <Link
                    href="/about"
                    className="button button--header"
                ><IconQuestion size={iconSize} /></Link>
            }
        </div>
    );
}
