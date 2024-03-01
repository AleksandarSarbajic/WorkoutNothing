import { format } from "date-fns";
import { forwardRef } from "react";
import styled from "styled-components";

interface PickerTypes {
  value?: string;
  onClick?: () => void;
}

const StyledInput = styled.button`
  padding: 0 0.5rem;
  margin-right: 2rem;
  text-align: left;
  height: 3rem;
  width: 100%;
`;

const DatePickerInput = forwardRef<HTMLButtonElement, PickerTypes>(
  ({ value = "", onClick }, ref) => {
    const formattedDate = format(new Date(value), "dd.MM.yyyy");
    return (
      <StyledInput type="button" onClick={onClick} ref={ref}>
        {formattedDate}
      </StyledInput>
    );
  }
);

export default DatePickerInput;
