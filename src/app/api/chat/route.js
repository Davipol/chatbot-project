import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(request) {
  console.log("API POST route called");

  try {
    const { message } = await request.json();
    console.log("Received message:", message);
    const response = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
      messages: [
        {
          role: "system",
          content: `You are an API. You must reply ONLY with valid JSON, no markdown, no text outside JSON, no triple backticks.
Etymology of "${message}" in this format:{
  "modernMeaning": "...",
  "centuryOfOrigin": "...",
  "detailedEtymology": "...",
  "funFact": "..."
}`,
        },
        { role: "user", content: message },
      ],
    });

    let rawContent = response.choices?.[0]?.message?.content || "{}";

    rawContent = rawContent
      .replace(/```(?:json)?\s*([\s\S]*?)\s*```/i, "$1")
      .trim();

    let replyData;
    try {
      replyData = JSON.parse(rawContent);
    } catch (parseError) {
      console.error("Failed to parse model output:", parseError);
      replyData = {
        modernMeaning: null,
        centuryOfOrigin: null,
        detailedEtymology: null,
        funFact: null,
      };
    }

    return new Response(JSON.stringify(replyData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("OpenRouter API error:", error);
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
