import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { getParamsArray } from "../utils/helpers";

const Button = styled.button<{ $selected: boolean }>`
  font-size: 1.4rem;
  background-color: var(--color-grey-200);
  padding: 0.6rem 1.5rem;
  border-radius: var(--border-radius-xlg);
  color: var(--primary-color--dark--1);
  margin: 0 1rem 1rem 0;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: var(--color-grey-300);
  }
  ${(props) =>
    props.$selected &&
    css`
      background-color: var(--color-grey-700);
      color: var(--color-grey-50);
      &:hover {
        background-color: var(--color-grey-900);
      }
    `}
`;

interface FilterItemProps {
  value: string;
  label: string;
  type?: string;
}

function FilterItem({ value, label, type }: FilterItemProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParamsArray = getParamsArray(
    searchParams.get("category") || ""
  );
  const bodyParamsArray = getParamsArray(searchParams.get("body") || "");

  const updateParams = (paramType: string) => {
    const paramArray =
      paramType === "body" ? bodyParamsArray : categoryParamsArray;

    if (paramArray.includes(value)) {
      const newParamArray = paramArray.filter((item) => item !== value);
      searchParams.set(paramType, newParamArray.join(","));

      if (newParamArray.length === 1) {
        searchParams.delete(paramType);
      }
    } else {
      searchParams.set(paramType, [...paramArray, value].join(","));
    }

    setSearchParams(searchParams);
  };

  const onClickHandler = () => {
    if (type === "body") {
      updateParams("body");
    } else if (type === "category") {
      updateParams("category");
    }
  };

  const isSelected =
    bodyParamsArray.includes(value) || categoryParamsArray.includes(value);

  return (
    <Button $selected={isSelected} onClick={onClickHandler}>
      {label}
    </Button>
  );
}

export default FilterItem;
