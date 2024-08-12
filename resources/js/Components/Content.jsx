import React from 'react';
import RightContent from "./RightContent";
import CardList from "./CardList";
import Reviews from './Reviews';
import { useTheme } from '../context/ThemeContext'; 

const Content = ({ auth, courses, currentPage, lastPage, links, users }) => {
  const { menuFull, toggleMaenu } = useTheme();

  return (
    <section className={`content transition-transform duration-300 ${menuFull ? "" : "-translate-x-24 xl:-translate-x-40 w-full"}`}>
      <LeftContent 
        auth={auth}
        courses={courses}
        currentPage={currentPage}
        lastPage={lastPage}
        links={links}
        users={users}
      />
      <RightContent />
    </section>
  );
};

const LeftContent = ({ auth, courses, currentPage, lastPage, links, users }) => {
  return (
    <div className="left-content">
      <SearchAndCheck />
      <Header />
      <CardList
        auth={auth} 
        courses={courses}
        currentPage={currentPage}
        lastPage={lastPage}
        links={links}
        users={users}
      />
      <Reviews />
    </div>
  );
};

const SearchAndCheck = () => {
  return (
    <div className="search-and-check">
      <form className="search-box">
        <input type="text" placeholder="Search event..." />
        <i className="bx bx-search"></i>
      </form>
      <div className="interaction-control-mobile interactions">
        <i className="fa-regular fa-envelope notified"></i>
        <i className="fa-regular fa-bell notified"></i>
      </div>
    </div>
  );
};

const Header = () => {
  const { theme } = useTheme();

  return (
    <div className="header">
      {theme === "dark" ? <NightImages /> : <MorningImages />}
    </div>
  );
};

const MorningImages = () => (
  <picture className="morning-img">
    <img
      className="header-mobile"
      src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/b4f4845f-4dc7-4470-b81a-677f46f211c2"
      alt="Morning header mobile"
    />
    <img
      className="header-tablet"
      src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/8add6e87-577d-44cb-a7bb-18f0e4bd2163"
      alt="Morning header tablet"
    />
    <img
      className="header-desktop"
      src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/cce4084a-01a4-428d-961f-935bafe7a6e3"
      alt="Morning header desktop"
    />
  </picture>
);

const NightImages = () => (
  <picture className="night-img">
    <img
      className="header-mobile"
      src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e349d3c2-ee2c-4982-866e-776236508fc9"
      alt="Night header mobile"
    />
    <img
      className="header-tablet"
      src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/1266c923-a1d3-441a-bbb6-2dc6663b1f8b"
      alt="Night header tablet"
    />
    <img
      className="header-desktop"
      src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/91011799-2b47-457d-9e11-65fe38a105d0"
      alt="Night header desktop"
    />
  </picture>
);

export default Content;
