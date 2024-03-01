import { HiChevronDown } from "react-icons/hi2";
import Workout, { useWorkout } from "./Workout";
import styled from "styled-components";
import { ActionTypes } from "../../types/WorkoutTypes";
import Timer from "../../context/Timer";

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }
`;

const StyledClose = styled.button`
  svg {
    width: 3rem;
    height: 3rem;
  }
`;

function WorkoutHeading() {
  const { dispatch } = useWorkout();

  return (
    <StyledRow>
      <div>
        <StyledClose
          onClick={() =>
            dispatch({ type: ActionTypes.OPEN_CLOSE, payload: false })
          }
        >
          <HiChevronDown />
        </StyledClose>

        <Timer.Modal />
      </div>
      <Workout.Finish />
    </StyledRow>
  );
}

export default WorkoutHeading;
