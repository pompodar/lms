import { useState } from 'react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { useTheme } from '../context/ThemeContext'; // Corrected import path

const NavBar = ({ user }) => {

  const { theme } = useTheme();

  const { menuFull, toggleMenu } = useTheme();

  return (
    <nav className={`main-menu relative z-10 transform transition-transform duration-300 ${menuFull ? "translate-x-0" : "-translate-x-full"}`}>
      <div
        onClick={() => { toggleMenu(menuFull); }}
        className={`group flex justify-center items-center absolute ${menuFull ? "-right-3" : "-right-7"} top-32 w-6 h-6 bg-indigo-500 rounded-full cursor-pointer border border-white shadow-lg transition-transform duration-300`}
      >
        {menuFull ? (
          <i className="fa-solid fa-angle-left group-hover:rotate-[360deg] transition-transform duration-300"></i>
        ) : (
          <i className="fa-solid fa-angle-right group-hover:-rotate-[360deg] transition-transform duration-300"></i>
        )}
      </div>
      <div>
        <div className="user-info">
          <img
            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e5a707f4-d5ac-4f30-afd8-4961ae353dbc"
            alt="user"
          />
          <div className="mx-auto -mt-4 mb-2">
            <div className="flex">
              <div className="hidden sm:flex sm:items-center ml-auto">
                <div className="relative">
                  <Dropdown>
                    <Dropdown.Trigger>
                      <span className="inline-flex">
                        <button
                          type="button"
                          className={`bg-transparent inline-flex items-center px-3 pb-4 border border-transparent text-md leading-4 font-medium ${theme === "dark" ? "text-white" : "text-black"} focus:outline-none transition ease-in-out duration-150`}
                        >
                          {user.name}
                        </button>
                      </span>
                    </Dropdown.Trigger>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul>
          <NavItem icon="fa-map" text="Courses" link="courses.index" method="get" active menuFull={menuFull} />
          <NavItem icon="fa-arrow-trend-up" text="Lessons" link="courses.index" method="get" menuFull={menuFull} />
          <NavItem icon="fa-solid fa-chart-simple" text="Analytics" link="courses.index" method="get" menuFull={menuFull} />
          <NavItem icon="fa-heart" text="Favorites" link="courses.index" method="get" menuFull={menuFull} />
          <NavItem icon="fa-solid fa-pen-to-square" text="Reviews" link="courses.index" method="get" menuFull={menuFull} />
        </ul>
      </div>

      <ul>
        <NavItem icon="fa-user" text="Profile" link="profile.edit" method="get" menuFull={menuFull} />
        <NavItem icon="fa-gear" text="Settings" link="courses.index" method="get" menuFull={menuFull} />
        <NavItem icon="fa-right-from-bracket" text="Logout" link="logout" method="post" menuFull={menuFull} />
      </ul>
    </nav>
  );
};

const NavItem = ({ icon, text, active, link, method, menuFull }) => {
  return (
    <li className={`nav-item ${active ? 'active' : ''}`}>
      <NavLink className="flex text-lg font-bold items-center gap-2 p-2 px-3" method={method} href={route(`${link}`)} active={route().current('courses.index')}>
        <i className={`fa ${icon} nav-icon`}></i>
        <span className={`nav-text ${menuFull ? "block" : "hidden"}`}>{text}</span>
      </NavLink>
    </li>
  );
};

export default NavBar;
