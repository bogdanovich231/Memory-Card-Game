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

  constructor() {
    makeAutoObservable(this);
  }

  toggleFlip(index: number) {
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

      console.log("Uploaded emoji:", this.emojis);
    } catch (error) {
      console.error("Error loading emoji:", error);
      this.isLoading = false;
    }
  }
}

export default new GameStore();
