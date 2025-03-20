import { useEffect } from "react";
import gameStore from "../../stores/gameStore";
import Card from "../Card/Card";
import "./GameBoard.scss";
import { observer } from "mobx-react-lite";
import NavbarBoard from "../NavbarBoard/NavbarBoard";
import ModalWindow from "../ModalWindow/ModalWindow";

const GameBoard = observer(() => {
  useEffect(() => {
    gameStore.loadEmoji();
  }, []);

  const handleNextLevel = () => {};

  return (
    <>
      <NavbarBoard />
      <div className="board">
        {gameStore.emojis.map((emoji, index) => (
          <Card key={index} image={emoji} index={index} />
        ))}
      </div>
      {gameStore.gameFinished && (
        <ModalWindow
          isOpen={gameStore.gameFinished}
          nextLevel={handleNextLevel}
        />
      )}
    </>
  );
});

export default GameBoard;
