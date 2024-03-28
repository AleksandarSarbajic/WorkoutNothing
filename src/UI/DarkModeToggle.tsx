import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode} id="darkModeButton">
      {isDarkMode ? (
        <HiOutlineSun id="darkModeIcon" />
      ) : (
        <HiOutlineMoon id="darkModeIcon" />
      )}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
