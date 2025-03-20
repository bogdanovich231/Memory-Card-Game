import { makeAutoObservable, runInAction } from "mobx";
import { fetchEmoji } from "../utils/emojiApi";
import { getRandomEmojis } from "../utils/RandomEmojis/RandomEmojis";
import { toggleFlip } from "./GameLogic";
import {
  loadResultFromLocalStorage,
  saveResultToLocalStorage,
} from "./saveResult";
import { dataLevels } from "../utils/dataLevels/dataLevels";

class GameStore {
  isLoading = false;
  emojis: string[] = [];
  flippedCards: boolean[] = [];
  matchedCards: boolean[] = [];
  firstCardIndex: number | null = null;
  isComparing = false;
  timeElapsed = 0;
  timerId: NodeJS.Timeout | null = null;
  gameFinished = false;
  attempts = 0;

  constructor() {
    makeAutoObservable(this);
    this.startTimer();
    this.loadResults();
  }

  startTimer() {
    this.stopTimer();
    this.timeElapsed = 0;

    this.timerId = setInterval(() => {
      runInAction(() => {
        this.timeElapsed += 1;
      });
    }, 1000);
  }

  stopTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  finishGame() {
    this.stopTimer();
    this.gameFinished = true;
    this.saveResults();
  }

  toggleFlip(index: number) {
    toggleFlip(index);
  }

  saveResults() {
    saveResultToLocalStorage(this.timeElapsed, this.attempts);
  }

  loadResults() {
    const savedResults = loadResultFromLocalStorage();

    if (savedResults && Array.isArray(savedResults)) {
      if (savedResults.length > 0) {
        const lastResult = savedResults[savedResults.length - 1];
        this.timeElapsed = lastResult.time;
        this.attempts = 0;
      }
    } else {
      localStorage.setItem("gameResults", JSON.stringify([]));
    }
  }

  async loadEmoji(level: number) {
    try {
      const emojis = await fetchEmoji();
      const emojiList: string[] = Object.values(emojis);
      const levelData = this.getLevel(level);
      const pairsCount = levelData ? levelData.cards : 4;

      runInAction(() => {
        this.emojis = getRandomEmojis(emojiList, pairsCount);
        this.flippedCards = new Array(this.emojis.length).fill(false);
        this.matchedCards = new Array(this.emojis.length).fill(false);
        this.isLoading = false;
      });

      this.startTimer();
    } catch (error) {
      console.error("Error loading emoji:", error);
      this.isLoading = false;
    }
  }
  getLevel(level: number) {
    return dataLevels.find((l) => l.id === level);
  }
}

export default new GameStore();
