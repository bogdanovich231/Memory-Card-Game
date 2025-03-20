import { useNavigate } from "react-router-dom";
import { ICardLevel } from "../../utils/interfaces/cardLevel";
import "./CardLevel.scss";
import gameStore from "../../stores/gameStore";
import { observer } from "mobx-react-lite";

const CardLevel = observer(({ id, level, cards }: ICardLevel) => {
  const navigate = useNavigate();
  const isCompleted = gameStore.isLevelCompleted(id);

  const handleLevelClick = () => {
    gameStore.setCurrentLevel(id);
    navigate(`/game-board/${id}`);
  };

  return (
    <div className={`level-card ${isCompleted ? "completed" : ""}`}>
      <div className="level-card_content">
        <div className="level-card_number">
          <h2>{id}</h2>
        </div>
        <div className="level-card_content-info">
          <h4>{level}</h4>
          <p>Cards: {cards}</p>
        </div>
      </div>
      <button className="level-card_button" onClick={handleLevelClick}></button>
    </div>
  );
});

export default CardLevel;
