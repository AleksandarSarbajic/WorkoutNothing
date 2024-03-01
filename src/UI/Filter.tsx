import styled from "styled-components";
import Modal from "../context/Modal";
import Button from "./Button";
import FilterItem from "./FilterItem";
import Heading from "./Heading";
import useExercises from "../features/exercises/useExercises";
import useFilter from "../hooks/useFilter";

interface FilterProps {
  bodyFilter: { label: string; value: string; type: string }[];
  categoryFilter: { label: string; value: string; type: string }[];
}

const StyledFilterBox = styled.div`
  margin: 2rem 0;
`;

function Filter({ bodyFilter, categoryFilter }: FilterProps) {
  const { filter, numOfFilters, deleteParams } = useFilter({
    filterProps: {
      fields: ["muscle", "equipment"],
      method: "in",
      params: ["category", "body"],
    },
  });

  const { exercises = [] } = useExercises({ filter });

  return (
    <Modal>
      <Modal.Open opens="filter">
        <Button $size="smallMedium" $variation="primary">
          {numOfFilters === 0 ? "Filter" : `Filter : ${numOfFilters}`}
        </Button>
      </Modal.Open>
      <Modal.Window name="filter">
        <>
          <Heading as={"h1"}>Filter : {exercises.length}</Heading>
          <>
            <Heading as={"h3"} style={{ marginTop: "2.4rem" }}>
              Body part
            </Heading>
            <StyledFilterBox>
              {bodyFilter.map((item) => (
                <FilterItem
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  type={item.type}
                />
              ))}
            </StyledFilterBox>
          </>
          <>
            <Heading as={"h3"} style={{ marginTop: "2.4rem" }}>
              Category
            </Heading>
            <StyledFilterBox>
              {categoryFilter.map((item) => (
                <FilterItem
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  type={item.type}
                />
              ))}
            </StyledFilterBox>
          </>
          <Button
            $size="medium"
            $variation="primary"
            onClick={deleteParams}
            disabled={numOfFilters === 0}
          >
            Delete All Filters
          </Button>
        </>
      </Modal.Window>
    </Modal>
  );
}

export default Filter;
