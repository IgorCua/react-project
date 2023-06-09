import Container from '../Container/Container';
import { Logo } from './Logo/Logo';
import { Navigation } from './Navigation/Navigation';
import { UserBar } from './UserBar/UserBar';
import { useSelector } from 'react-redux';
import { selectorIsLoggedIn, selectorName } from '../../redux/auth/authSelectors';

import d from './Header.module.scss';
import clsx from 'clsx';
import { useState } from 'react';

const Header = () => {
  const isAuth = useSelector(selectorIsLoggedIn);
  const name = useSelector(selectorName);

  const [isOpen, setIsOpen]  = useState(false);
  
  const handleToggleMenu = () => {
    setIsOpen((p) => !p)
  }

  return (
    <header className={d.header}>
      <Container>
        <div className={clsx(d.headerWrap, isAuth && d.isAuth)}>
          <div className={clsx(d.headerNavWrap, isAuth && d.isAuth)}>
            <Logo />
            <Navigation isOpen={isOpen} handleToggleMenu={handleToggleMenu} />
          </div>
          {isAuth && name && (
            <UserBar handleToggleMenu={handleToggleMenu} isOpen={isOpen} />
          )}
        </div>
      </Container>
      
    </header>
  );
};

export default Header;
