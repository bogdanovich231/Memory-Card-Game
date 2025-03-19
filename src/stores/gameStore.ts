import { makeAutoObservable, runInAction } from "mobx";
import { fetchEmoji } from "../utils/emojiApi";
import { getRandomEmojis } from "../utils/RandomEmojis/RandomEmojis";

class GameStore {
  isLoading = false;
  emojis: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async loadEmoji() {
    try {
      const emojis = await fetchEmoji();
      const emojiList: string[] = Object.values(emojis);

      runInAction(() => {
        this.emojis = getRandomEmojis(emojiList, 6);
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
