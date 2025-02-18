import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

export const generateSummary = async (description) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "system", content: `Summarize this tender:\n${description}` }],
    });
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("LLM Error:", error);
    return "Error generating summary.";
  }
};
