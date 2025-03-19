import { useEffect } from "react";
import gameStore from "../../stores/gameStore";
import Card from "../Card/Card";
import "./GameBoard.scss";
import { observer } from "mobx-react-lite";
import NavbarBoard from "../NavbarBoard/NavbarBoard";

const GameBoard = observer(() => {
  useEffect(() => {
    gameStore.loadEmoji();
  }, []);

  return (
    <>
      <NavbarBoard />
      <div className="board">
        {gameStore.emojis.map((emoji, index) => (
          <Card key={index} image={emoji} index={index} />
        ))}
      </div>
    </>
  );
});

export default GameBoard;
