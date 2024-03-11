import ReactDatePicker from "react-datepicker";

import { forwardRef, useState } from "react";

import useWorkouts from "../features/workout/useWorkouts";

import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
interface PickerTypes {
  value?: string;
  onClick?: () => void;
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`;
const StyledBox = styled.div`
  font-size: 2rem;
  margin-right: 1rem;
`;

const StyledInput = styled.button`
  padding: 0 0.5rem;
  margin-right: 2rem;
  text-align: left;
  height: 3rem;
  width: 100%;
`;

const DatePickerInput = forwardRef<HTMLButtonElement, PickerTypes>(
  ({ value = "", onClick }, ref) => {
    return (
      <StyledInput type="button" onClick={onClick} ref={ref}>
        {value}
      </StyledInput>
    );
  }
);

function HistoryCalendar({
  latestDate,
  furthestDate,
}: {
  latestDate: Date | null;
  furthestDate: Date | null;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { workouts = [] } = useWorkouts();

  const [startDate, setStartDate] = useState(furthestDate || new Date());
  const [endDate, setEndDate] = useState(latestDate || new Date());
  const onChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start !== null) {
      searchParams.set("startDate", start.toISOString());
      setSearchParams(searchParams);
    }
    if (end !== null) {
      searchParams.set("endDate", end.toISOString());
      setSearchParams(searchParams);
    }
  };
  function onClearHandler() {
    searchParams.delete("startDate");
    searchParams.delete("endDate");
    setSearchParams(searchParams);
    setStartDate(new Date());
    setEndDate(new Date());
  }

  return (
    <StyledContainer>
      <StyledBox>Select Date</StyledBox>
      <ReactDatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 3)}
        highlightDates={workouts.map((workout) => new Date(workout.end_time))}
        id="date-picker"
        withPortal
        portalId="history-calendar-portal"
        customInput={<DatePickerInput />}
      />
      {searchParams.has("startDate") && searchParams.has("endDate") && (
        <Button $size="smallMedium" onClick={onClearHandler}>
          Clear
        </Button>
      )}
    </StyledContainer>
  );
}

export default HistoryCalendar;
