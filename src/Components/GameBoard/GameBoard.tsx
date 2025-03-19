import { useEffect } from "react";
import gameStore from "../../stores/gameStore";
import Card from "../Card/Card";
import "./GameBoard.scss";
import { observer } from "mobx-react-lite";

const GameBoard = observer(() => {
  useEffect(() => {
    gameStore.loadEmoji();
  }, []);

  return (
    <div className="board">
      {gameStore.emojis.map((emoji, index) => (
        <Card key={index} image={emoji} />
      ))}
    </div>
  );
});

export default GameBoard;
