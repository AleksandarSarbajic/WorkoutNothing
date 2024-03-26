import { ReactNode, createContext, useContext, useState } from "react";
import { HiOutlineClock } from "react-icons/hi2";
import { useTimer } from "react-timer-hook";
import styled, { css } from "styled-components";
import { formatTimeWorkout } from "../utils/helpers";
import Modal from "./Modal";
import Heading from "../UI/Heading";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import ReactDatePicker from "react-datepicker";
import TimePicker from "../UI/TimePicker";
import { useWorkout } from "../features/workout/Workout";
import { useSettings } from "../features/settings/useSettings";

const StyledClock = styled.button<{ $hasTime: boolean }>`
  background-color: var(--color-brand-700);
  padding: 0.7rem;

  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  color: var(--color-brand-50);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  ${(props) =>
    props.$hasTime &&
    css`
      padding: 0.7rem 1.6rem;

      & div {
        width: 4rem;
        text-align: right;
      }
    `}

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }
  &:hover {
    background-color: var(--color-brand-600);
  }
`;
const ButtonStyle = css`
  & button {
    color: var(--color-brand-100);
    background-color: var(--color-brand-700);
    text-align: center;
    border-radius: var(--border-radius-sm);
    &:hover {
      background-color: var(--color-brand-800);
    }
  }
`;

const ModalItemButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
  margin: 2rem 0;

  & button {
    letter-spacing: 1px;
    padding: 0.6rem 1.6em;
  }
`;

const StyledModalItem = styled.div`
  ${ButtonStyle}
  & p {
    font-size: 1.4rem;
    opacity: 0.6;
  }

  & > div:last-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin: 0;
    gap: 0.5rem;
    & button {
      padding: 0.6rem 1rem;
      text-transform: uppercase;
      font-size: 1.4rem;
    }
    & > button:last-child {
      width: 17rem;
      font-size: 1.6rem;
    }
  }

  & > button:last-child {
    font-weight: 500;
    text-transform: uppercase;

    width: 100%;
    padding: 0.8rem 1.2rem;
  }
`;

const ModalItemTime = styled.div`
  font-size: 4.4rem !important;
  opacity: 1 !important;
  letter-spacing: 1px;
  text-align: center;
  margin: 2rem 0;
  & > div:last-child {
    font-size: 2.4rem;
    opacity: 0.5;
  }
