import { makeAutoObservable, runInAction } from "mobx";
import { fetchEmoji } from "../utils/emojiApi";

class GameStore {
  isLoading = false;
  emojis: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async loadEmoji() {
    try {
      const emojis = await fetchEmoji();

      runInAction(() => {
        this.emojis = Object.values(emojis).slice(0, 10) as string[];

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
