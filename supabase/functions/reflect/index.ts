import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { journal_entry, mode, action } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt: string;
    let userPrompt: string;

    if (action === "next_step") {
      // For couple room guided conversation
      systemPrompt =
        "You are a compassionate relationship facilitator. Based on the shared reflections and partner responses, suggest one concrete next step this couple can commit to. Return ONLY valid JSON: {\"next_step\": string, \"timeframe\": string}";
      userPrompt = journal_entry;
    } else {
      // For journal reflection
      const modeContext =
        mode === "family"
          ? "The user is reflecting on a parent-teen relationship. Focus on respect, autonomy, and understanding generational perspectives."
          : "The user is reflecting on a romantic partnership.";

      systemPrompt = `You are a compassionate reflection assistant. ${modeContext} Structure the journal entry into four categories. Return ONLY valid JSON: {"what_happened": string, "how_i_felt": string, "what_i_need": string, "what_i_want_to_say": string}`;
      userPrompt = journal_entry;
    }

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
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: action === "next_step" ? "suggest_next_step" : "structure_reflection",
              description:
                action === "next_step"
                  ? "Return a concrete next step and timeframe."
                  : "Return a structured reflection of the journal entry.",
              parameters:
                action === "next_step"
                  ? {
                      type: "object",
                      properties: {
                        next_step: { type: "string" },
                        timeframe: { type: "string" },
                      },
                      required: ["next_step", "timeframe"],
                      additionalProperties: false,
                    }
                  : {
                      type: "object",
                      properties: {
                        what_happened: { type: "string" },
                        how_i_felt: { type: "string" },
                        what_i_need: { type: "string" },
                        what_i_want_to_say: { type: "string" },
                      },
                      required: ["what_happened", "how_i_felt", "what_i_need", "what_i_want_to_say"],
                      additionalProperties: false,
                    },
            },
          },
        ],
        tool_choice: {
          type: "function",
          function: { name: action === "next_step" ? "suggest_next_step" : "structure_reflection" },
        },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    let result;
    if (toolCall) {
      result = JSON.parse(toolCall.function.arguments);
    } else {
      // Fallback: try parsing content directly
      const content = data.choices?.[0]?.message?.content || "{}";
      result = JSON.parse(content);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("reflect error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
