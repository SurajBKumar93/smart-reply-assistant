import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Message {
  content: string;
  type: 'received' | 'suggested';
}

interface Persona {
  name: string;
  description: string;
  tone: string;
  messageLength: string;
}

interface Goal {
  label: string;
  description: string;
}

interface RequestBody {
  messages: Message[];
  persona: Persona;
  goal: Goal;
  refinementInstruction?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, persona, goal, refinementInstruction } = await req.json() as RequestBody;
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build conversation context
    const conversationHistory = messages.map(m => ({
      role: m.type === 'received' ? 'user' : 'assistant',
      content: m.content
    }));

    // Build the system prompt with persona and goal context
    const systemPrompt = `You are an expert communication assistant helping someone craft the perfect reply to a message.

## Your User's Persona
- **Role**: ${persona.name}
- **Description**: ${persona.description}
- **Tone**: ${persona.tone}
- **Message Length Preference**: ${persona.messageLength}

## Conversation Goal
- **Goal**: ${goal.label}
- **What they want to achieve**: ${goal.description}

## Your Task
Generate a reply that:
1. Matches the persona's communication style and tone
2. Works toward achieving the stated goal
3. Sounds natural and human (not robotic or AI-generated)
4. Is appropriate for the relationship and context
5. Respects the message length preference (${persona.messageLength === 'concise' ? 'keep it brief and to the point' : persona.messageLength === 'detailed' ? 'be thorough and comprehensive' : 'use a balanced, moderate length'})

${refinementInstruction ? `## Refinement Request\nThe user wants you to modify the previous reply: "${refinementInstruction}"` : ''}

Reply ONLY with the message text itself. No quotes, no explanations, no preamble. Just the reply they should send.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...conversationHistory,
          ...(refinementInstruction ? [{ role: "user", content: `Please refine the previous reply: ${refinementInstruction}` }] : [])
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to generate reply" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const generatedReply = data.choices?.[0]?.message?.content?.trim();

    if (!generatedReply) {
      throw new Error("No reply generated");
    }

    return new Response(JSON.stringify({ reply: generatedReply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-reply function:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
