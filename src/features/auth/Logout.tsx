import { HiArrowRightOnRectangle } from "react-icons/hi2";

import useLogOut from "./useLogOut";
import ButtonIcon from "../../UI/ButtonIcon";
import SpinnerMini from "../../UI/SpinnerMini";

function Logout() {
  const { logout, isPending } = useLogOut();

  return (
    <ButtonIcon disabled={isPending} onClick={() => logout()}>
      {!isPending ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
