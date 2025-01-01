const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Load API key from environment variables
const OPENAI_API_KEY = functions.config().openai.key;

// Define the summarizeText function
exports.summarizeText = functions.https.onCall(async (data, context) => {
  // Check for authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'The function must be called while authenticated.'
    );
  }

  const textToSummarize = data.text;
  if (!textToSummarize) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with a valid text to summarize.'
    );
  }

  try {
    // Call OpenAI API to generate summary
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: `Summarize the following text: ${textToSummarize}`,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const summary = response.data.choices[0].text.trim();
    return { summary };

  } catch (error) {
    console.error('Error generating summary:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Unable to generate summary at this time.'
    );
  }
});
