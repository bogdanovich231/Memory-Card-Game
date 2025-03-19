export const getRandomEmojis = (arr: string[], count: number): string[] => {
  const selected = arr.sort(() => Math.random() - 0.5).slice(0, count);

  const pairs = [...selected, ...selected];

  for (let i = pairs.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = pairs[i];
    pairs[i] = pairs[j];
    pairs[j] = k;
  }

  return pairs;
};
