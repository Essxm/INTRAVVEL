import { GoogleGenAI, Type } from "@google/genai";
import { Destination } from "../types";

// Initialize Gemini API Client
// NOTE: In a real production app, these calls should likely go through a backend proxy.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const getAIRecommendations = async (query: string): Promise<Destination[]> => {
  if (!apiKey) {
    console.warn("No API Key found for Gemini.");
    return [];
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Suggest 3 travel destinations based on this request: "${query}". 
      Return a JSON array. 
      Each item must have: id (string), name (city), country, price (number, rough estimate in USD), rating (number 1-5), reviewsCount (number), tags (array of strings), description (short string).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              country: { type: Type.STRING },
              price: { type: Type.NUMBER },
              rating: { type: Type.NUMBER },
              reviewsCount: { type: Type.INTEGER },
              tags: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              description: { type: Type.STRING }
            },
            required: ["id", "name", "country", "price", "rating", "description"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    const data = JSON.parse(text) as Destination[];
    
    // Enrich with placeholder images since AI doesn't return real image URLs
    return data.map((dest, index) => ({
      ...dest,
      image: `https://picsum.photos/800/600?random=${index + 100}`
    }));

  } catch (error) {
    console.error("Error fetching AI recommendations:", error);
    return [];
  }
};