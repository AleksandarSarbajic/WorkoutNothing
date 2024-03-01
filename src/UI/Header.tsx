import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/auth/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
  @media only screen and (max-width: 37.5em) {
    padding: 1.2rem 3.6rem;
    justify-content: space-between;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
