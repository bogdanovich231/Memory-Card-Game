import { ICardLevel } from "../../utils/interfaces/cardLevel";
import "./CardLevel.scss";

const CardLevel = ({ id, level, cards }: ICardLevel) => {
  return (
    <div className="level-card">
      <div className="level-card_content">
        <div className="level-card_number">
          <h2>{id}</h2>
        </div>
        <div className="level-card_content-info">
          <h4>{level}</h4>
          <p>Cards: {cards}</p>
        </div>
      </div>
      <button className="level-card_button"></button>
    </div>
  );
};

export default CardLevel;
