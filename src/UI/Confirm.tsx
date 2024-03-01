import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
const StyledConfirm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
function Confirm({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  text,
  confirmText,
}: {
  resourceName: string;
  onConfirm: () => void;
  disabled?: boolean;
  onCloseModal?: () => void;
  text?: string;
  confirmText?: string;
}) {
  return (
    <StyledConfirm>
      <Heading as="h2">{resourceName}</Heading>
      <p>{text}</p>

      <div>
        <Button
          $variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button disabled={disabled} onClick={onConfirm}>
          {confirmText ? confirmText : "Finish Workout"}
        </Button>
      </div>
    </StyledConfirm>
  );
}

export default Confirm;
