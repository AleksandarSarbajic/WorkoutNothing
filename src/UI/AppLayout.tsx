import { Outlet } from "react-router-dom";

import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";

import WorkoutExercises from "../features/workout/WorkoutExercises";
import { useWorkout } from "../features/workout/Workout";

export const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  max-height: 100vh;
  @media only screen and (max-width: 50em) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;

const Main = styled.main<{ $open: boolean }>`
  background-color: var(--color-grey-50);

  ${(props) => !props.$open && `padding: 4rem 4.8rem 6.4rem;`}
  overflow-y: scroll;
  @media only screen and (max-width: 50em) {
    grid-row: 2 / 3;
    grid-column: 1 / -1;
    ${(props) => !props.$open && `padding: 4rem 2rem 12.4rem;`}
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  const {
    state: { open },
  } = useWorkout();

  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      {!open && (
        <Main $open={open}>
          <Container>
            <Outlet />
          </Container>
        </Main>
      )}
      {open && <WorkoutExercises />}
    </StyledAppLayout>
  );
}

export default AppLayout;
