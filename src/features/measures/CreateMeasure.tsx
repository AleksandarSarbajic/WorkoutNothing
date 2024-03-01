import styled from "styled-components";
import Heading from "../../UI/Heading";
import Modal from "../../context/Modal";
import { HiOutlinePlus } from "react-icons/hi2";
import CreateMeasureModal from "./CreateMeasureModal";
import { useSearchParams } from "react-router-dom";

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5.6rem 0 3rem;
`;

const StyledButton = styled.button`
  border-radius: var(--border-radius-sm);
  padding: 0.1rem;

  & svg {
    width: 3rem;
    height: 3rem;
    transition: color 0.3s;
  }

  &:hover {
    background-color: var(--color-grey-200);
    color: var(--color-grey-900);
  }
`;

function CreateMeasure() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <StyledBox>
      <Heading as="h1">History</Heading>

      <Modal.Open
        opens="measure"
        withOpens={() => {
          searchParams.delete("update");
          setSearchParams(searchParams);
        }}
      >
        <StyledButton>
          <HiOutlinePlus />
        </StyledButton>
      </Modal.Open>
      <Modal.Window name="measure">
        <CreateMeasureModal onCloseModal={() => {}} />
      </Modal.Window>
    </StyledBox>
  );
}

export default CreateMeasure;
