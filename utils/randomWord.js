export const randomWord = async () => {
  try {
    const result = await fetch(
      "https://random-word-api.vercel.app/api?words=1&type=capitalized"
    );
    const data = await result.json();
    console.log("Random word", data[0]);
    return data[0];
  } catch (error) {
    console.error("Failed to fetch random word", error);
    return null;
  }
};
