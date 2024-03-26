import styled from "styled-components";
import { useWorkout } from "../features/workout/Workout";
import { formatTimeWorkout } from "../utils/helpers";
import { useTimerHandler } from "../context/Timer";

const StyledTimer = styled.button<{ $customTimerIsOpen: boolean }>`
  padding: 2rem;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  p {
    display: none;
  }
  @media only screen and (max-width: 50em) {
    position: absolute;
    width: 101%;
    top: -9rem;
    ${(props) => props.$customTimerIsOpen && `top: -11.5rem;`}
    border-radius: 0;
    z-index: 3;
    padding: 1.6rem;
    p {
      font-size: 2rem;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const StyledTime = styled.div`
  font-size: 2.4rem;
  @media only screen and (max-width: 50em) {
    font-size: 2rem;
  }
`;

function WorkoutTimer() {
  const {
    dispatch,
    state: { name, template, edit },
    time: { hours, seconds, minutes },
  } = useWorkout();
  const {
    minutes: timerMinutes,
    seconds: timerSeconds,
    customTimerIsOpen,
  } = useTimerHandler();

  return (
    <StyledTimer
      $customTimerIsOpen={customTimerIsOpen}
      onClick={() => {
        dispatch({ type: "OPEN_CLOSE" });
      }}
    >
      <p>{name}</p>
      {template && edit && (
        <div style={{ textTransform: "uppercase" }}>Editing Template</div>
      )}
      {template && !edit && (
        <div style={{ textTransform: "uppercase" }}>Creating Template</div>
      )}
      {edit && !template && (
        <div style={{ textTransform: "uppercase" }}>Editing</div>
      )}
      {!edit && !template && (
        <StyledTime>
          {hours >= 1 && <span>{formatTimeWorkout(hours)}:</span>}
          <span>{formatTimeWorkout(minutes)}:</span>
          <span>{formatTimeWorkout(seconds)} </span>
        </StyledTime>
      )}
      {customTimerIsOpen && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>Rest timer - &nbsp;</div>
          <span> {formatTimeWorkout(timerMinutes)}:</span>
          <span>{formatTimeWorkout(timerSeconds)}</span>
        </div>
      )}
    </StyledTimer>
  );
}

export default WorkoutTimer;
