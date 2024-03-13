import styled from "styled-components";
import Spinner from "./Spinner";
import Logo from "./Logo";
import { StyledSidebar } from "./Sidebar";
import { StyledAppLayout } from "./AppLayout";
import { StyledHeader } from "./Header";
import {
  HiArrowRightOnRectangle,
  HiCalculator,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import DarkModeToggle from "./DarkModeToggle";
import { StyledHeaderMenu } from "./HeaderMenu";

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);

  overflow-y: scroll;
  @media only screen and (max-width: 50em) {
    grid-row: 2 / 3;
    grid-column: 1 / -1;
  }
`;

function SpinnerFullPage() {
  return (
    <StyledAppLayout>
      <StyledHeader>
        <StyledHeaderMenu>
          <li>
            <ButtonIcon>
              <HiCalculator />
            </ButtonIcon>
          </li>
          <li>
            <DarkModeToggle />
          </li>
          <li>
            <ButtonIcon>
              <HiOutlineCog6Tooth />
            </ButtonIcon>
          </li>
          <li>
            <ButtonIcon>
              <HiArrowRightOnRectangle />
            </ButtonIcon>
          </li>
        </StyledHeaderMenu>
      </StyledHeader>
      <StyledSidebar>
        <Logo />
      </StyledSidebar>
      <Main>
        <Container>
          <Spinner />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default SpinnerFullPage;
