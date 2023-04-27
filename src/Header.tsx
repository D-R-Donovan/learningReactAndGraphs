import './Header.css'
import React, { useState } from "react";


export function Header() {
    const [isNavOpen, setNavOpen] = useState(false);

    function siteNav() {
        setNavOpen(!isNavOpen);
    }
    return (
        <header className="Header">
            <button onClick={siteNav} className="Nav-Toggle">
                🍔
            </button>
            <span className='Title'>D-R-Donovan</span>
            <nav></nav>
        </header>
    )
}