import React from 'react';
import { useTheme } from '../context/ThemeComtext';

const RightContent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="right-content">
      <div className="interaction-control interactions">
        <i className="fa-regular fa-envelope notified"></i>
        <i className="fa-regular fa-bell notified"></i>
        <div className="toggle" onClick={toggleTheme}>
          {theme === 'light' ? (
            <div className="mode-icon moon">
              <i className="fa-solid fa-moon"></i>
            </div>
          ) : 
            (
              <div className="mode-icon sun">
                <i className="fa-regular fa-moon"></i>
              </div>
            )
          }
        </div>
      </div>

      <div className="analytics">
        <h1>Analytics</h1>
        <div className="analytics-container">
          <div className="total-events">
            <div className="event-number card">
              <h2>Past Events</h2>
              <p>20</p>
              <i className="bx bx-check-circle"></i>
            </div>
            <div className="event-number card">
              <h2>Upcoming Events</h2>
              <p>3</p>
              <i className="bx bx-timer"></i>
            </div>
          </div>

          <div className="chart" id="doughnut-chart">
            <h2>Distribution of Attended Events</h2>
            <canvas id="doughnut"></canvas>
            <ul></ul>
          </div>
        </div>
      </div>

      <div className="contacts">
        <h1>Contacts</h1>
        <div className="contacts-container">
          {[
            {
              imgSrc: 'https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e56800db-687d-4d0e-a470-51e37a4431c7',
              text: 'Matt favored Jazz Fusion Night',
              time: '1 hour ago',
            },
            {
              imgSrc: 'https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/fac9f27b-c1ea-4bba-973f-88996322fa2d',
              text: 'Bella bought a ticket for Acoustic Serenade Under the Stars',
              time: '4 hours ago',
            },
            {
              imgSrc: 'https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/1499d73c-ccc0-41a1-b530-1d629012aebd',
              text: 'Lucas bought a ticket for Wimbledon Championships - 2024',
              time: '1 day ago',
            },
            {
              imgSrc: 'https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/949768d4-0196-486c-b386-edb47ddd54c2',
              text: 'Sophia favored Clay Sculpting Class',
              time: '1 day ago',
            },
            {
              imgSrc: 'https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/8a470b8b-b5cf-4189-b36e-f22551997ff4',
              text: 'Kate bought a ticket for Latin Rhythms Fusion',
              time: '3 days ago',
            },
            {
              imgSrc: 'https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7740acc0-3f86-4c28-8a8c-5ae67c343edb',
              text: 'Ben favored Harry Potter Film Concert Series',
              time: '6 days ago',
            },
          ].map((contact, index) => (
            <div className="contact-status" key={index}>
              <div className="contact-activity">
                <img src={contact.imgSrc} alt="" />
                <p>{contact.text}</p>
              </div>
              <small>{contact.time}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightContent;
