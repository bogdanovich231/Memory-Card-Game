import { makeAutoObservable, runInAction } from "mobx";
import { fetchEmoji } from "../utils/emojiApi";
import { getRandomEmojis } from "../utils/RandomEmojis/RandomEmojis";

class GameStore {
  isLoading = false;
  emojis: string[] = [];
  flippedCards: boolean[] = [];
  matchedCards: boolean[] = [];
  firstCardIndex: number | null = null;
  secondCardIndex: number | null = null;
  isComparing = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleFlip(index: number) {
    const { isFlipped, isMatched, isComparing } = this.getCardState(index);
    if (isFlipped || isMatched || isComparing) return;

    if (this.firstCardIndex === null) {
      this.firstCardIndex = index;
      this.flippedCards[index] = true;
    } else {
      this.compareCards(index);
    }
  }

  private getCardState(index: number) {
    return {
      isFlipped: this.flippedCards[index],
      isMatched: this.matchedCards[index],
      isComparing: this.isComparing,
    };
  }

  private compareCards(index: number) {
    this.flippedCards[index] = true;
    this.isComparing = true;

    const firstIndex: number = this.firstCardIndex!;

    if (this.emojis[firstIndex] === this.emojis[index]) {
      this.matchCards(firstIndex, index);
    } else {
      this.hideCardsAfterDelay(firstIndex, index);
    }

    this.firstCardIndex = null;
  }

  private matchCards(firstIndex: number, secondIndex: number) {
    this.matchedCards[firstIndex] = true;
    this.matchedCards[secondIndex] = true;
    this.isComparing = false;
  }

  private hideCardsAfterDelay(firstIndex: number, secondIndex: number) {
    setTimeout(() => {
      runInAction(() => {
        this.flippedCards[firstIndex] = false;
        this.flippedCards[secondIndex] = false;
        this.isComparing = false;
      });
    }, 500);
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
