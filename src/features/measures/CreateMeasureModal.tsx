import ReactDatePicker from "react-datepicker";
import Heading from "../../UI/Heading";

import React, { useState } from "react";
import Button from "../../UI/Button";
import styled from "styled-components";
import { useParams, useSearchParams } from "react-router-dom";
import { SingleMeasure, measures } from "../../types/MeasureTableTypes";
import useAddMeasure from "./useAddMeasure";
import useMeasure from "./useMeasure";
import DatePickerInput from "../../UI/DatePickerInput";
import { useSettings } from "../settings/useSettings";
import { adjustMeasurement } from "../../utils/helpers";

// REFACTOR

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledButtonBox = styled.div`
  display: flex;
`;

const StyledInput = styled.input`
  width: 100%;
  background-color: var(--color-grey-200);
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 0.5rem 2rem 0.5rem 1rem;
  margin: 3rem 0;
`;

const StyledUnit = styled.span`
  opacity: 0.5;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
`;

function CreateMeasureModal({ onCloseModal }: { onCloseModal: () => void }) {
  const { settings } = useSettings();
  const { measureId = "" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const updateParams = searchParams.get("update") || "";
  const { measure = {} } = useMeasure();
  const measureItem = measure[
    measureId as keyof typeof measure
  ] as SingleMeasure[];

  const { addMeasure, isPending } = useAddMeasure();

  const [startDate, setStartDate] = useState(new Date());
  const [newValues, setNewValues] = useState<null | number>(
    measureItem.find((item) => item.id === updateParams)?.value || null
  );

  const filteredMeasure = measures.find(
    (item) => item.data_key_pair === measureId
  );

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const measureObject = {
      data_key: measureId,
      data: {
        value: newValues,
        added_at: startDate.toISOString(),
        unit: adjustMeasurement("kg", filteredMeasure?.unit || "kg", settings)
          .unit,
        id: self.crypto.randomUUID(),
      },
    };

    if (updateParams) {
      const filteredOldArray = measureItem.filter(
        (item) => item.id !== updateParams
      );

      addMeasure(
        {
          oldArray: filteredOldArray,
          measureObject,
        },
        {
          onSuccess: () => {
            onCloseModal();
            searchParams.delete("update");
            setSearchParams(searchParams);
          },
        }
      );
    } else {
      addMeasure(
        {
          oldArray: measureItem,
          measureObject,
        },
        { onSuccess: onCloseModal }
      );
    }
  }

  function onDeleteHandler() {
    const oldArray = measureItem.filter((item) => item.id !== updateParams);

    addMeasure(
      {
        oldArray,
        measureObject: { data_key: measureId },
      },
      {
        onSuccess: () => {
          onCloseModal();
          searchParams.delete("update");
          setSearchParams(searchParams);
        },
      }
    );
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <StyledBox>
        <Heading as={"h2"} style={{ textTransform: "capitalize" }}>
          {measureId?.replace(/_/g, " ")}
        </Heading>
        <div>
          <ReactDatePicker
            dateFormat={"EEEE, MMMM dd yyyy"}
            selected={startDate}
            onChange={(date) => setStartDate(date as Date)}
            id="date-picker"
            formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 3)}
            customInput={<DatePickerInput />}
          />
        </div>
      </StyledBox>
      <div style={{ position: "relative" }}>
        <StyledUnit>
          {
            adjustMeasurement("kg", filteredMeasure?.unit || "kg", settings)
              .unit
          }
        </StyledUnit>
        <StyledInput
          required
          name="value"
          id="value"
          type="number"
          value={newValues ?? ""}
          onChange={(e) => setNewValues(+e.target.value)}
          min={0}
        />
      </div>
      <StyledButtonBox style={{ textAlign: "right" }}>
        {updateParams && (
          <Button
            $variation="danger"
            $size="medium"
            style={{ marginRight: "2rem" }}
            onClick={onDeleteHandler}
            type="button"
          >
            Delete
          </Button>
        )}
        <div style={{ marginLeft: "auto" }}>
          <Button
            $variation="secondary"
            style={{ marginRight: "2rem" }}
            type="button"
            onClick={() => {
              searchParams.delete("update");
              setSearchParams(searchParams);
              onCloseModal();
            }}
          >
            Close
          </Button>
          <Button $variation="primary" $size="medium" disabled={isPending}>
            Save
          </Button>
        </div>
      </StyledButtonBox>
    </form>
  );
}

export default CreateMeasureModal;
