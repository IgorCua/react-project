import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectorIsLoggedIn } from 'redux/auth/authSelectors';
import d from './Navigation.module.scss';
import { useMediaQuery } from 'react-responsive';

export const Navigation = ({isOpen}) => {

  const isAuth = useSelector(selectorIsLoggedIn);
  const location = useLocation();

  const isTablMob = useMediaQuery({ query: '(max-width: 1279px)' });

  const getActiveClass = ({ isActive }) => clsx(
    !isAuth && d.link, !isAuth && isActive && d.active, 
    isAuth && isActive && d.authLinkActive, isAuth && d.authLink
    );

  return (
    <>
      {/* <ul className={clsx(d.headerList, isOpen && isTablMob && d.isMobMenuOpen)}> */}
        {!isAuth ? (
          <nav className={d.headerNav}>
            <ul className={clsx(d.headerList)}>
              <li className={d.headerItem}>
                <NavLink 
                  className={getActiveClass} 
                  state={location} 
                  to="/login"
                >
                  Log In
                </NavLink>
              </li>
              <li className={d.headerItem}>
                <NavLink 
                  className={getActiveClass} 
                  state={location} 
                  to="/register"
                >
                  Registration
                </NavLink>
              </li>
            </ul>
          </nav>
        ) : (
          <div className={clsx(isOpen && isTablMob && d.MobMenuOpen, isOpen && !isTablMob && d.MobMenu)}>
            <nav className={clsx(!isTablMob && d.headerNav, isOpen && isTablMob && d.headerNavOpen)}>
              <ul className={clsx(d.headerListAuth, isOpen && isTablMob && d.MobMenuListOpen)}>
                <li className={d.headerItemAuth}>
                  <NavLink
                    state={location}
                    to="/plan"
                    className={getActiveClass}
                  >
                    Personal plan
                  </NavLink>
                </li>
                <li className={d.headerItemAuth}>
                  <NavLink
                    state={location}
                    to="/cash-flow"
                    className={getActiveClass}
                  >
                    Cashflow
                  </NavLink>
                </li>
                <li className={d.headerItemAuth}>
                  <NavLink
                    state={location}
                    to="/dynamics"
                    className={getActiveClass}
                  >
                    Dynamics
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        )}
      {/* </ul> */}
    </>
  );
};