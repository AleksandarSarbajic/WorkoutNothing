import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
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

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  name,
  text,
}: {
  resourceName: string;
  onConfirm: () => void;
  disabled?: boolean;
  onCloseModal?: () => void;
  name?: string;
  text?: string;
}) {
  const equalation = resourceName !== "Cancel Workout?";
  return (
    <StyledConfirmDelete>
      <Heading as="h3">{resourceName}</Heading>
      {!text && (
        <p>
          {equalation
            ? ` This removes '${name}' and all of its sets from your workout. You cannot undo this action.`
            : "Are you sure you want to cancel this workout? This cannot be undone"}
        </p>
      )}
      {text && <p>{text}</p>}
      <div>
        <Button
          $variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          {equalation ? "  Cancel" : "Resume"}
        </Button>
        <Button $variation="danger" disabled={disabled} onClick={onConfirm}>
          {equalation ? "Delete" : "Cancel Workout"}
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
