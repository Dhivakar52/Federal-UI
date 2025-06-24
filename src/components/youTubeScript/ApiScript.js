import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateNewsStory(content) {
  // Input validation
  if (!content.title || !content.description || !content.transcript) {
    throw new Error('All fields (title, description, and transcript) are required');
  }

  // Define the system prompt for the AI
  const systemPrompt = `You are a professional news writer with native-level fluency in multiple languages. Your task is to write news stories in the specified language with these strict requirements:

1. ALWAYS write the ENTIRE content in the requested language (${content.language})
2. NEVER mix languages - do not use any English words when writing in Hindi, Telugu, or Kannada
3. Maintain journalistic standards and formal writing style appropriate for the target language
4. For non-English languages:
   - Use proper script (Devanagari for Hindi, Telugu script, Kannada script)
   - Follow language-specific grammar and syntax rules
   - Use culturally appropriate expressions and idioms
5. NEVER transliterate - use proper script for the chosen language`;

  // Define the user prompt that specifies what to generate
  const userPrompt = `Generate a news story in ${content.language} based on this content:
Title: ${content.title}
Description: ${content.description}
Transcript: ${content.transcript}

Requirements:
1. Headline: Maximum 80 characters, engaging and clear
2. Body: Maximum 500 words, well-structured, focused on key points
3. Hashtags: 3-5 relevant tags
4. Language: CRITICAL - Write EVERYTHING in ${content.language} ONLY

Format your response exactly as:
HEADLINE: (your headline)
BODY: (your article)
HASHTAGS: (your hashtags)`;

  try {
    // Make the API call to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 800,
      presence_penalty: 0.6,
      frequency_penalty: 0.6
    });

    // Extract the content from the response
    const generatedContent = response.choices[0]?.message?.content;
    if (!generatedContent) {
      throw new Error('No content received from OpenAI');
    }

    // Parse the formatted response using regex
    const headlineMatch = generatedContent.match(/HEADLINE:\s*(.*?)(?=BODY:|$)/s);
    const bodyMatch = generatedContent.match(/BODY:\s*(.*?)(?=HASHTAGS:|$)/s);
    const hashtagsMatch = generatedContent.match(/HASHTAGS:\s*(.*?)$/s);

    // Validate that all parts were found
    if (!headlineMatch || !bodyMatch || !hashtagsMatch) {
      throw new Error('Invalid response format from OpenAI');
    }

    // Process the response parts
    const headline = headlineMatch[1].trim();
    const body = bodyMatch[1].trim();
    const hashtags = hashtagsMatch[1]
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag)
      .map(tag => tag.startsWith('#') ? tag : `#${tag}`)
      .slice(0, 5);

    // Return the formatted result
    return {
      headline,
      body,
      hashtags
    };

  } catch (error) {
    // Handle specific API errors
    if (error instanceof Error) {
      // Check for specific error types
      const errorObj = error;
      
      if (errorObj.status === 401) {
        throw new Error('Invalid API key. Please check your OpenAI API key and try again.');
      } 
      
      if (errorObj.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      } 
      
      if (errorObj.message) {
        throw new Error(`OpenAI API error: ${errorObj.message}`);
      }
    }

    // Generic error fallback
    throw new Error('Failed to generate news story. Please try again later.');
  }
}