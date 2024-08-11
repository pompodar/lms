import NavLink from '@/Components/NavLink';

const NavBar = () => {
    return (
      <nav className="main-menu">
        <div>
          <div className="user-info">
            <img
              src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e5a707f4-d5ac-4f30-afd8-4961ae353dbc"
              alt="user"
            />
            <p>Mia Taylor</p>
          </div>
          <ul>
            {/* <NavItem icon="fa-user" text="Profile" active /> */}
            <NavItem icon="fa-map" text="Courses" link="courses.index" />
            {/* <NavItem icon="fa-arrow-trend-up" text="Lessons" />
            <NavItem icon="fa-solid fa-chart-simple" text="Analytics" />
            <NavItem icon="fa-heart" text="Favorites" />
            <NavItem icon="fa-solid fa-pen-to-square" text="Reviews" /> */}
          </ul>
        </div>
  
        <ul>
          {/* <NavItem icon="fa-gear" text="Settings" />
          <NavItem icon="fa-right-from-bracket" text="Logout" /> */}
        </ul>
      </nav>
    );
  };
  
  const NavItem = ({ icon, text, active, link }) => {
    return (
      <li className={`nav-item ${active ? 'active' : ''}`}>
        <NavLink className="flex text-lg font-bold items-center gap-2 hover:bg-[#f5f5f5] p-2 px-3 rounded-xl" href={route(`${link}`)} active={route().current('courses.index')}>
          <i className={`fa ${icon} nav-icon`}></i>
          <span className="nav-text">{text}</span>
        </NavLink>
      </li>
    );
  };

  export default NavBar;
  