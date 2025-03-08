import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
    return (
        <div className="Menu">
            <h1>Magic The Gathering</h1>
            <ul className="Lista_Menu">
                <li><Link id="Cartas" to="/cartas">Cartas</Link></li>
                <li><Link id="Sets" to="/sets">Sets</Link></li>
                <li><Link id="Formatos" to="/formatos">Formatos</Link></li>
            </ul>
        </div>
    );
};

export default Menu;

