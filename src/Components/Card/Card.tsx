import "./Card.scss";
import ICard from "../../utils/interfaces/card";
import { observer } from "mobx-react-lite";
import gameStore from "../../stores/gameStore";

const Card = observer(({ image, index }: ICard) => {
  const isFlipped = gameStore.flippedCards[index];
  const isMatched = gameStore.matchedCards[index];

  return (
    <div className="card-container">
      <button
        className={`card ${isFlipped ? "active" : ""}`}
        onClick={() => gameStore.toggleFlip(index)}
        disabled={isMatched || gameStore.isComparing}
      >
        <div className="card-front"></div>
        <div className="card-back">
          <img src={image} alt="emoji" />
        </div>
      </button>
    </div>
  );
});

export default Card;
