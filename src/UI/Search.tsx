import { useEffect, useRef, useState } from "react";
import { HiOutlineMagnifyingGlass, HiXMark } from "react-icons/hi2";
import styled, { css } from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useSearchParams } from "react-router-dom";

interface SearchProps {
  $isOpen?: boolean;
  $length?: boolean;
}

const StyledContainer = styled.div`
  position: relative;
`;
const StyledSearch = styled.input<SearchProps>`
  padding: 0.7rem 3.4rem 0.7rem 4.4rem;
  opacity: 1;
  width: 25rem;

  border: none;

  border-radius: 1.8rem;
  box-shadow: var(--shadow-sm);
  color: var(--color-grey-750);
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

const StyledButton = styled.button<SearchProps>`
  position: absolute;
  top: 0.7rem;
  left: 1rem;

  z-index: 5;
  width: 2.4rem;
  height: 2.4rem;
  & svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;
const StyledCancel = styled.button<SearchProps>`
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  z-index: 2;
  width: 2.4rem;
  height: 2.4rem;
  display: none;
  transition: all 0.3s;
  & svg {
    width: 2.4rem;
    height: 2.4rem;
  }
  &:hover {
    color: var(--color-red-700);
  }
  ${(props) =>
    props.$length &&
    css`
      display: block;
    `}
`;

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const clear = () => setSearchQuery("");

  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(true));
  const searchInputRef = useRef<HTMLInputElement>(null);

  function deleteQuery() {
    searchParams.delete("search");
    setSearchParams(searchParams);
  }

  function handleFocus() {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }

  const handleButtonClick = () => {
    setIsOpen((cur) => !cur);
    handleFocus();
  };

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
    if (event.target.value === "") {
      deleteQuery();
    } else {
      searchParams.set("search", event.target.value);
      setSearchParams(searchParams);
    }
  }

  useEffect(() => {
    deleteQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledContainer ref={ref}>
      <StyledSearch
        ref={searchInputRef}
        $isOpen={isOpen}
        onChange={onChangeHandler}
        value={searchQuery}
      />
      <StyledButton
        onClick={handleButtonClick}
        $isOpen={isOpen}
        disabled={isOpen}
      >
        <HiOutlineMagnifyingGlass />
      </StyledButton>
      <StyledCancel
        $length={searchQuery.length > 0}
        onClick={() => {
          handleFocus();
          deleteQuery();
          clear();
          if (searchInputRef.current) {
            searchInputRef.current.blur();
            setIsOpen(false);
          }
        }}
      >
        <HiXMark />
      </StyledCancel>
    </StyledContainer>
  );
}

export default Search;
