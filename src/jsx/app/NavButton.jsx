import React from 'react';

export default function NavButton({ direction, onClick }) {
    const classNames = `button button--nav button--nav-${direction}`;
    return (
        <button onClick={onClick} className={classNames}>&#9654;</button>
    );
}
