import { useEffect } from "react";
import gameStore from "../../stores/gameStore";
import Card from "../Card/Card";
import "./GameBoard.scss";
import { observer } from "mobx-react-lite";
import NavbarBoard from "../NavbarBoard/NavbarBoard";
import ModalWindow from "../ModalWindow/ModalWindow";
import { useParams } from "react-router-dom";

const GameBoard = observer(() => {
  const { level } = useParams();

  useEffect(() => {
    if (level) {
      gameStore.loadEmoji(parseInt(level));
    }
  }, [level]);

  const handleNextLevel = () => {};

  return (
    <>
      <NavbarBoard levelGame={level ? parseInt(level) : 0} />
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
