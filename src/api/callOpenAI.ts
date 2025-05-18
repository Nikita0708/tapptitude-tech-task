import axios from "axios";
import type { IRecipe } from "../types/Recipe";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export async function callOpenAI(prompt: string, apiKey: string) {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful cooking assistant that generates recipe suggestions. Return recipes in JSON format.",
          },
          {
            role: "user",
            content: `Generate 5 recipe suggestions for "${prompt}". For each recipe include: name, cookTime (in minutes), ingredients (list), and detailed instructions (list). Format the response as a valid JSON array.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
        response_format: { type: "json_object" },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const content = response.data.choices[0].message.content;
    const parsed = JSON.parse(content);

    return parsed.recipes.map((recipe: IRecipe, index: string) => ({
      id: `recipe-${Date.now()}-${index}`,
      name: recipe.name,
      cookTime: recipe.cookTime,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      isFavorite: false,
    }));
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to generate recipes");
  }
}
