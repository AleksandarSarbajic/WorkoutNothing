import styled from "styled-components";
import { useOuthLogin } from "../features/auth/useOuthLogin";
import { Provider } from "@supabase/supabase-js";

const StyledProviderItem = styled.button`
  display: flex;
  align-items: center;

  gap: 2rem;
  padding: 0.8rem 6.4rem;
  width: 100%;

  color: #161317;
  text-align: center;
  text-decoration: none;
  cursor: pointer;

  user-select: none;
  background-color: transparent;
  border: 1px solid #161317;
  border-radius: 50rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    background-color: #161317;
    color: #fff;
  }
`;
const StyledIconBox = styled.div`
  padding-left: 1.6rem;
  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

function ProviderItem({
  icon,
  provider,
  text,
}: {
  icon: React.ReactElement;
  provider: string;
  text: string;
}) {
  const { login, isPending } = useOuthLogin();

  function onOuthLoginHandler() {
    const convertedProvider: Provider = provider as Provider;

    login({ provider: convertedProvider });
  }

  return (
    <StyledProviderItem
      type="button"
      onClick={onOuthLoginHandler}
      disabled={isPending}
    >
      <StyledIconBox>{icon}</StyledIconBox>
      <span>{text}</span>
    </StyledProviderItem>
  );
}

export default ProviderItem;
