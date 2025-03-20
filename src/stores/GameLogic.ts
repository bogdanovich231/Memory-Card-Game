import { runInAction } from "mobx";
import GameStore from "./gameStore";

export function toggleFlip(index: number) {
  const { isFlipped, isMatched, isComparing } = getCardState(index);
  if (isFlipped || isMatched || isComparing) return;

  if (GameStore.firstCardIndex === null) {
    GameStore.firstCardIndex = index;
    GameStore.flippedCards[index] = true;
  } else {
    compareCards(index);
  }
}

function getCardState(index: number) {
  return {
    isFlipped: GameStore.flippedCards[index],
    isMatched: GameStore.matchedCards[index],
    isComparing: GameStore.isComparing,
  };
}

function compareCards(index: number) {
  const firstIndex: number = GameStore.firstCardIndex!;

  GameStore.flippedCards[index] = true;
  GameStore.isComparing = true;

  GameStore.attempts += 1;

  if (GameStore.emojis[firstIndex] === GameStore.emojis[index]) {
    matchCards(firstIndex, index);
  } else {
    hideCardsAfterDelay(firstIndex, index);
  }

  GameStore.firstCardIndex = null;
}

function matchCards(firstIndex: number, secondIndex: number) {
  GameStore.matchedCards[firstIndex] = true;
  GameStore.matchedCards[secondIndex] = true;
  GameStore.isComparing = false;

  if (GameStore.matchedCards.every(Boolean)) {
    GameStore.stopTimer();
    GameStore.finishGame();
  }
}

function hideCardsAfterDelay(firstIndex: number, secondIndex: number) {
  setTimeout(() => {
    runInAction(() => {
      GameStore.flippedCards[firstIndex] = false;
      GameStore.flippedCards[secondIndex] = false;
      GameStore.isComparing = false;
    });
  }, 500);
}
