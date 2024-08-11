import { useState } from 'react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { useTheme } from '../context/ThemeComtext'; // Corrected import path

const NavBar = ({user}) => {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  const { theme } = useTheme();

    return (
      <nav className="main-menu">
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

                                            <svg
                                                className="ms-2 -me-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill={theme === "dark" ? "white" : "black"} // Conditional fill color
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="-me-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                <div className="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                        Dashboard
                    </ResponsiveNavLink>
                </div>

                <div className="pt-4 pb-1 border-t border-gray-200">
                    <div className="px-4">
                        <div className="font-medium text-base text-gray-800">{user.name}</div>
                        <div className="font-medium text-sm text-gray-500">{user.email}</div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                        <ResponsiveNavLink method="post" href={route('logout')} as="button">
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
          </div>
          <ul>
            <NavItem icon="fa-user" text="Profile" link="courses.index" active />
            <NavItem icon="fa-map" text="Courses" link="courses.index" />
            <NavItem icon="fa-arrow-trend-up" text="Lessons" link="courses.index" />
            <NavItem icon="fa-solid fa-chart-simple" text="Analytics" link="courses.index" />
            <NavItem icon="fa-heart" text="Favorites" link="courses.index" />
            <NavItem icon="fa-solid fa-pen-to-square" text="Reviews" link="courses.index" />
          </ul>
        </div>
  
        <ul>
          <NavItem icon="fa-gear" text="Settings" link="courses.index" />
          <NavItem icon="fa-right-from-bracket" text="Logout" link="courses.index" />
        </ul>
      </nav>
    );
  };
  
  const NavItem = ({ icon, text, active, link }) => {
    return (
      <li className={`nav-item ${active ? 'active' : ''}`}>
        <NavLink className="flex text-lg font-bold items-center gap-2 p-2 px-3" href={route(`${link}`)} active={route().current('courses.index')}>
          <i className={`fa ${icon} nav-icon`}></i>
          <span className="nav-text">{text}</span>
        </NavLink>
      </li>
    );
  };

  export default NavBar;
  