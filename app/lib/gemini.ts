import { GoogleGenAI } from "@google/genai";
import { PrismaClient, KnowledgeBase } from "@/app/generated/prisma";

const prisma = new PrismaClient();
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

async function fetchContentFromURL(url: string): Promise<string> {
  // Placeholder for fetching and parsing content from a URL
  console.log(`Fetching content from ${url}`);
  // In a real implementation, you'd fetch the URL and extract the main content.
  // For now, we'll return a dummy string.
  return "This is dummy content from a URL.";
}

export async function analyzeWithGemini(
  knowledgeBaseItem: KnowledgeBase
): Promise<void> {
  await prisma.knowledgeBase.update({
    where: { id: knowledgeBaseItem.id },
    data: { status: "PROCESSING" },
  });

  try {
    let sourceContent: string;

    switch (knowledgeBaseItem.sourceType) {
      case "URL":
        sourceContent = await fetchContentFromURL(knowledgeBaseItem.source);
        break;
      // Add cases for YOUTUBE and FILE later
      default:
        throw new Error(
          `Unsupported source type: ${knowledgeBaseItem.sourceType}`
        );
    }

    const prompt = `Please provide a semi-detailed analysis and breakdown of the following content. Structure your response as a JSON object with a single key, "analysis," which should be an array of objects. Each object in the array should represent a topic and have two properties: "heading" (a string for the topic's title or a question) and "details" (a string containing the detailed breakdown of that topic). Important: Only return the JSON object, without any markdown formatting like \`\`\`json.

    Content to analyze:
    ${sourceContent}`;

    const result = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ parts: [{ text: prompt }] }],
    });

    const responseText = result.text;
    if (!responseText) {
      throw new Error("Received an empty response from the API.");
    }

    const jsonResponse = JSON.parse(responseText);

    await prisma.knowledgeBase.update({
      where: { id: knowledgeBaseItem.id },
      data: {
        content: jsonResponse,
        status: "COMPLETED",
      },
    });
  } catch (error) {
    console.error(
      `Failed to analyze and update knowledge base item ${knowledgeBaseItem.id}:`,
      error
    );
    await prisma.knowledgeBase.update({
      where: { id: knowledgeBaseItem.id },
      data: { status: "FAILED" },
    });
  }
}
