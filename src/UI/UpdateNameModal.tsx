import { useState } from "react";
import Heading from "./Heading";
import Input from "./Input";
import Button from "./Button";
import styled from "styled-components";
interface UpdateNameModalProps {
  handler: (name: string) => void;
  heading: string;
  onCloseModal?: () => void;
  nameToBeUpdated: string;
  isLoading?: boolean;
}

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 3rem;
  gap: 2.4rem;
`;

function UpdateNameModal({
  handler,
  heading,
  nameToBeUpdated,
  onCloseModal,
  isLoading = false,
}: UpdateNameModalProps) {
  const [name, setName] = useState(nameToBeUpdated);

  return (
    <div>
      <Heading as="h2" style={{ marginBottom: "3rem" }}>
        Update {heading} Name
      </Heading>
      <div>
        <Input
          style={{ width: "90%" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <ButtonRow>
        <Button
          $variation="secondary"
          onClick={() => {
            if (onCloseModal) {
              onCloseModal();
            }
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => {
            handler(name);
            if (onCloseModal) {
              onCloseModal();
            }
          }}
        >
          Rename
        </Button>
      </ButtonRow>
    </div>
  );
}

export default UpdateNameModal;
