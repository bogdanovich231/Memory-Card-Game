const API_URL = "https://api.github.com/emojis";
const API_TOKEN = import.meta.env.VITE_TOKEN;

export const fetchEmoji = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (e) {
    console.error("Error during fetch data", e);
  }
};
