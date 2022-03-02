import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import NavDropdown from './NavDropdown';
import NavItem from './NavItem';
import NavList from './NavList';
import NavListToggle from './NavListToggle';
import { color, typography } from '../../../../style';

type NavProps = {
  fontSizeBreakpoint: string;
}

const Nav = styled.nav<NavProps>`
  display: flex;

  a {
    color: ${color.body};
    text-decoration: none;
    transition: background-color 500ms, color 500ms, filter 500ms;

    &:focus {
      filter: drop-shadow(0 0 5px ${color.primary});
    }

    &:hover {
      background-color: ${color.body};
      color: ${color.white};
    }
  }

  ul {
    font-family: ${typography.font.heading};
    font-size: ${typography.fontSize.h5.xs};
    line-height: ${typography.lineHeight.h5.xs};
    list-style: none;

    @media (min-width: ${props => props.fontSizeBreakpoint}) {
      font-size: ${typography.fontSize.body.xs};
      line-height: ${typography.lineHeight.body.xs};
    }
  }
`;

type Props = {
  className?: string;
  toggleBreakpoint: string;
};

const Navigation: React.FC<Props> = ({ className, toggleBreakpoint }) => {
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(60);
  const [navListIsHiding, setNavListIsHiding] = useState(false);
  const [navListIsShown, setNavListIsShown] = useState(false);

  useEffect(() => getAndSetHeaderHeight(setHeaderHeight), []);
  useEffect(() => listenForAndHandleDocumentClick(setActiveDropdownId), []);
  useEffect(() => suppressScroll(navListIsShown), [navListIsShown]);

  return (
    <Nav className={className} id="navigation" fontSizeBreakpoint={toggleBreakpoint}>
      <NavListToggle
        displayBreakpoint={toggleBreakpoint}
        navListIsShown={navListIsShown}
        setNavListIsHiding={setNavListIsHiding}
        setNavListIsShown={setNavListIsShown}
      />
      <NavList
        className={`${navListIsShown && 'show'} ${navListIsHiding && 'hiding'}`}
        headerHeight={headerHeight}
        layoutBreakpoint={toggleBreakpoint}
      >
        <NavItem layoutBreakpoint={toggleBreakpoint} to="/">Home</NavItem>
        <NavItem layoutBreakpoint={toggleBreakpoint} to="/events">Events</NavItem>
        <NavItem layoutBreakpoint={toggleBreakpoint} to="/services">Services</NavItem>
        <NavDropdown
          dropdownListIsShown={activeDropdownId === 'more-dropdown'}
          id="more-dropdown"
          layoutBreakpoint={toggleBreakpoint}
          setActiveDropdownId={setActiveDropdownId}
          title="More"
        >
          <NavItem layoutBreakpoint={toggleBreakpoint} to="/images">Images</NavItem>
          <NavItem layoutBreakpoint={toggleBreakpoint} to="/mission">Mission</NavItem>
        </NavDropdown>
        <NavDropdown
          dropdownListIsShown={activeDropdownId === 'about-dropdown'}
          id="about-dropdown"
          layoutBreakpoint={toggleBreakpoint}
          setActiveDropdownId={setActiveDropdownId}
          title="About"
        >
          <NavItem layoutBreakpoint={toggleBreakpoint} to="/about">Who we are</NavItem>
          <NavItem layoutBreakpoint={toggleBreakpoint} to="/about/belief">What we believe</NavItem>
          <NavItem layoutBreakpoint={toggleBreakpoint} to="/about/pastor">Pastor’s message</NavItem>
          <NavItem layoutBreakpoint={toggleBreakpoint} to="/about/team">Our team</NavItem>
        </NavDropdown>
        <NavItem layoutBreakpoint={toggleBreakpoint} to="/visit">Visit</NavItem>
        <NavItem layoutBreakpoint={toggleBreakpoint} to="/contact">Contact</NavItem>
      </NavList>
    </Nav>
  );
};

export default Navigation;

function getAndSetHeaderHeight(
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>>
) {
  const headerElement = document.querySelector('header');

  if (headerElement) {
    setHeaderHeight(headerElement.offsetHeight);
  }
}

function listenForAndHandleDocumentClick(
  setActiveDropdownId: React.Dispatch<React.SetStateAction<string | null>>
) {
  const navigation = document.getElementById('navigation');

  if (navigation) {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!navigation.contains(event.target as Node)) {
        setActiveDropdownId(null);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
  }
}

function suppressScroll(navListIsShown: boolean) {
  const body = document.querySelector('body');

  if (navListIsShown && body !== null) {
    body.classList.add('hide-overflow');
    return () => body.classList.remove('hide-overflow');
  }
}
