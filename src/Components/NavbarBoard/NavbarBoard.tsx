import { observer } from "mobx-react-lite";
import "./NavbarBoard.scss";
import gameStore from "../../stores/gameStore";

const NavbarBoard = observer(() => {
  const timeElapsed = gameStore.timeElapsed;
  const hours = Math.floor(timeElapsed / 3600);
  const minutes = Math.floor((timeElapsed % 3600) / 60);
  const seconds = timeElapsed % 60;

  return (
    <div className="navbar">
      <div className="navbar-level">
        <h4>Level 1</h4>
      </div>
      <div className="navbar-timer">
        <h4>
          {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </h4>
      </div>
    </div>
  );
});

export default NavbarBoard;
