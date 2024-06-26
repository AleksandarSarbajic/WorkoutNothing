import { useState } from "react";
import Form from "./Form";
import FormRow from "./FormRow";
import Input from "./Input";
import Button from "./Button";
import styled from "styled-components";
import { useSettings } from "../features/settings/useSettings";
import Table from "./Table";
import { ONE_RM_CALCULATION } from "../utils/constants";
import CalculatorRow from "./CalculatorRow";
import { oneRepMax } from "../utils/helpers";

const StyledSelect = styled.select<{ $type?: string }>`
  width: 10rem;

  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.85rem 1.2rem;
  box-shadow: var(--shadow-sm);
  @media only screen and (max-width: 27.5em) {
    width: 100%;
  }
`;

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
  label {
    width: 25%;
    min-width: 9rem;
    font-weight: 500;
  }
  input {
    width: 30rem;
  }

  @media only screen and (max-width: 50em) {
    gap: 2rem;
    input {
      width: 20rem;
    }
  }
  @media only screen and (max-width: 27.5em) {
    input {
      width: 100%;
      margin-bottom: 1rem;
    }
    div {
      width: 100%;
    }
  }
`;

function Calculator() {
  const [data, setData] = useState(ONE_RM_CALCULATION);
  const { settings } = useSettings();
  const [lift, setLift] = useState("");
  const [unit, setUnit] = useState(settings?.weight || "kg");
  const [repetitions, setRepetitions] = useState(1);

  const oneRepMaxes = ONE_RM_CALCULATION.map(
    (item: { repetitions: number; percentage: number }, i: number) => {
      const oneRm =
        Math.round((oneRepMax(+lift, repetitions) ?? 0) * item.percentage) /
        100;
      return {
        repetitions: i + 1,
        weight: oneRm,
        percentage: item.percentage,
        unit: unit,
      };
    }
  );

  return (
    <div>
      <Form
        style={{ margin: "2rem 0", position: "relative" }}
        onSubmit={(e) => {
          e.preventDefault();
          setData(oneRepMaxes);
        }}
      >
        <StyledBox>
          <label htmlFor="lift">Lift</label>
          <div>
            <Input
              value={lift}
              type="number"
              onChange={(e) => setLift(e.target.value)}
              id="lift"
              required
            />
            <StyledSelect
              defaultValue={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </StyledSelect>
          </div>
        </StyledBox>

        <StyledBox>
          <label htmlFor="repetitions">Repetitions</label>
          <Input
            value={repetitions}
            type="number"
            onChange={(e) => setRepetitions(+e.target.value)}
            id="repetitions"
            min={1}
            required
          />
        </StyledBox>
        <FormRow buttons={true}>
          <Button $variation="secondary">Cancel</Button>
          <Button>Calculate One Rep Max</Button>
        </FormRow>
      </Form>
      <Table columns="2fr 2fr 1.5fr ">
        <Table.Header>
          <div>Repetitions</div>
          <div>Lifted Weight</div>
          <div>Percentage of 1RM</div>
        </Table.Header>

        <Table.Body
          data={data}
          render={(item, i) => (
            <CalculatorRow
              key={i}
              repetition={i + 1}
              item={
                item as {
                  percentage: number;
                  repetitions: number;
                  weight: number;
                  unit: string;
                }
              }
            />
          )}
        />
      </Table>
    </div>
  );
}

export default Calculator;
