import React from 'react';
import { Link } from 'redux-little-router';

import IconCalendar from '../svg/IconCalendar.jsx';
import IconQuestion from '../svg/IconQuestion.jsx';
import IconClose from '../svg/IconClose.jsx';
import IconComments from '../svg/IconComments.jsx';

import * as scrollHelper from '../_helpers/scrollHelper';

export default function Header({
    isCalendarActive,
    isAboutActive,
    isDetailViewActive,
    title,
    numberOfComments,
    onCloseAbout
    }) {
    const iconSize = "40px";
    return (
        <div className="header" id="header">
            {!isCalendarActive &&
                <Link
                    className="button button--header button--header--left"
                    href="/"
                ><IconCalendar size={iconSize} /></Link>
            }
            <h1 className="header__title">{title}</h1>
            {isDetailViewActive && numberOfComments > 0
                ? <button className="button button--header" onClick={() => scrollHelper.scrollToElement('#comments', '#header')}>
                    <IconComments size={iconSize} /><span className="button__label">{numberOfComments}</span></button>
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
