import { forwardRef } from "react";
import styled from "styled-components";

interface PickerTypes {
  value?: string;
  onClick?: () => void;
}

const StyledInput = styled.button`
  font-size: 2.4rem;
  padding: 0 0.5rem;

  width: 100%;
  background-color: transparent !important;
`;

const TimePicker = forwardRef<HTMLButtonElement, PickerTypes>(
  ({ value = "", onClick }, ref) => {
    return (
      <StyledInput type="button" onClick={onClick} ref={ref}>
        {value}
      </StyledInput>
    );
  }
);

export default TimePicker;
