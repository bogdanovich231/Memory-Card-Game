import { observer } from "mobx-react-lite";
import "./NavbarBoard.scss";
import gameStore from "../../stores/gameStore";
import { formatTime } from "../../utils/formatTime/formatTime";

const NavbarBoard = observer(({ levelGame }: { levelGame: number }) => {
  const timeElapsed = gameStore.timeElapsed;
  const formattedTime = formatTime(timeElapsed);
  return (
    <div className="navbar">
      <div className="navbar-level">
        <h4>Level {levelGame}</h4>
      </div>
      <div className="navbar-timer">
        <h4>{formattedTime}</h4>
      </div>
    </div>
  );
});

export default NavbarBoard;
