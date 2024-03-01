import styled from "styled-components";

const StyledSelect = styled.select<{ $type?: string }>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.$type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface SelectProps {
  options: { value: string | number; label: string }[];
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Corrected type here
  disabled?: boolean;
}

function Select({ options, value, onChange, disabled, ...props }: SelectProps) {
  return (
    <StyledSelect
      defaultValue={value}
      onChange={onChange}
      disabled={disabled}
      {...props}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
