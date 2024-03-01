import styled from "styled-components";
import Heading from "./Heading";

const StyledList = styled.ol`
  /* list-style-type: armenian; */
  li {
    font-size: 1.8rem;
    margin: 0 0 1rem 2rem;
    list-style-type: decimal;
  }
`;

function ExerciseAbout({ instructions }: { instructions?: string }) {
  const instructionsArray = instructions?.split(".").slice(0, -1);

  return (
    <div>
      <Heading as={"h1"} style={{ margin: "3rem 0 5rem 0" }}>
        Instructions
      </Heading>
      <StyledList>
        {instructionsArray?.map((instruction, index) => (
          <li key={index}>{instruction}.</li>
        ))}
      </StyledList>
    </div>
  );
}

export default ExerciseAbout;
