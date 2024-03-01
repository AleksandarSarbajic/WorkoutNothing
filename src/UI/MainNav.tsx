import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineHome,
  HiOutlinePlus,
} from "react-icons/hi2";
import { CiDumbbell, CiRuler } from "react-icons/ci";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  @media only screen and (max-width: 50em) {
    flex-direction: row;
    gap: 0;
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }

  @media only screen and (max-width: 45.625em) {
    &:link,
    &:visited {
      flex-direction: column;
      width: 12rem;
    }
  }

  @media only screen and (max-width: 31.25em) {
    &:link,
    &:visited {
      width: 10rem;
      padding: 1.2rem;
    }
  }
  @media only screen and (max-width: 25em) {
    &:link,
    &:visited {
      width: 9.6rem;
      padding: 1rem;
      font-size: 1.4rem;
    }
  }
  @media only screen and (max-width: 23.75em) {
    &:link,
    &:visited {
      width: 9rem;
    }
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/history">
            <HiOutlineCalendarDays />
            <span>History</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/workout">
            <HiOutlinePlus />
            <span>Workout</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/exercises">
            <CiDumbbell />
            <span>Exercises</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/measures">
            <CiRuler />
            <span>Measures</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
