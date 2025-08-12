import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(request) {
  console.log("API POST route called");
  console.log("OPENROUTER_API_KEY:", process.env.OPENROUTER_API_KEY);
  try {
    const { message } = await request.json();
    console.log("Received message:", message);
    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });

    const reply =
      response.choices?.[0]?.message?.content || "No reply received.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("OpenRouter API error:", error);

    if (error.response) {
      try {
        const errBody = await error.response.json();
        console.error("Error response body:", errBody);
      } catch (_) {}
    }

    if (error.raw) {
      console.error("Raw error from OpenAI SDK:", error.raw);
    }

    if (error.message) {
      console.error("Error message:", error.message);
    }

    return new Response(
      JSON.stringify({
        error: "OpenRouter API request failed",
        details: error.message || JSON.stringify(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
