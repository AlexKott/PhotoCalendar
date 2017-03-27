import React from 'react';
import { Link } from 'redux-little-router';

export default function NavButton({ direction, href, onClick }) {
    const classNames = `button button--nav button--nav-${direction}`;
    if (href) {
        return (
            <Link href={href} className={classNames}>&#9654;</Link>
        );
    }
    return (
        <button onClick={onClick} className={classNames}>&#9654;</button>
    )
}
