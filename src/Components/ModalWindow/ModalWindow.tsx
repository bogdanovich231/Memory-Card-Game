import { observer } from "mobx-react-lite";
import gameStore from "../../stores/gameStore";
import "./ModalWindow.scss";
import { formatTime } from "../../utils/formatTime/formatTime";
import { IModalWindowProps } from "../../utils/interfaces/modalWindow";

const ModalWindow = observer(({ isOpen, nextLevel }: IModalWindowProps) => {
  const timeElapsed = gameStore.timeElapsed;
  const attempts = gameStore.attempts;
  const formattedTime = formatTime(timeElapsed);

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h3>You're a great player!</h3>
        <ul className="modal-list">
          <li>Number of attempts: {attempts} </li>
          <li>Your passing time: {formattedTime}</li>
        </ul>
        <button className="modal-next" onClick={nextLevel}>
          Next level
        </button>
      </div>
    </div>
  );
});

export default ModalWindow;
