import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

import { useWorkout } from "../features/workout/Workout";
import WorkoutTimer from "./WorkoutTimer";

const StyledSidebar = styled.aside`
  position: relative;
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  @media only screen and (max-width: 50em) {
    position: fixed;
    bottom: 0;
    right: 50%;
    transform: translateX(50%);
    width: 100%;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    z-index: 5;
  }
  @media only screen and (max-width: 45.625em) {
    padding: 3rem 1.2rem 1.2rem 1.2rem;
  }
  @media only screen and (max-width: 31.25em) {
    padding: 1rem 0.5rem;
  }
`;

function Sidebar() {
  const {
    state: { open, status },
  } = useWorkout();
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      {!open && status === "running" && <WorkoutTimer />}
    </StyledSidebar>
  );
}

export default Sidebar;
