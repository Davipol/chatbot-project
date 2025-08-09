import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(request) {
  try {
    const { message } = await request.json();

    const response = await openai.responses.create({
      model: "gpt-5",
      input: message,
    });

    return new Response(JSON.stringify({ reply: response.output_text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("OpenAI API error:", error);

    return new Response(
      JSON.stringify({ error: "OpenAI API request failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
