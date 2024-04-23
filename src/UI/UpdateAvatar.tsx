import styled from "styled-components";
import Button from "./Button";
import { useRef } from "react";
import { useUpdateAvatar } from "../features/auth/useUpdateAvatar";
import { useDeleteAvatar } from "../features/auth/useDeleteAvatar";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem 0;

  border-bottom: 1px solid var(--color-grey-100);

  img {
    border-radius: 50%;
    width: 15rem;
    height: 15rem;
    object-fit: cover;
    margin: 1rem 0;
  }

  @media only screen and (max-width: 50em) {
    flex-direction: column;
    align-items: flex-start;

    img {
      margin: 2.4rem 0;
    }
  }
`;

const StyledBox = styled.div`
  margin-right: 7rem;
  & h3 {
    font-size: 2rem;
  }
  p {
    opacity: 0.5;
    margin: 0.5rem 0 2rem;
  }
`;

interface Update {
  avatar?: File;
}

function UpdateAvatar({ avatar }: { avatar: string }) {
  const { updateAvatar } = useUpdateAvatar();
  const { deleteAvatar } = useDeleteAvatar();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const updateObject: Update = {
        avatar: selectedFile,
      };
      updateAvatar(updateObject);
    }
  };

  function handleDelete() {
    deleteAvatar();
  }

  return (
    <Container>
      <StyledBox>
        <h3>Profile Photo</h3>
        <p>Recommended 300x300</p>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*"
        />
        <Button
          $variation="secondary"
          $size="medium"
          style={{ marginRight: "2rem" }}
          onClick={handleImageClick}
        >
          Change
        </Button>
        <Button $variation="danger" $size="medium" onClick={handleDelete}>
          Remove
        </Button>
      </StyledBox>
      <div>
        <img src={avatar || "/default-user.jpg"} alt="Avatar" />
      </div>
    </Container>
  );
}

export default UpdateAvatar;