`;

const TimerContext = createContext<{
  minutes: number;
  seconds: number;
  totalSeconds: number;
  selectedValue: number;
  startingValue: number;
  isOpen: boolean;
  restart: (newExpiryTimestamp: Date) => void;
  handleRestart: () => void;
  timerHandler: (
    value: number,
    incrementDecrement: boolean,
    starting?: number,
    curTimer?: boolean,
    select?: boolean
  ) => void;
  customTimerIsOpen: boolean;
  openTimer: () => void;
  open: () => void;
}>({
  minutes: 0,
  seconds: 0,
  totalSeconds: 0,
  selectedValue: 0,
  startingValue: 0,
  isOpen: false,
  restart: () => null,
  timerHandler: () => null,
  customTimerIsOpen: false,
  openTimer: () => null,
  open: () => null,
  handleRestart: () => null,
});
function Timer({ children }: { children: ReactNode }) {
  const { settings } = useSettings();
  const [isRestart, setIsRestart] = useState(false);
  const [expiryTimestamp, setExpiryTimestamp] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [customTimerIsOpen, setCustomTimerIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);
  const [startingValue, setStartingValue] = useState(0);

  const audio = new Audio(
    `https://zvwyaoedhsrbfwycadck.supabase.co/storage/v1/object/public/sounds/${
      settings?.sound ?? "boxingBell"
    }.mp3`
  );

  const openTimer = () => setCustomTimerIsOpen((cur) => !cur);
  const { seconds, minutes, restart, totalSeconds } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => {
      if (!isRestart && settings?.sound_effect) {
        audio.play();
      }
      setIsRestart(false);
      setStartingValue(() => 0);
      setSelectedValue(0);
      setCustomTimerIsOpen((cur) => !cur);
    },
  });

  // Function to restart the timer

  const open = () => setIsOpen((cur) => !cur);

  function timerHandler(
    value: number = 0,
    incrementDecrement: boolean = false,
    starting: number = 0,
    curTimer: boolean = false,
    select: boolean = false
  ) {
    if (starting !== 0) {
      setStartingValue((cur) => cur + starting);
    } else {
      setStartingValue(() => value);
    }

    if (curTimer && !select) {
      setCustomTimerIsOpen((cur) => !cur);
    }
    if (!select) {
      setCustomTimerIsOpen(() => true);
    }
    if (!incrementDecrement) {
      setSelectedValue(() => value);
    }

    const time = new Date();
    time.setSeconds(time.getSeconds() + value);
    setExpiryTimestamp(() => time);

    restart(time);
  }
  const handleRestart = () => {
    setIsRestart(true);

    timerHandler(0, true, 0);
  };

  return (
    <TimerContext.Provider
      value={{
        seconds,
        minutes,
        timerHandler,
        customTimerIsOpen,
        openTimer,
        totalSeconds,
        selectedValue,
        startingValue,
        isOpen,
        open,
        restart,
        handleRestart,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

function TimerToggle() {
  const { seconds, minutes } = useContext(TimerContext);
  const hasTimer = seconds !== 0 || minutes !== 0;
  return (
    <StyledClock $hasTime={hasTimer}>
      <HiOutlineClock />
      {hasTimer && (
        <div>
          {formatTimeWorkout(minutes)}:{formatTimeWorkout(seconds)}
        </div>
      )}
    </StyledClock>
  );
}

function ModalItem() {
  const {
    timerHandler,
    seconds,
    minutes,
    openTimer,
    customTimerIsOpen,
    totalSeconds,
    startingValue,
    open,
    isOpen,
  } = useContext(TimerContext);
  const { settings } = useSettings();

  const initialStartDate = (() => {
    const date = new Date();
    date.setHours(5, 0, 0, 0);
    return date;
  })();

  const [startDate, setStartDate] = useState(initialStartDate);

  const convertTime = (time: Date) => {
    const totalMinutes = time.getHours() * 60;
    const totalSeconds = totalMinutes + time.getMinutes();
    return totalSeconds;
  };

  const startTime = convertTime(startDate);

  function handleTime(value: number = 0) {
    openTimer();
    timerHandler(value, false);
  }

  return (
    <StyledModalItem>
      <Heading as={"h3"} style={{ marginBottom: "2rem" }}>
        Rest Timer
      </Heading>

      <p style={{ height: "5rem" }}>
        {!customTimerIsOpen
          ? "Choose a duration below or set your own. Custom durations are saved for next time."
          : "Adjust duration via the +/- buttons"}
      </p>
      <div style={{ height: "500", width: "500", margin: "5rem 0" }}>
        <div>
          <CircularProgressbarWithChildren
            strokeWidth={5}
            value={totalSeconds === 0 ? 0 : totalSeconds}
            maxValue={totalSeconds === 0 ? 0 : startingValue}
            styles={buildStyles({
              strokeLinecap: "butt",
              pathColor: " rgb(67, 56, 202)",
              trailColor: "var(--color-grey-200)",
              backgroundColor: "var(--color-brand-600)",
            })}
          >
            {customTimerIsOpen ? (
              <ModalItemTime>
                <div>
                  {formatTimeWorkout(minutes)}:{formatTimeWorkout(seconds)}
                </div>
                <div>
                  {formatTimeWorkout(Math.floor(startingValue / 60))}:
                  {formatTimeWorkout(startingValue % 60)}
                </div>
              </ModalItemTime>
            ) : (
              <ModalItemButtonBox>
                {!isOpen ? (
                  <>
                    <button onClick={() => handleTime(60)}>01:00</button>
                    <button onClick={() => handleTime(120)}>02:00</button>
                    <button onClick={() => handleTime(180)}>03:00</button>
                    <button onClick={() => handleTime(240)}>04:00</button>
                    <button onClick={() => handleTime(300)}>05:00</button>
                  </>
                ) : (
                  <div>
                    <ReactDatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date!)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={5}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                      timeFormat="HH:mm"
                      minTime={new Date(0, 0, 0, 0, 0, 0)}
                      maxTime={new Date(0, 0, 0, 10, 0, 0)}
                      customInput={<TimePicker />}
                    />
                  </div>
                )}
              </ModalItemButtonBox>
            )}
          </CircularProgressbarWithChildren>
        </div>
      </div>
      {customTimerIsOpen ? (
        <div>
          <button
            onClick={() =>
              timerHandler(
                totalSeconds - (settings?.timer_value ?? 0),
                true,
                -(settings?.timer_value ?? 0)
              )
            }
          >
            -{settings?.timer_value} sec
          </button>
          <button
            onClick={() =>
              timerHandler(
                totalSeconds + (settings?.timer_value ?? 0),
                true,
                settings?.timer_value ?? 0
              )
            }
          >
            +{settings?.timer_value} sec
          </button>
          <button onClick={() => timerHandler(0, true, 0)}>Skip</button>
        </div>
      ) : (
        <button
          onClick={() => {
            if (isOpen) {
              handleTime(startTime);
            }
            open();
          }}
        >
          {!isOpen ? "Create" : "Start"} custom timer
        </button>
      )}
    </StyledModalItem>
  );
}

function TimerModal() {
  const {
    state: { edit, template },
  } = useWorkout();
  return (
    <Modal>
      <Modal.Open opens={"timer-modal-opens"}>
        <div>{edit === false && template === false ? <TimerToggle /> : ""}</div>
      </Modal.Open>
      <Modal.Window name={"timer-modal-opens"}>
        <ModalItem />
      </Modal.Window>
    </Modal>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTimerHandler() {
  const { timerHandler, minutes, seconds, customTimerIsOpen, handleRestart } =
    useContext(TimerContext);

  return { timerHandler, minutes, seconds, customTimerIsOpen, handleRestart };
}

Timer.Toggle = TimerToggle;
Timer.Modal = TimerModal;
export default Timer;
