
import React, { useState } from 'react';
import './Sidebar.scss'
import { IconContext } from "react-icons";
import { FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';


export const SideBar = () => {

    const [isOpenSideBar, setIsOpenSideBar] = useState(false);

    const openMenu = () => {
        setIsOpenSideBar(current => !current)
    }
    return (
        <aside  className={isOpenSideBar ? 'aside open' : 'aside'}>
           <IconContext.Provider value={{ color: "white", className: "aside__open-menu" }}>
           <FaBars onClick={openMenu} />
            </IconContext.Provider>

            <ul className='aside__wrap-list'>
                <li className='aside__list'><Link className='aside__link' to="/" >Dashboard</Link></li>
                <li className='aside__list'><Link className='aside__link' to="/produtor">Produtor</Link></li>
            </ul>
        </aside>
    );
}