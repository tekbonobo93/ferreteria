import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PRODUCTS } from '../constants';
import { Product } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Helper to format product catalog for the AI context
const getCatalogContext = (): string => {
  return PRODUCTS.map(p => `- ${p.name} ($${p.price}): ${p.description} (ID: ${p.id})`).join('\n');
};

export const sendMessageToAssistant = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      return "Error: La API Key de Gemini no está configurada. Por favor configura process.env.API_KEY.";
    }

    const systemInstruction = `
      Eres "El Maestro", un asistente virtual experto en ferretería y bricolaje para la tienda "Ferretería El Maestro".
      Tu objetivo es ayudar a los clientes a elegir los productos adecuados para sus proyectos, explicar cómo usarlos y dar consejos de seguridad.
      
      Tienes acceso al siguiente catálogo de productos de la tienda:
      ${getCatalogContext()}
      
      Reglas:
      1. Sé amable, profesional y práctico. Usa un tono de "experto de confianza".
      2. Cuando recomiendes un producto, menciona su precio y por qué es útil para el problema del usuario.
      3. Si el usuario pregunta por algo que NO está en el catálogo, sugiere una alternativa del catálogo si es viable, o di amablemente que no lo tenemos.
      4. Tus respuestas deben ser concisas (máximo 3-4 oraciones) a menos que se requiera una explicación paso a paso.
      5. Responde siempre en Español.
    `;

    // Construct history for the API
    // Note: Simple concatenation for this demo, keeping it stateless on the backend side
    // In a real app, use ai.chats.create() with history preservation.
    
    // Using generateContent for a single turn with history context included manually in prompt 
    // or utilizing chat feature if we were persisting the chat object properly across re-renders.
    // For simplicity in this React functional component structure, we'll re-instantiate chat each time 
    // with the full history as context or use the chat model correctly.
    
    // Better approach: Use chat model.
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({ message: message });
    return result.text || "Lo siento, no pude procesar tu solicitud.";

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Lo siento, hubo un problema técnico. Intenta de nuevo más tarde.";
  }
};