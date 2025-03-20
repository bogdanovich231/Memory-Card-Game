import { makeAutoObservable, runInAction } from "mobx";
import { fetchEmoji } from "../utils/emojiApi";
import { getRandomEmojis } from "../utils/RandomEmojis/RandomEmojis";
import { toggleFlip } from "./GameLogic";

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
  }

  toggleFlip(index: number) {
    this.attempts += 1;
    toggleFlip(index);
  }

  async loadEmoji() {
    try {
      const emojis = await fetchEmoji();
      const emojiList: string[] = Object.values(emojis);

      runInAction(() => {
        this.emojis = getRandomEmojis(emojiList, 6);
        this.flippedCards = new Array(this.emojis.length).fill(false);
        this.matchedCards = new Array(this.emojis.length).fill(false);
        this.isLoading = false;
      });

      this.startTimer();
      console.log("Uploaded emoji:", this.emojis);
    } catch (error) {
      console.error("Error loading emoji:", error);
      this.isLoading = false;
    }
  }
}

export default new GameStore();
