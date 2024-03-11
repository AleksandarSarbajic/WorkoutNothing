import styled from "styled-components";
import Heading from "./Heading";

import Templates, { TemplateTypes } from "../types/TemplateTypes";
import { useNavigate } from "react-router-dom";
import { LiaDumbbellSolid } from "react-icons/lia";

const StyledContainer = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 40%;
  @media only screen and (max-width: 68.75em) {
    width: 100%;
  }
`;

const StyledLink = styled.li`
  cursor: pointer;

  padding: 0.8rem 1rem;
  margin-left: -1rem;
  border-bottom: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
  &:hover {
    background-color: var(--color-grey-100);
  }
`;

function QuickWorkouts({ templates }: { templates: TemplateTypes[] }) {
  const navigate = useNavigate();
  return (
    <StyledContainer>
      <Heading as={"h2"}>
        <LiaDumbbellSolid /> Quick Workouts
      </Heading>
      <ul>
        {templates && templates?.length > 0 && (
          <>
            {templates?.map((template) => (
              <StyledLink
                key={template.id}
                onClick={() =>
                  navigate(`/workout/${template.id}?sample=custom`)
                }
              >
                {template.name}
              </StyledLink>
            ))}
          </>
        )}
        {templates && templates?.length === 0 && (
          <>
            {Templates?.map((template) => (
              <StyledLink
                key={template.id}
                onClick={() =>
                  navigate(`/workout/${template.id}?sample=sample`)
                }
              >
                {template.name}
              </StyledLink>
            ))}
          </>
        )}
      </ul>
    </StyledContainer>
  );
}

export default QuickWorkouts;
