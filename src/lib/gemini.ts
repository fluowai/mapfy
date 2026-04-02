import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateAudit(businessName: string, city: string) {
  const model = "gemini-3-flash-preview";
  const prompt = `Faça uma auditoria profissional e detalhada do perfil do Google Meu Negócio para a empresa "${businessName}" em "${city}". 
  
  Analise profundamente:
  1. Completude do perfil e SEO local.
  2. Qualidade e sentimento das avaliações.
  3. Frequência e engajamento das postagens.
  4. Presença visual e otimização de fotos.
  5. Posicionamento no mapa em relação aos principais concorrentes da região.
  
  Retorne um JSON com:
  - score (0-100)
  - items (array de {title, status: 'success'|'warning'|'error', description})
  - opportunities (array de strings)
  - summary (texto curto de diagnóstico)
  - positioning: {
      currentRank: (posição média no mapa 1-20),
      competitors: (array de {name, rating, reviewsCount, rank, distance})
    }
  - mapData: (array de 9 pontos para um grid 3x3 de posicionamento local, cada ponto com {rank: 1-20})`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      tools: [{ googleMaps: {} }],
    },
  });

  try {
    const text = response.text || "";
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    const result = JSON.parse(jsonMatch ? jsonMatch[0] : cleanText);
    
    // Ensure basic structure for new fields
    if (!result.positioning) {
      result.positioning = { currentRank: "?", competitors: [] };
    }
    if (!result.mapData) {
      result.mapData = Array(9).fill({ rank: 0 });
    }
    
    return result;
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return {
      score: 0,
      items: [],
      opportunities: ["Erro ao processar análise"],
      summary: "Não foi possível gerar o diagnóstico no momento.",
      positioning: { currentRank: "?", competitors: [] },
      mapData: Array(9).fill({ rank: 0 })
    };
  }
}

export async function suggestReviewReply(review: string) {
  const model = "gemini-3-flash-preview";
  const prompt = `Sugira uma resposta profissional e amigável para a seguinte avaliação de cliente no Google: "${review}". 
  A resposta deve ser empática, agradecer se for positiva, ou tentar resolver o problema se for negativa.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  return response.text;
}

export async function generatePostContent(businessType: string, topic: string) {
  const model = "gemini-3-flash-preview";
  const prompt = `Crie um post otimizado para o Google Meu Negócio para uma empresa do tipo "${businessType}" sobre o assunto "${topic}". 
  O post deve ser curto, atraente e incluir um Call to Action (CTA).`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
  });

  return response.text;
}

export async function generateCompetitorAnalysis(businessName: string, city: string, competitors: string[]) {
  const model = "gemini-3-flash-preview";
  const prompt = `Compare a empresa "${businessName}" em "${city}" com seus concorrentes: ${competitors.join(', ')}.
  Analise:
  1. Nota média.
  2. Número de reviews.
  3. Qualidade das postagens.
  4. Presença visual (fotos).
  
  Retorne um JSON com:
  - ranking (array de {name, score, rating, reviewsCount})
  - analysis (texto comparativo curto)
  - strategy (3 sugestões para superar os concorrentes)`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      tools: [{ googleMaps: {} }],
    },
  });

  try {
    const text = response.text || "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : text);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return null;
  }
}

export async function searchLeads(category: string, city: string) {
  const model = "gemini-3-flash-preview";
  const prompt = `Encontre 10 empresas do tipo "${category}" em "${city}" que tenham potencial para melhoria no Google Meu Negócio.
  Foque em empresas com:
  - Poucas avaliações.
  - Nota média abaixo de 4.5.
  - Sem fotos recentes.
  - Sem respostas às avaliações.
  
  Retorne um JSON com um array "leads" contendo objetos com:
  - name (nome da empresa)
  - address (endereço aproximado)
  - rating (nota atual)
  - reviewsCount (número de reviews)
  - phone (telefone se disponível)
  - painPoints (array de 2-3 problemas detectados)`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      tools: [{ googleMaps: {} }],
    },
  });

  try {
    const text = response.text || "";
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : cleanText);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return { leads: [] };
  }
}

export async function getLeadDetails(businessName: string, address: string, category: string, city: string) {
  const model = "gemini-3-flash-preview";
  const prompt = `Faça uma análise profunda da empresa "${businessName}" localizada em "${address}" na cidade de "${city}" (Categoria: ${category}).
  
  Use ferramentas de busca para encontrar:
  1. Descrição e história da empresa.
  2. Pontos fortes e fracos (reviews, fotos, posts).
  3. Ranking atual no Google Maps para a categoria "${category}".
  4. Principais concorrentes na região.
  
  Retorne um JSON com:
  - details: {
      description: (breve história/descrição),
      strengths: (array de pontos fortes),
      weaknesses: (array de pontos fracos críticos),
      estimatedTraffic: (número estimado de buscas mensais)
    }
  - positioning: {
      currentRank: (posição média no mapa 1-20),
      competitors: (array de {name, distance, rating, reviewsCount, rank})
    }
  - mapData: (array de 9 pontos para um grid 3x3 de posicionamento local, cada ponto com {lat, lng, rank: 1-20})`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      tools: [{ googleMaps: {} }],
    },
  });

  try {
    const text = response.text || "";
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    const result = JSON.parse(jsonMatch ? jsonMatch[0] : cleanText);
    
    if (!result.details || !result.positioning) {
       throw new Error("Invalid structure");
    }
    return result;
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return {
      details: {
        description: "Não foi possível carregar a descrição detalhada no momento.",
        strengths: ["Dados indisponíveis"],
        weaknesses: ["Dados indisponíveis"],
        estimatedTraffic: "N/A"
      },
      positioning: {
        currentRank: "?",
        competitors: []
      },
      mapData: Array(9).fill({ rank: 0 })
    };
  }
}


