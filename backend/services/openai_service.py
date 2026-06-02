from openai import OpenAI

import os

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)
def generate_ai_response(
    user_message,
    context=""
):

    system_prompt = f"""
You are an AI forensic investigation assistant.

Analyze:
- forensic evidence
- autopsy reports
- crime scene documents
- investigation files

Use ONLY the provided context.

If the answer is not found,
say:
"I could not find enough forensic evidence."

Context:
{context}
"""

    response = client.chat.completions.create(

        model="gpt-4.1-mini",

        messages=[

            {
                "role": "system",
                "content": system_prompt
            },

            {
                "role": "user",
                "content": user_message
            }
        ],

        temperature=0.3
    )

    return (
        response
        .choices[0]
        .message
        .content
    )