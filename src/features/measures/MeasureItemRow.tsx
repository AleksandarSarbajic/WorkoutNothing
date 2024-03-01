import { format } from "date-fns";
import { SingleMeasure } from "../../types/MeasureTableTypes";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import Modal from "../../context/Modal";

const MeasureItem = styled.button`
  display: flex;
  justify-content: space-between;
  padding: 0.7rem 1rem;
  margin: 0 -1rem;
  border-radius: var(--border-radius-sm);
  &:hover {
    background-color: var(--color-grey-200);
  }
`;

function MeasureItemRow({ item }: { item: SingleMeasure }) {
  const formattedDate = format(new Date(item.added_at), "MMM dd HH:mm");
  const [searchParmas, setSearchParams] = useSearchParams();
  return (
    <Modal.Open
      opens="measure"
      withOpens={() => {
        searchParmas.set("update", item.id);
        setSearchParams(searchParmas);
      }}
    >
      <MeasureItem>
        <p>{formattedDate || "None"}</p>
        <p>
          {item.value || "none"} {item.unit || ""}
        </p>
      </MeasureItem>
    </Modal.Open>
  );
}

export default MeasureItemRow;
