import { useEffect } from "react";
import gameStore from "../../stores/gameStore";
import Card from "../Card/Card";
import "./GameBoard.scss";
import { observer } from "mobx-react-lite";
import NavbarBoard from "../NavbarBoard/NavbarBoard";
import ModalWindow from "../ModalWindow/ModalWindow";
import { useNavigate, useParams } from "react-router-dom";

const GameBoard = observer(() => {
  const { level } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (level) {
      const levelId = parseInt(level);
      gameStore.setCurrentLevel(levelId);
      gameStore.loadEmoji(levelId);
    }
  }, [level]);

  const handleNextLevel = () => {
    if (level) {
      const nextLevel = parseInt(level) + 1;
      if (nextLevel <= 4) {
        navigate(`/game-board/${nextLevel}`);
      } else {
        navigate(`/`);
      }
      gameStore.closeModalWindow();
    }
  };

  return (
    <>
      <NavbarBoard levelGame={level ? parseInt(level) : 0} />
      <div className="board">
        {gameStore.emojis.map((emoji, index) => (
          <Card key={index} image={emoji} index={index} />
        ))}
      </div>
      {gameStore.isModalOpen && (
        <ModalWindow
          isOpen={gameStore.isModalOpen}
          nextLevel={handleNextLevel}
        />
      )}
    </>
  );
});

export default GameBoard;
